import { valueClass } from "../../const";
import { PageInfo } from "../pdfViewer/pdf-viewer";
import { RecognizedRectangle } from "./recognized-rectangle";
import {
	BoundingBox,
	BoundingBoxMap,
	FullTextTerm,
	RecognizedFieldMapInfo,
	RecognizedPage,
	WordPageInfo,
	boxNumOfPoints,
	RecognizedCellInfo
} from "./types";

export class RecognizedValue {
	rectangles: RecognizedRectangle[] = [];
	readonly boundingBoxes: BoundingBoxMap[] = [];
	rectangleScrollIndex: number = 0;
	text?: string;
	readonly value?: string | null | Date;

	readonly cellInfo: RecognizedCellInfo = {
		rectangleIndex: 0,
		pageIndex: null,
		tableIndex: null,
		cellIndex: null,
		rowIndex: null,
		columnIndex: null,
		columnNumber: null,
		isSet: null,
	};

	constructor(
		public fieldInfo: RecognizedFieldMapInfo,
		private recognizedPages: RecognizedPage[],
		private pagesInfo: PageInfo[],
		public wordInfo: WordPageInfo
	) {
		if (fieldInfo !== null || wordInfo !== null) {
			if (fieldInfo?.recognizedField) {
				this.value = fieldInfo.recognizedField.value;
			}
			this._initText(fieldInfo, wordInfo);
			this._initBoundingBoxes(fieldInfo, wordInfo);
		}
	}

	addSearchTerm(searchTerm: FullTextTerm) {
		if (!searchTerm) {
			return;
		}

		if (this.text === null && searchTerm.text) {
			this.text = searchTerm.text;
		}

		if (this.boundingBoxes.length === 0) {
			this._initOcrBoundingBoxes(searchTerm.boundingBoxes);
			this.appendToPages();
		}
	}

	equals(otherValue: RecognizedValue): boolean {
		if (otherValue.text !== this.text) {
			return false;
		}

		if (otherValue.rectangles.length !== this.rectangles.length) {
			return false;
		}

		return otherValue.rectangles.every((otherRect) =>
			this.rectangles.some((thisRect) =>
				thisRect.equals(otherRect)));
	}

	_initText(fieldInfo: RecognizedFieldMapInfo, wordInfo: WordPageInfo): void {
		if (fieldInfo?.recognizedField?.ocr?.text) {
			this.text = fieldInfo.recognizedField.ocr.text;
		}
		else if (wordInfo?.word?.text) {
			this.text = wordInfo.word.text;
		}
		else if (fieldInfo?.searchTerm?.text) {
			this.text = fieldInfo.searchTerm?.text;
		}
	}

	_initBoundingBoxes(fieldInfo: RecognizedFieldMapInfo, wordInfo: WordPageInfo) {
		if (fieldInfo?.recognizedField?.ocr?.boundingBoxes) {
			this._initOcrBoundingBoxes(fieldInfo.recognizedField.ocr.boundingBoxes);
		}
		else if (wordInfo?.wordIndex != null) {
			this._initWordBoundingBox(wordInfo);
		}
		else if (fieldInfo?.searchTerm) {
			this._initOcrBoundingBoxes(fieldInfo.searchTerm.boundingBoxes);
		}
	}
	_initOcrBoundingBoxes(boundingBoxes: BoundingBoxMap[]) {
		boundingBoxes.forEach((box) => {
			const page = this.recognizedPages[box.page];
			const container = this.pagesInfo[box.page].canvas;
			const svg = this.pagesInfo[box.page].svg;
			let coordinates = null;

			if (box.boundingBox != null) {
				coordinates = box.boundingBox;
			}
			else if (box.word != null) {
				const word = page.words[box.word];

				coordinates = word.boundingBox;
			}
			else if (box.keyValuePair != null) {
				const keyValuePair = page.keyValuePairs[box.keyValuePair];
				coordinates = keyValuePair.value.boundingBox;
			}
			else if (box.table != null && box.cell != null) {
				const table = page.tables[box.table];
				const cell = table.cells[box.cell];
				coordinates = cell.boundingBox;
			}

			if (coordinates !== null) {
				this._addRectangle(page.unit, page.width, page.height, coordinates, container.width, container.height, svg);
				this.boundingBoxes.push(box);
			}
		});
	}
	_initWordBoundingBox(wordInfo: WordPageInfo): void {
		const coordinates = wordInfo.word.boundingBox;
		if (coordinates === null || !coordinates.length || coordinates.length !== boxNumOfPoints) {
			return;
		}

		const container = this.pagesInfo[wordInfo.pageIndex].canvas;
		const svg = this.pagesInfo[wordInfo.pageIndex].svg;
		const page = this.recognizedPages[wordInfo.pageIndex];

		this._addRectangle(page.unit, page.width, page.height, coordinates, container.width, container.height, svg);

		const boundingBox: BoundingBoxMap = {
			page: wordInfo.pageIndex,
			word: wordInfo.wordIndex,
		};

		this.boundingBoxes.push(boundingBox);
	}
	_addRectangle(
		unit: string,
		pageWidth: number,
		pageHeight: number,
		coordinates: BoundingBox,
		containerWidth: number,
		containerHeight: number,
		svg: SVGSVGElement
	) {
		const rect = new RecognizedRectangle(
			unit,
			pageWidth,
			pageHeight,
			coordinates,
			containerWidth,
			containerHeight,
			svg
		);

		rect.polygon.classList.add(valueClass);
		this.rectangles.push(rect);
	}

	subscribeOnMousedown(callback: (v: RecognizedValue, e: MouseEvent) => void) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const rv = this;
		this.rectangles.forEach((rect) => rect.polygon.addEventListener("mousedown", (event) => callback(rv, event)));
	}
	appendToPages(): void {
		for (let i = 0; i < this.rectangles.length; i++) {
			const rect = this.rectangles[i];
			const page = this.boundingBoxes[i].page;
			const parent = this.pagesInfo[page].svg;

			rect.appendToParent(parent);
		}
	}
	markAsMapped() {
		this.rectangles.forEach((rect) => rect.markAsMapped());
	}

	public markAsNotMapped(): void {
		this.rectangles.forEach((rect) => rect.markAsNotMapped());
	}

	rescale(scale: number): void {
		for (let i = 0; i < this.rectangles.length; i++) {
			const rect = this.rectangles[i];
			const page = this.boundingBoxes[i].page;
			const container = this.pagesInfo[page].canvas;

			rect.rescale(container.width, container.height, scale);
		}
	}
	getScrollTarget() {
		if (this.rectangles.length === 0) {
			return null;
		}

		const firstRectangle = this.rectangles[this.cellInfo.rectangleIndex];
		const rectangleElement = firstRectangle.polygon;

		return rectangleElement;
	}

	fillCellInfo() {
		if (this.cellInfo.isSet) {
			return;
		}


		for (const box of this.boundingBoxes) {
			const page = this.recognizedPages[box.page];
			if (box.table != null && box.cell != null) {
				const table = page.tables[box.table];
				const cell = table.cells[box.cell];
				this.addCellInfo(box.page, box.table, box.cell, cell.rowIndex, cell.columnIndex, table.columnNumber);
				return;
			}

			if (box.word != null && page.tables != null) {
				for (let t = 0; t < page.tables.length; t++) {
					const table = page.tables[t];

					for (let c = 0; c < table.cells.length; c++) {
						const cell = table.cells[c];
						if (!cell.ocr || !cell.ocr.boundingBoxes) {
							continue;
						}
						for (const ocrBox of cell.ocr.boundingBoxes) {
							if (ocrBox.page === box.page && ocrBox.word === box.word) {
								this.addCellInfo(box.page, t, c, cell.rowIndex, cell.columnIndex, table.columnNumber);
								return;
							}
						}
					}
				}
			}
		}
	}

	addCellInfo(
		pageIndex: number,
		tableIndex: number,
		cellIndex: number,
		rowIndex: number,
		columnIndex: number,
		columnNumber: number
	) {
		this.cellInfo.pageIndex = pageIndex;
		this.cellInfo.tableIndex = tableIndex;
		this.cellInfo.cellIndex = cellIndex;
		this.cellInfo.rowIndex = rowIndex;
		this.cellInfo.columnIndex = columnIndex;
		this.cellInfo.columnNumber = columnNumber;
		this.cellInfo.isSet = true;
	}
}

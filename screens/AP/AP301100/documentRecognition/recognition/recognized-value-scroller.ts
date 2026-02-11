import { RecognizedValue } from "./recognized-value";
import { BoundingBoxMap, RecognizedCellMap, RecognizedPage, RecognizedTableMap } from "./types";

const topMargin = 100;

export class RecognizedValueScroller {
	readonly _cellInfo: RecognizedValue[][][][] = [];

	createCellScrollingIndex(recognizedPages: RecognizedPage[], recognizedValues: RecognizedValue[]): void {
		if (!recognizedPages || !recognizedValues) {
			return;
		}
		this._cellInfo.splice(0);
		for (let pageIndex = 0; pageIndex < recognizedPages.length; pageIndex++) {
			const page = recognizedPages[pageIndex];

			if (page.tables && page.tables.length) {
				this.createPageCellInfo(recognizedValues, page, pageIndex);
			}
			else {
				this._cellInfo[pageIndex] = [];
			}
		}
	}

	scrollToRecognizedValue(container: Element, recognizedValue: RecognizedValue): void {
		if (!recognizedValue) {
			return;
		}

		const recognizedValueElement = recognizedValue.getScrollTarget();
		if (recognizedValueElement === null) {
			return;
		}

		const recognizedClientRect = recognizedValueElement.getBoundingClientRect();
		const parentClientRect = container.getBoundingClientRect();

		const scrollIsNotNeeded = this.isClientRectVisible(parentClientRect, recognizedClientRect);
		if (scrollIsNotNeeded) {
			return;
		}

		const headerElement = this.getHeaderElement(recognizedClientRect, parentClientRect, recognizedValue);
		if (headerElement != null) {
			this.scrollIntoView(headerElement, container, 0);
		}
		else {
			this.scrollIntoView(recognizedValueElement, container, topMargin);
		}
	}

	scrollIntoView(element: Element, container: Element, marginTop: number): void {
		element.scrollIntoView();
		container.scrollTop -= marginTop;
	}

	private createPageCellInfo(recognizedValues: RecognizedValue[], page: RecognizedPage, pageIndex: number): void {
		for (let tableIndex = 0; tableIndex < page.tables.length; tableIndex++) {
			const table = page.tables[tableIndex];

			if (table.cells && table.cells.length) {
				this.createTableCellInfo(recognizedValues, table, tableIndex, pageIndex);
			}
			else {
				this.addEmptyTableCellEntry(pageIndex, tableIndex);
			}
		}
	}

	private createTableCellInfo(
		recognizedValues: RecognizedValue[],
		table: RecognizedTableMap,
		tableIndex: number,
		pageIndex: number
	): void {
		if (!table.columnNumber) {
			return;
		}

		for (const recognizedValue of recognizedValues) {
			for (const boundingBox of recognizedValue.boundingBoxes) {
				if (boundingBox.page === pageIndex && boundingBox.table === tableIndex && boundingBox.cell !== null) {
					const cell = table.cells[boundingBox.cell];
					recognizedValue.addCellInfo(pageIndex, tableIndex, boundingBox.cell, cell.rowIndex, cell.columnIndex, table.columnNumber);
					this.addCellInfoEntry(pageIndex, tableIndex, boundingBox.cell, recognizedValue);
				}
			}
		}

		for (let cellIndex = 0; cellIndex < table.cells.length; cellIndex++) {
			const cell = table.cells[cellIndex];

			if (!cell || cell.rowIndex == null) {
				this.addEmptyCellEntry(pageIndex, tableIndex, cellIndex);
			}
		}
	}

	private getHeaderElement(
		recognizedClientRect: DOMRect,
		parentClientRect: DOMRect,
		recognizedValue: RecognizedValue
	): Element {
		const cellInfo = recognizedValue.cellInfo;
		if (
			cellInfo.pageIndex === null ||
			cellInfo.tableIndex === null ||
			cellInfo.cellIndex === null ||
			cellInfo.rowIndex === null ||
			cellInfo.columnNumber === null
		) {
			return null;
		}

		const headerCellIndex = cellInfo.cellIndex - cellInfo.columnNumber * cellInfo.rowIndex;
		const headerCellInfo = this.getCellInfo(cellInfo.pageIndex, cellInfo.tableIndex, headerCellIndex);
		if (!headerCellInfo) {
			return null;
		}

		const headerValue = headerCellInfo[0];
		const headerValueElement = headerValue.getScrollTarget();
		if (headerValueElement === null) {
			return null;
		}

		const headerClientRect = headerValueElement.getBoundingClientRect();
		const canFitHeaderAndRv = recognizedClientRect.bottom - headerClientRect.top <= parentClientRect.height;

		return canFitHeaderAndRv ? headerValueElement : null;
	}

	private isClientRectVisible(parentRect: DOMRect, recognizedRect: DOMRect): boolean {
		return (
			parentRect.top <= recognizedRect.top &&
			parentRect.left <= recognizedRect.left &&
			parentRect.bottom >= recognizedRect.bottom &&
			parentRect.right >= recognizedRect.right
		);
	}

	private ensureArray<T>(array: T[][], index: number): T[] {
		if (array[index] == null) {
			array[index] = [];
		}
		return array[index];
	}

	private getPageCellInfo(pageIndex: number): RecognizedValue[][][] {
		return this.ensureArray(this._cellInfo, pageIndex);
	}

	private getTableCellInfo(pageIndex: number, tableIndex: number): RecognizedValue[][] {
		const pageInfo = this.getPageCellInfo(pageIndex);
		return this.ensureArray(pageInfo, tableIndex);
	}

	private getCellInfo(pageIndex: number, tableIndex: number, cellIndex: number): RecognizedValue[] {
		const tableInfo = this.getTableCellInfo(pageIndex, tableIndex);
		return this.ensureArray(tableInfo, tableIndex);
	}

	private addCellInfoEntry(
		pageIndex: number,
		tableIndex: number,
		cellIndex: number,
		recognizedValue: RecognizedValue
	): void {
		const cellInfo = this.getCellInfo(pageIndex, tableIndex, cellIndex);

		cellInfo.push(recognizedValue);
	}

	private addEmptyTableCellEntry(pageIndex: number, tableIndex: number): void {
		const pageInfo = this.getPageCellInfo(pageIndex);
		pageInfo[tableIndex] = [];
	}

	private addEmptyCellEntry(pageIndex: number, tableIndex: number, cellIndex: number): void {
		const tableInfo = this.getTableCellInfo(pageIndex, tableIndex);

		tableInfo[cellIndex] = [];
	}
}

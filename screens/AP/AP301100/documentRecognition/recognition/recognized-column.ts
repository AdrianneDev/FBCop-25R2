import { columnClass, undoClass, undoContainerOffset, undoContainerSize, hiddenInColumnModeClass, hoverClass, hoverSelectedClass } from "../../const";
import { PageInfo } from "../pdfViewer/pdf-viewer";
import { RecognizedRectangleLine } from "./recognized-rectangle-line";
import * as RescaleUtils from "./utils";
import { RecognizedCellMap, RecognizedGridCellMap, RecognizedPage, RecognizedTableMap } from "./types";

export class RecognizedColumn extends RecognizedRectangleLine {
	onUndoMousedownCallback?: (column: RecognizedColumn) => void = null;
	onMouseenterCallback?: (column: RecognizedColumn) => void = null;
	onMouseleaveCallback?: (column: RecognizedColumn) => void = null;
	hoverCounter: number = 0;
	public gridFieldName: string;
	private firstSelectedCellIndex?: number = null;
	private gridMappingByFieldRow: Map<string, RecognizedGridCellMap> = new Map();
	protected override get cssClass(): string {
		return columnClass;
	}
	private undoContainer?: HTMLElement;

	constructor(pageInfo: PageInfo, page: RecognizedPage, table: RecognizedTableMap, columnIndex: number) {
		const columnCells = table.cells.filter(function (cell) {
			return cell.columnIndex === columnIndex;
		});
		super(pageInfo, page, columnCells, columnIndex);
		this.subscribeOnMouseenter(this.mouseenterCallback);
		this.subscribeOnMouseleave(this.mouseleaveCallback);
		this._initUndoContainer();
	}

	_undoMouseenterCallback?: () => void = () => this.onMouseenter();
	_undoMouseleaveCallback?: () => void = () => this.onMouseleave();
	_undoMousedownCallback?: () => void = () => this.onUndoMousedown();
	mouseenterCallback: () => void = () => this.onMouseenter();
	mouseleaveCallback: () => void = () => this.onMouseleave();

	removeEventListeners() {
		this.unsubscribeOnMouseenter(this.mouseenterCallback);
		this.unsubscribeOnMouseleave(this.mouseleaveCallback);
		this.undoContainer.removeEventListener("mouseenter", this._undoMouseenterCallback);
		this.undoContainer.removeEventListener("mouseleave", this._undoMouseleaveCallback);
		this.undoContainer.removeEventListener("mousedown", this._undoMousedownCallback);
	}

	_initUndoContainer() {
		this.undoContainer = document.createElement("div");
		this.undoContainer.classList.add(undoClass);
		const undoElement = document.createElement("div");
		const undoText = document.createTextNode("╳");
		undoElement.appendChild(undoText);
		this.undoContainer.appendChild(undoElement);
		this.undoContainer.addEventListener("mouseenter", this._undoMouseenterCallback);
		this.undoContainer.addEventListener("mouseleave", this._undoMouseleaveCallback);
		this.undoContainer.addEventListener("mousedown", this._undoMousedownCallback);
	}

	_rescaleUndoContainer(): void {
		if (this.undoContainer == null || this.firstSelectedCellIndex == null) {
			return;
		}
		const firstRect = this.rectangles[this.firstSelectedCellIndex];
		const offset = RescaleUtils.isOffsetNeeded(firstRect) ? undoContainerOffset : 0;
		this.undoContainer.style.top = `${firstRect.top}px`;
		this.undoContainer.style.left = `${firstRect.left + firstRect.width - undoContainerSize - offset}px`;
		this.undoContainer.style.height = `${firstRect.height}px`;
		this.undoContainer.style.fontSize = `${undoContainerSize}px`;
	}
	_showUndoContainer(show: boolean): void {
		this.undoContainer.style.display = show ? "flex" : "none";
	}
	rescale(containerWidth: number, containerHeight: number, scale: number): void {
		super.rescale(containerWidth, containerHeight, scale);
		this._rescaleUndoContainer();
	}

	appendToParentCol(parentElement: Element, parentSvg: SVGSVGElement): void {
		super.appendToParent(parentSvg);
		parentElement.appendChild(this.undoContainer);
	}
	showInColumnMode(): void {
		this.removeClass(hiddenInColumnModeClass);
	}
	hideInColumnMode() {
		this.addClass(hiddenInColumnModeClass);
	}
	reset(): void {
		super.reset();
		this.setSelected(false);
		this.showInColumnMode();
		this.removeClass(hoverClass);
		this._showUndoContainer(false);
		this.clearGridMapping();
	}
	onMouseenter(externalCall: boolean = false): void {
		if (this.hasClass(hoverClass) || this.hasClass(hoverSelectedClass)) {
			return;
		}

		if (!externalCall && this.onMouseenterCallback !== null) {
			this.onMouseenterCallback(this);
		}

		if (this.getSelected()) {
			this.addClass(hoverSelectedClass);
			this._showUndoContainer(true);
		}
		else {
			this.addClass(hoverClass);
		}
	}
	onMouseleave(externalCall: boolean = false): void {
		if (!externalCall && this.onMouseleaveCallback !== null) {
			this.onMouseleaveCallback(this);
		}

		this.removeClass(hoverClass);
		this.removeClass(hoverSelectedClass);
		this._showUndoContainer(false);
	}
	onUndoMousedown(externalCall: boolean = false): void {
		if (!externalCall) {
			this.onUndoMousedownCallback(this);
		}

		this._showUndoContainer(false);
		this.setSelected(false);
		this.clearGridMapping();
	}
	hideNotSelectedCells(selectedCells: RecognizedCellMap[]): void {
		let first = true;

		for (let i = 0; i < this.cells.length; i++) {
			if (selectedCells.indexOf(this.cells[i]) !== -1) {
				if (first) {
					first = false;
					this.firstSelectedCellIndex = i;
				}
			}
			else {
				this.rectangles[i].addClass(hiddenInColumnModeClass);
			}
		}
	}
	setSelected(isSelected: boolean): void {
		super.setSelected(isSelected);
		this._rescaleUndoContainer();
	}
	setGridMapping(fieldRowKey: string, mapping: RecognizedGridCellMap): void {
		this.gridMappingByFieldRow.set(fieldRowKey, mapping);
	}
	getMappingByFieldRow(): Map<string, RecognizedGridCellMap> {
		return this.gridMappingByFieldRow;
	}
	private clearGridMapping(): void {
		this.gridMappingByFieldRow = new Map();
		this.gridFieldName = null;
	}
}

import { rowClass, activeRowClass, hiddenInRowModesClass, rowCheckBoxContainerClass, rowCheckBoxClass, checkboxContainerOffset } from "../../const";
import { PageInfo } from "../pdfViewer/pdf-viewer";
import { RecognizedRectangleLine } from "./recognized-rectangle-line";
import * as RescaleUtils from "./utils";
import { RecognizedPage, RecognizedTableMap } from "./types";

export class RecognizedRow extends RecognizedRectangleLine {
	checkbox?: HTMLInputElement = null;
	checkboxContainer?: HTMLDivElement = null;
	protected override get cssClass() {
		return rowClass;
	}
	constructor(
		pageInfo: PageInfo,
		page: RecognizedPage,
		table: RecognizedTableMap,
		public index: number,
		private selectedCallback: (row: RecognizedRow, e: MouseEvent) => void
	) {
		const rowCells = table.cells.filter((cell) => cell.rowIndex === index);
		super(pageInfo, page, rowCells, index);
		this.initCheckboxContainer();
	}

	_handleCheckboxChange(e: PointerEvent) {
		if (this.checkbox.checked) {
			this.isSelected = true;
			this.markAsMapped();
		}
		else {
			this.isSelected = false;
			this.markAsNotMapped();
		}

		if (this.selectedCallback) {
			this.selectedCallback(this, e);
		}
	}

	override setSelected(isSelected: boolean) {
		this.checkbox.checked = isSelected;
		super.setSelected(isSelected);
	}

	reset() {
		super.reset();
		this.setSelected(false);
		this.showInRowMode();
		this.setActive(false);
		this.allowSelect(true);
	}

	setActive(isActive) {
		if (isActive === true) {
			this.checkbox.classList.add(activeRowClass);
		}
		else {
			this.checkbox.classList.remove(activeRowClass);
		}
	}

	showInRowMode() {
		this.checkboxContainer.classList.remove(hiddenInRowModesClass);
	}

	hideInRowMode() {
		this.checkboxContainer.classList.add(hiddenInRowModesClass);
	}

	appendToParentRow(parentElement, parentSvg) {
		super.appendToParent(parentSvg);
		parentElement.appendChild(this.checkboxContainer);
	}

	rescale(containerWidth: number, containerHeight: number, scale: number) {
		super.rescale(containerWidth, containerHeight, scale);
		this.rescaleCheckboxContainer();
	}

	getCheckboxContainerLeft(): number {
		return parseInt(this.checkboxContainer.style.left);
	}

	allowSelect(allow: boolean): void {
		this.checkbox.disabled = !allow;
	}

	private initCheckboxContainer() {
		this.checkboxContainer = document.createElement("div");
		this.checkboxContainer.classList.add(rowCheckBoxContainerClass);

		this.checkbox = document.createElement("input");
		this.checkbox.type = "checkbox";
		this.checkbox.classList.add(rowCheckBoxClass);

		this.checkbox.addEventListener("click", (e: PointerEvent) => this._handleCheckboxChange(e));
		this.checkboxContainer.appendChild(this.checkbox);

		this.rescaleCheckboxContainer();
	}

	private rescaleCheckboxContainer(): void {
		if (this.checkboxContainer === null) {
			return;
		}

		const firstRect = this.rectangles[0];
		if (!firstRect) {
			return;
		}

		const offset = RescaleUtils.isOffsetNeeded(firstRect) ? checkboxContainerOffset : 0;

		this.checkboxContainer.style.top = `${firstRect.top  }px`;
		this.checkboxContainer.style.left = `${firstRect.left - offset  }px`;
		this.checkboxContainer.style.height = `${firstRect.height  }px`;
	}
}

import { PageInfo } from "../pdfViewer/pdf-viewer";
import { RecognizedColumn } from "./recognized-column";
import { RecognizedRow } from "./recognized-row";
import { RecognizedCellMap, RecognizedCellMapIndex, RecognizedGridColumnMap, RecognizedPage, RecognizedTableMap } from "./types";
import { getKeyFromValues } from "./utils";

export class RecognizedTable {
	rows: RecognizedRow[] = [];
	columns: RecognizedColumn[] = [];
	cells: RecognizedCellMap[] = [];
	currentRow?: RecognizedRow;
	maxRowsToSelect?: () => number;
	selectedRows: number = 0;
	selectedRowsChangedCallback: (table: RecognizedTable) => void;
	columnSelectedCallback: (column: RecognizedColumn, event: MouseEvent) => boolean;
	columnUnselectedCallback: (column: RecognizedColumn) => void;
	constructor(
		pageInfo: PageInfo,
		page: RecognizedPage,
		public pageIndex: number,
		public tableIndex: number,
		table: RecognizedTableMap
	) {
		this.cells = table.cells;
		this._initRows(pageInfo, page, table);
		this._initColumns(pageInfo, page, table);
	}

	removeEventListeners() {
		this.columns.forEach(function (c) {
			c.removeEventListeners();
		});
	}

	_initRows(pageInfo: PageInfo, page: RecognizedPage, table: RecognizedTableMap) {
		for (let i = 0; i < table.rowNumber; i++) {
			const row = new RecognizedRow(pageInfo, page, table, i, this._handleUpdateSelected.bind(this));

			this.rows.push(row);
		}
	}

	_initColumns(pageInfo: PageInfo, page: RecognizedPage, table: RecognizedTableMap) {
		for (let i = 0; i < table.columnNumber; i++) {
			const undoMousedownCallback = (column: RecognizedColumn) => this._handleColumnUndoMousedown(column);
			const mouseEnterCallback = (column: RecognizedColumn) => this._handleColumnMouseenter(column);
			const mouseLeaveCallback = (column: RecognizedColumn) => this._handleColumnMouseleave(column);
			const column = new RecognizedColumn(pageInfo, page, table, i);
			column.onUndoMousedownCallback = undoMousedownCallback;
			column.onMouseenterCallback = mouseEnterCallback;
			column.onMouseleaveCallback = mouseLeaveCallback;
			column.subscribeOnMousedown(this._handleColumnSelected.bind(this));

			this.columns.push(column);
		}
	}
	showSelectedColumnCells() {
		this.columns.forEach((column) => {
			const selectedCellIndexes = this.getSelectedCellInfos(column);
			const selectedCells = selectedCellIndexes.map((ci) => ci.cell);
			column.hideNotSelectedCells(selectedCells);
		});
	}
	_handleColumnSelected(this: this, column: RecognizedColumn, event: MouseEvent) {
		if (this.columnSelectedCallback !== null) {
			if (column.getSelected()) {
				return;
			}

			if (this.columnSelectedCallback(column, event)) {
				column.setSelected(true);
			}
		}
	}
	_handleColumnMouseleave(column: RecognizedColumn) {
		this.columns.forEach(function (c) {
			if (column.gridFieldName !== null && c.gridFieldName === column.gridFieldName && c !== column) {
				c.onMouseleave(true);
			}
		});
	}
	_handleColumnMouseenter(column: RecognizedColumn) {
		this.columns.forEach(function (c) {
			if (column.gridFieldName !== null && c.gridFieldName === column.gridFieldName && c !== column) {
				c.onMouseenter(true);
			}
		});
	}
	_handleColumnUndoMousedown(column: RecognizedColumn) {
		if (this.columnUnselectedCallback !== null) {
			this.columnUnselectedCallback(column);
		}

		this.columns.forEach(function (c) {
			if (column.gridFieldName !== null && c.gridFieldName === column.gridFieldName && c !== column) {
				c.onUndoMousedown(true);
			}
		});
	}

	_handleUpdateSelected(this: RecognizedTable, row: RecognizedRow, e: MouseEvent) {
		const multiSelect = e.shiftKey && this.currentRow !== null;

		if (multiSelect) {
			this.multipleRowsSelected(row);
		}
		else {
			this._singleRowSelected(row);
		}

		this.setCurentRow(row);

		if (this.selectedRowsChangedCallback !== null) {
			this.selectedRowsChangedCallback(this);
		}
	}

	_singleRowSelected(row: RecognizedRow): void {
		if (row.getSelected()) {
			this.selectedRows++;
		}
		else {
			this.selectedRows--;
		}
	}
	appendToParent(parentElement, parentSvg) {
		this.rows.forEach(function (row) {
			row.appendToParentRow(parentElement, parentSvg);
		});

		this.columns.forEach(function (column) {
			column.appendToParentCol(parentElement, parentSvg);
		});
	}
	rescale(containerWidth, containerHeight, scale) {
		this.rows.forEach(function (row) {
			row.rescale(containerWidth, containerHeight, scale);
		});

		this.columns.forEach(function (column) {
			column.rescale(containerWidth, containerHeight, scale);
		});
	}
	getCheckboxMinX(): number {
		if (this.rows.length === 0) {
			return null;
		}

		let minLeft = this.rows[0].getCheckboxContainerLeft();

		for (let i = 1; i < this.rows.length; i++) {
			const left = this.rows[i].getCheckboxContainerLeft();

			if (left < minLeft) {
				minLeft = left;
			}
		}

		return minLeft;
	}
	hideRowsInRowMode() {
		this.rows.forEach(function (row) {
			row.hideInRowMode();
		});
	}
	hideColumnsInColumnMode() {
		this.columns.forEach(function (column) {
			column.hideInColumnMode();
		});
	}
	reset() {
		this.selectedRows = 0;

		this.rows.forEach(function (row) {
			row.reset();
		});

		this.columns.forEach(function (column) {
			column.reset();
		});
	}

	subscribeOnColumnSelected(callback: (arg: RecognizedColumn) => void) {
		this.columns.forEach((column) => column.subscribeOnMousedown(() => callback(column)));
	}

	getSelectedCellInfos(column: RecognizedColumn): RecognizedCellMapIndex[] {
		const selectedRows = this.rows.filter((row) => row.getSelected());
		const selectedCellInfos: RecognizedCellMapIndex[] = [];

		for (let i = 0; i < this.cells.length; i++) {
			const cell = this.cells[i];
			if (cell.columnIndex !== column.index) {
				continue;
			}

			const rowsContainCell = selectedRows.some(row => cell.rowIndex === row.index);
			if (!rowsContainCell) {
				continue;
			}
			selectedCellInfos.push({ cell: cell, index: i });
		}

		return selectedCellInfos;
	}

	activateRows(rowIndices: number[]): void {
		this.rows.forEach(function (r) {
			if (rowIndices.indexOf(r.index) !== -1) {
				r.setSelected(true);
			}
		});
	}
	activateColumns(columnInfoSet: Map<number, RecognizedGridColumnMap>): void {
		for (let index = 0; index < this.columns.length; index++) {
			const column = this.columns[index];
			const selectedCellIndexes = this.getSelectedCellInfos(column);
			const selectedCells = selectedCellIndexes.map((ci) => ci.cell);
			column.hideNotSelectedCells(selectedCells);

			if (columnInfoSet.has(index) && !column.getSelected()) {
				const mappingInfo: RecognizedGridColumnMap = columnInfoSet.get(index);
				mappingInfo.mappings.forEach((mapping) => column.setGridMapping(getKeyFromValues(mapping.columnName, mapping.rowIndex), mapping));
				column.setGridMapping(column.gridFieldName, mappingInfo.mappings[0]);
				column.setSelected(true);
			}
		}
	}

	allowSelectMoreRows(allow: boolean) {
		this.rows.forEach((r) => {
			if (!r.getSelected()) {
				r.allowSelect(allow);
			}
		});
	}

	private setCurentRow(row: RecognizedRow): void {
		if (this.currentRow != null) {
			this.currentRow.setActive(false);
		}

		this.currentRow = row;
		this.currentRow.setActive(true);
	}

	private multipleRowsSelected(row: RecognizedRow): void {
		const isSelected = row.getSelected();
		row.setSelected(!isSelected);

		const currentRowIndex = this.rows.indexOf(this.currentRow);
		const rowIndex = this.rows.indexOf(row);

		const currentRowOffset = this.currentRow.getSelected() === isSelected ? 1 : 0;
		const firstRowIndex = currentRowIndex < rowIndex ? currentRowIndex + currentRowOffset : rowIndex;
		const lastRowIndex = currentRowIndex > rowIndex ? currentRowIndex - currentRowOffset : rowIndex;

		for (let i = firstRowIndex; i <= lastRowIndex; i++) {
			if (this.rows[i].getSelected() === isSelected && this.rows[i] !== row) {
				continue;
			}

			this.rows[i].setSelected(isSelected);
			this._singleRowSelected(this.rows[i]);

			if (this.maxRowsToSelect?.() !== null && this.maxRowsToSelect() === this.selectedRows) {
				break;
			}
		}
	}
}

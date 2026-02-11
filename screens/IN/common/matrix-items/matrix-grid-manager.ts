import {
	IGridColumn,
	GridCell,
	GridColumnDisplayMode,
	ScreenService,
	ServerCommand,
} from "client-controls";

export class MatrixGridManager {
	public static readonly ExtraColumn = "Extra";
	public static readonly AttributeValueTemplate = "AttributeValue";
	private static readonly BaseUOMField = "BaseUOM";
	private static readonly UOMsField = "UOMs";
	private static readonly MatrixFields = [ "RowAttributeValueDescr", this.ExtraColumn ];
	private static readonly MatrixItemsFields = [ "UOM", "Qty", "InventoryCD", "Descr", "New", "StkItem", "BasePrice", "ItemClassID", "TaxCategoryID" ];
	private static readonly AttributesPlaceholderField = "AttributeValue0";
	private static readonly FilesKey = "Files";
	private static readonly NotesKey = "Notes";
	private static matrixGridOldColumnName = null;

	public static AdditionalAttributesFilterColumns(column: IGridColumn) {
		column.commitChanges = true;
		column.displayMode = GridColumnDisplayMode.Text;
		column.hideViewLink = true;

		return column.field !== MatrixGridManager.ExtraColumn;
	}

	public static MatrixFilterColumns(column: IGridColumn) {
		column.commitChanges = true;

		return column.field !== undefined &&
			(column.field.startsWith(MatrixGridManager.AttributeValueTemplate) ||
			MatrixGridManager.MatrixFields.includes(column.field));
	}

	public static MatrixColumnsGenerated(columns: IGridColumn[]) {
		const totalIndex = columns.findIndex(v => v.field === MatrixGridManager.ExtraColumn);
		if (totalIndex >= 0) {
			columns.push(columns.splice(totalIndex, 1)[0]);
		}
	}

	public static MatrixItemsFilterColumns(column: IGridColumn) {
		column.commitChanges = true;

		return column.field !== undefined &&
			(column.field.startsWith(MatrixGridManager.AttributeValueTemplate) ||
			MatrixGridManager.MatrixItemsFields.includes(column.field)) ||
			column.generated === true && (column.key === this.FilesKey || column.key === this.NotesKey);
	}

	public static MatrixItemsColumnsGenerated(columns: IGridColumn[]) {
		let templateFieldIndex = 0;
		let columnCounter = 0;

		for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
			const column = columns[columnIndex];

			if (column.field === MatrixGridManager.AttributesPlaceholderField) {
				templateFieldIndex = columnIndex;
			}

			if (column.field !== undefined && column.field.startsWith(MatrixGridManager.AttributeValueTemplate)) {
				column.hideViewLink = true;
				columns.splice(columnIndex, 1);
				columns.splice(templateFieldIndex + columnCounter++, 0, column);
			}
		}
	}

	public static GetRowCss(row) {
		if (row?.IsTotal?.value === true) {
			return "bold-row";
		}
		return undefined;
	}

	public static GetCellCss(row, column: string) {
		if (column === MatrixGridManager.ExtraColumn) {
			return "bold-row";
		}
		return undefined;
	}

	public static SetColumnName(screenService: ScreenService, columnName: string) {
		if (!columnName || columnName === MatrixGridManager.matrixGridOldColumnName) return;
		screenService.executeCommand(new ServerCommand("MatrixGridCellChanged", [columnName]));
		MatrixGridManager.matrixGridOldColumnName = columnName;
	}

	public static GetMatrixCellText(fieldName: string, cells: { [k: string]: GridCell }, defaultText: string) : string {
		if (fieldName === undefined || fieldName == null || fieldName === "" ||
			cells === undefined || cells == null ||
			defaultText === undefined || defaultText == null || defaultText === "") {
			return undefined;
		}

		let uom : string = undefined;
		const isTotalField = (fieldName === MatrixGridManager.ExtraColumn);
		if (isTotalField) {
			uom = cells[MatrixGridManager.BaseUOMField].value;
		}

		const attributeNumber = this.getAttributeNumber(fieldName);
		if (attributeNumber !== undefined) {
			uom = cells[MatrixGridManager.UOMsField].value[attributeNumber];
		}

		if (uom !== undefined) {
			return `${defaultText} ${uom}`;
		}

		return undefined;
	}

	protected static getAttributeNumber(fieldName : string) : number {
		if (fieldName === undefined ||
			!fieldName.startsWith(MatrixGridManager.AttributeValueTemplate)) {
			return undefined;
		}

		const attributeNumber = fieldName.substring(MatrixGridManager.AttributeValueTemplate.length);
		if (attributeNumber === undefined || attributeNumber == null || attributeNumber === "") {
			return undefined;
		}

		const value = parseInt(attributeNumber, 10);
		if (isNaN(value)) {
			return undefined;
		}

		return value;
	}
}

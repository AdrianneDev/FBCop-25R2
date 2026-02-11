import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,

	GridPreset,
	IGridColumn,
	GridColumnGeneration,
	GridColumnShowHideMode,
	GridAutoGrowMode,
} from "client-controls";
import { MatrixGridManager } from "../matrix-grid-manager";

export abstract class CreateMatrixItemsBase {
	@viewInfo({ containerName: "Additional Attributes" })
	AdditionalAttributes = createCollection(AdditionalAttributes);

	@viewInfo({ containerName: "Matrix" })
	Matrix = createCollection(EntryMatrix);

	@viewInfo({ containerName: "Create Matrix Items" })
	MatrixItemsForCreation = createCollection(MatrixItemsForCreation);
}

// Views

export class CreateMatrixHeaderBase extends PXView {
	ColAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	RowAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	generateColumns: GridColumnGeneration.Recreate,
	showTopBar: false,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class AdditionalAttributes extends PXView {
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	generateColumns: GridColumnGeneration.Append,
})
export class EntryMatrix extends PXView {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	IsPreliminary: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	generateColumns: GridColumnGeneration.Append,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class MatrixItemsForCreation extends PXView {
	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryCD: PXFieldState;

	Descr: PXFieldState;
	StkItem: PXFieldState;
	ItemType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ItemClassID: PXFieldState;

	ItemClassID_description: PXFieldState;
	ValMethod: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LotSerClassID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DfltSiteID: PXFieldState;

	DfltSiteID_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;

	TaxCategoryID_description: PXFieldState;
}

export class CreateMatrixGridManager extends MatrixGridManager {
	public static readonly PreliminaryColumn = "Preliminary";
	private static readonly MatrixItemsForCreationFields = [ "Selected", "InventoryCD", "Descr", "StkItem", "ItemType", "ItemClassID", "ItemClassID_description", "ValMethod", "LotSerClassID", "DfltSiteID", "DfltSiteID_description", "TaxCategoryID", "TaxCategoryID_description" ];

	public static GetCreateMatrixRowCss(row: EntryMatrix) : string {
		if (row?.IsPreliminary?.value === true) {
			return "matrix-cell";
		}
		return undefined;
	}

	public static GetCreateMatrixCellCss(row: EntryMatrix, column: string) : string {
		if (column === CreateMatrixGridManager.PreliminaryColumn) {
			return "matrix-cell";
		}
		return undefined;
	}

	public static MatrixItemsForCreationFilterColumns(column: IGridColumn) {
		return column.field !== undefined &&
			(column.field.startsWith(MatrixGridManager.AttributeValueTemplate) ||
			CreateMatrixGridManager.MatrixItemsForCreationFields.includes(column.field));
	}
}

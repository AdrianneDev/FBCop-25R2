import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	GridPreset,
	GridColumnGeneration,
	columnConfig,
	GridColumnShowHideMode,
	GridCell,
} from "client-controls";

export abstract class AddMatrixItemsBase {
	Header = createSingle(AddMatrixItemHeader);

	@viewInfo({ containerName: "Add Matrix Item" })
	AdditionalAttributes = createCollection(MatrixAttributes);

	@viewInfo({ containerName: "Add Matrix Item - Matrix View" })
	Matrix = createCollection(EntryMatrix);

	@viewInfo({ containerName: "Add Matrix Item - Table View" })
	MatrixItems = createCollection(MatrixItems);
}

export class AddMatrixItemHeader extends PXView {
	TemplateItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	ColAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	RowAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showTopBar: false,
	allowInsert: false,
	allowDelete: false,
	generateColumns: GridColumnGeneration.Recreate,
})
export class MatrixAttributes extends PXView {}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	generateColumns: GridColumnGeneration.Append,
	statusField: "MatrixAvailability",
})
export class EntryMatrix extends PXView {
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	BaseUOM: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	UOMs: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	IsTotal: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	MatrixAvailability: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	generateColumns: GridColumnGeneration.Append,
})
export class MatrixItems extends PXView {
	AttributeValue0: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	Qty: PXFieldState;
	InventoryCD: PXFieldState;
	Descr: PXFieldState;
	New: PXFieldState;
	StkItem: PXFieldState;
	BasePrice: PXFieldState;
	ItemClassID: PXFieldState;
	TaxCategoryID: PXFieldState;
}

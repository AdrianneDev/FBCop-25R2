import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INKitSpecMaint",
	primaryView: "Hdr",
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class IN209500 extends PXScreen {
	@viewInfo({ containerName: "Kit Specification Summary" })
	Hdr = createSingle(INKitSpecHdr);

	@viewInfo({ containerName: "Stock Components" })
	StockDet = createCollection(INKitSpecStkDet);

	@viewInfo({ containerName: "Non Stock Components" })
	NonStockDet = createCollection(INKitSpecNonStkDet);
}

export class INKitSpecHdr extends PXView {
	KitInventoryID: PXFieldState;
	IsNonStock: PXFieldState<PXFieldOptions.Disabled>;
	RevisionID: PXFieldState;
	Descr: PXFieldState;
	KitSubItemID: PXFieldState;
	IsActive: PXFieldState;
	AllowCompAddition: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class INKitSpecStkDet extends PXView {
	CompInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	CompInventoryID_InventoryItem_Descr: PXFieldState;

	CompSubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltCompQty: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowQtyVariation: PXFieldState;

	@columnConfig({ allowNull: true })
	MinCompQty: PXFieldState;

	@columnConfig({ allowNull: true })
	MaxCompQty: PXFieldState;

	@columnConfig({ allowNull: true })
	DisassemblyCoeff: PXFieldState;

	AllowSubstitution: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class INKitSpecNonStkDet extends PXView {
	CompInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	CompInventoryID_InventoryItem_Descr: PXFieldState;

	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltCompQty: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowQtyVariation: PXFieldState;

	@columnConfig({ allowNull: true })
	MinCompQty: PXFieldState;

	@columnConfig({ allowNull: true })
	MaxCompQty: PXFieldState;
}
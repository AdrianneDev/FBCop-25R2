import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnShowHideMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INPICountEntry",
	primaryView: "PIHeader",
	showActivitiesIndicator: true
})
export class IN305010 extends PXScreen {
	AddLine2: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	PIHeader = createSingle(INPIHeader);

	@viewInfo({ containerName: "Document Summary" })
	Filter = createSingle(PICountFilter);

	@viewInfo({ containerName: "Physical Inventory Details" })
	PIDetail = createCollection(INPIDetail);
}

export class INPIHeader extends PXView {
	PIID: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.Disabled>;
	Descr: PXFieldState;
	CountDate: PXFieldState<PXFieldOptions.Disabled>;
	LineCntr: PXFieldState<PXFieldOptions.Disabled>;
}

export class PICountFilter extends PXView {
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItem: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	StartLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	EndLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
})
export class INPIDetail extends PXView {
	AddLine: PXActionState;

	@columnConfig({ allowUpdate: false })
	Status: PXFieldState;

	@columnConfig({ allowUpdate: false })
	LineNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	TagNumber: PXFieldState;

	InventoryID: PXFieldState;
	InventoryID_InventoryItem_descr: PXFieldState;
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	LotSerialNbr: PXFieldState;

	@columnConfig({ allowUpdate: false, allowShowHide: GridColumnShowHideMode.Server })
	BookQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryItem__BaseUnit: PXFieldState;

	PhysicalQty: PXFieldState;

	@columnConfig({ allowUpdate: false, allowShowHide: GridColumnShowHideMode.Server })
	VarQty: PXFieldState;
}
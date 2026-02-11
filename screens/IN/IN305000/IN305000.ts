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
	PXPageLoadBehavior,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INPIReview",
	primaryView: "PIHeader",
	pageLoadBehavior: PXPageLoadBehavior.GoLastRecord,
	showUDFIndicator: true,
	bpEventsIndicator: true,
	showActivitiesIndicator: true,
})
export class IN305000 extends PXScreen {
	AddLine2: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	PIHeader = createSingle(INPIHeader);

	@viewInfo({ containerName: "Document Summary" })
	PIHeaderInfo = createSingle(INPIHeader2);

	@viewInfo({ containerName: "Physical Inventory Details" })
	PIDetail = createCollection(INPIDetail);
}

export class INPIHeader extends PXView {
	PIID: PXFieldState;
	SiteID: PXFieldState;
	Status: PXFieldState;
	CountDate: PXFieldState;
	Descr: PXFieldState;
}

export class INPIHeader2 extends PXView {
	TotalPhysicalQty: PXFieldState<PXFieldOptions.Disabled>;
	TotalVarQty: PXFieldState<PXFieldOptions.Disabled>;
	TotalVarCost: PXFieldState<PXFieldOptions.Disabled>;
	BaseCuryID: PXFieldState<PXFieldOptions.Disabled>;
	PIAdjRefNbr: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowImport: true,
	adjustPageSize: true,
})
export class INPIDetail extends PXView {
	AddLine: PXActionState;

	@columnConfig({ allowUpdate: false })
	Status: PXFieldState;

	LineNbr: PXFieldState;

	TagNumber: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID_InventoryItem_descr: PXFieldState;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;


	@columnConfig({hideViewLink: true})
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState;
	BookQty: PXFieldState;

	@columnConfig({hideViewLink: true})
	InventoryItem__BaseUnit: PXFieldState;

	PhysicalQty: PXFieldState<PXFieldOptions.CommitChanges>;
	VarQty: PXFieldState;
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({allowUpdate: false})
	ExtVarCost: PXFieldState;
	FinalExtVarCost: PXFieldState;
	ManualCost: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({hideViewLink: true})
	ReasonCode: PXFieldState;
}

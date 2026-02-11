import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	linkCommand,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.BOMCostRoll", primaryView: "settings" })
export class AM508000 extends PXScreen {

	settings = createSingle(Settings);
	BomCostRecs = createCollection(BomCostRecs);
}

export class Settings extends PXView {
	SnglMlti: PXFieldState;
	ProcessAction: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteId: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	BOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	EffectiveDate: PXFieldState;
	ApplyPend: PXFieldState;
	IncMatScrp: PXFieldState;
	IncFixed: PXFieldState;
	UpdateMaterial: PXFieldState;
	UsePending: PXFieldState;
	IgnoreMinMaxLotSizeValues: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class BomCostRecs extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	BOMID: PXFieldState;
	RevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	UnitCost: PXFieldState;
	MatlManufacturedCost: PXFieldState;
	MatlNonManufacturedCost: PXFieldState;
	MatlCost: PXFieldState;
	FLaborCost: PXFieldState;
	VLaborCost: PXFieldState;
	FOvdCost: PXFieldState;
	VOvdCost: PXFieldState;
	ToolCost: PXFieldState;
	MachCost: PXFieldState;
	SubcontractMaterialCost: PXFieldState;
	ReferenceMaterialCost: PXFieldState;
	LotSize: PXFieldState;
	AMBomItem__Status: PXFieldState;
	AMBomItem__Descr: PXFieldState;
	MultiLevelProcess: PXFieldState;
	Level: PXFieldState;
	IsDefaultBom: PXFieldState;
	FixedLaborTime: PXFieldState;
	VariableLaborTime: PXFieldState;
	MachineTime: PXFieldState;
	@columnConfig({ hideViewLink: true }) ItemClassID: PXFieldState;
	StdCost: PXFieldState;
	PendingStdCost: PXFieldState;
	ReplenishmentSource: PXFieldState;
}

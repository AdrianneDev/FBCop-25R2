import {
	PXScreen,
	viewInfo,
	createCollection,
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

@graphInfo({ graphType: "PX.Objects.AM.CostRollHistory", primaryView: "CostRollHistoryRecords" })
export class AM408000 extends PXScreen {
	// to remove the button from the screen toolbar
	ViewBOM: PXActionState;

	CostRollHistoryRecords = createCollection(CostRollHistoryRecords);
}

@gridConfig({
	preset: GridPreset.Inquiry,
})
export class CostRollHistoryRecords extends PXView {
	@linkCommand("ViewBOM") BOMID: PXFieldState;
	RevisionID: PXFieldState;
	CreatedDateTime: PXFieldState;
	LastModifiedDateTime: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
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
	@columnConfig({ hideViewLink: true }) ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	StdCost: PXFieldState;
	PendingStdCost: PXFieldState;
	LastCost: PXFieldState;
	AvgCost: PXFieldState;
	MinCost: PXFieldState;
	MaxCost: PXFieldState;
}

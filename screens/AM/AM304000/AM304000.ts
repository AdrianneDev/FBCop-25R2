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
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.EstimateOperMaint", primaryView: "EstimateOperationRecords", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM304000 extends PXScreen {
	EstimateOperationRecords = createSingle(AMEstimateOper);
	EstimateOperRecordSelected = createSingle(AMEstimateOper2);
	@viewInfo({ containerName: "Material" })
	EstimateOperMatlRecords = createCollection(AMEstimateMatl);
	@viewInfo({ containerName: "Steps" })
	EstimateOperStepRecords = createCollection(AMEstimateStep);
	@viewInfo({ containerName: "Tools" })
	EstimateOperToolRecords = createCollection(AMEstimateTool);
	@viewInfo({ containerName: "Overhead" })
	EstimateOperOvhdRecords = createCollection(AMEstimateOvhd);
}

export class AMEstimateOper extends PXView {
	EstimateID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	OperationCD: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	SetupTime: PXFieldState<PXFieldOptions.CommitChanges>;
	SetupTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
	RunUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnitTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
	MachineUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnitTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
	QueueTime: PXFieldState;
	QueueTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
	FinishTime: PXFieldState;
	FinishTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
	MoveTime: PXFieldState;
	MoveTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
	Description: PXFieldState;
	FixedLaborCost: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedLaborOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableLaborCost: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableLaborOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineCost: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MaterialCost: PXFieldState<PXFieldOptions.CommitChanges>;
	MaterialOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ToolCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ToolOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedOverheadCost: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedOverheadOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableOverheadCost: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableOverheadOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractCost: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ReferenceMaterialCost: PXFieldState;
	BackflushLabor: PXFieldState<PXFieldOptions.CommitChanges>;
	ControlPoint: PXFieldState;
}

export class AMEstimateOper2 extends PXView {
	OutsideProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	DropShippedToVendor: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "PasteLine",
})
export class AMEstimateMatl extends PXView {
	ResetOrder: PXActionState;

	InventoryCD: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	ItemDesc: PXFieldState;
	@columnConfig({ hideViewLink: true }) ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyReq: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	BackFlush: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScrapFactor: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchSize: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyRoundUp: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalQtyRequired: PXFieldState<PXFieldOptions.CommitChanges>;
	MaterialOperCost: PXFieldState<PXFieldOptions.CommitChanges>;
	IsNonInventory: PXFieldState;
	MaterialType: PXFieldState<PXFieldOptions.CommitChanges>;
	PhantomRouting: PXFieldState;
	LineID: PXFieldState;
	SortOrder: PXFieldState;
	SubcontractSource: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMEstimateStep extends PXView {
	Description: PXFieldState;
	LineID: PXFieldState;
	OperationID: PXFieldState;
	SortOrder: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMEstimateTool extends PXView {
	ToolID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	QtyReq: PXFieldState;
	UnitCost: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMEstimateOvhd extends PXView {
	OvhdID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	OvhdType: PXFieldState;
	OverheadCostRate: PXFieldState<PXFieldOptions.CommitChanges>;
	OFactor: PXFieldState<PXFieldOptions.CommitChanges>;
	WCFlag: PXFieldState<PXFieldOptions.CommitChanges>;
}

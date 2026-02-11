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
	CurrencyInfo,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.EstimateMaint", primaryView: "Documents", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM303000 extends PXScreen {
	Documents = createSingle(AMEstimateItem);
	EstimateRecordSelected = createSingle(AMEstimateItem2);
	@viewInfo({ containerName: "Operations" })
	EstimateOperRecords = createCollection(AMEstimateOper);
	@viewInfo({ containerName: "References" })
	EstimateReferenceRecord = createSingle(AMEstimateReference);
	@viewInfo({ containerName: "History" })
	EstimateHistoryRecords = createCollection(AMEstimateHistory);
	@viewInfo({ containerName: "Price Breaks" })
	PriceBreaks = createCollection(AMEstimatePriceBreak);
	@viewInfo({ containerName: "Create Production Order" })
	CreateProductionOrderFilter = createSingle(CreateProdOrderFilter);
	@viewInfo({ containerName: "Create BOM" })
	CreateBomItemFilter = createSingle(CreateBOMFilter);
	@viewInfo({ containerName: "Add to Order" })
	Add2OrderFilter = createSingle(AddToOrderFilter);
	@viewInfo({ containerName: "Add Comment" })
	HistoryFilterRecord = createSingle(HistoryFilter);
	@viewInfo({ containerName: "Copy From" })
	CopyEstimateFromFilter = createSingle(AMCopyEstimateFrom);
	_AMEstimateItem_CurrencyInfo_ = createSingle(CurrencyInfo);
}

export class AMEstimateItem extends PXView {
	EstimateID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsNonInventory: PXFieldState;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPrimary: PXFieldState;
	InventoryCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemDesc: PXFieldState;
	SubItemID: PXFieldState;
	EstimateClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState;
	EngineerID: PXFieldState;
	RequestDate: PXFieldState;
	PromiseDate: PXFieldState;
	LeadTime: PXFieldState;
	LeadTimeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	RoundUpUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	EstimateStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	QuoteSource: PXFieldState;
	RevisionDate: PXFieldState;
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
	ExtCostDisplay: PXFieldState<PXFieldOptions.CommitChanges>;
	ReferenceMaterialCost: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AMEstimateItem2 extends PXView {
	ImageUrl: PXFieldState;
	Body: PXFieldState;
	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	LaborMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	MaterialMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	ToolMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	OverheadMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	MarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	MarkupPctOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class AMEstimateOper extends PXView {
	@linkCommand("ViewOperation") OperationCD: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) WorkCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	SetupTime: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	QueueTime: PXFieldState<PXFieldOptions.CommitChanges>;
	FinishTime: PXFieldState<PXFieldOptions.CommitChanges>;
	MoveTime: PXFieldState<PXFieldOptions.CommitChanges>;
	BackFlushLabor: PXFieldState<PXFieldOptions.CommitChanges>;
	ControlPoint: PXFieldState;
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
	ReferenceMaterialCost: PXFieldState;
	OutsideProcess: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AMEstimateReference extends PXView {
	OpportunityID: PXFieldState;
	QuoteType: PXFieldState;
	QuoteNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	QuoteNbrLink: PXFieldState;
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState;
	ExternalRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoAdjustColumns: true,
	syncPosition: true,
})
export class AMEstimateHistory extends PXView {
	AddHistory: PXActionState;
	RevisionID: PXFieldState;
	@columnConfig({ format: "g" }) CreatedDateTime: PXFieldState;
	CreatedByID: PXFieldState;
	@columnConfig({ width: 800 }) Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
	autoInsert: true,
})
export class AMEstimatePriceBreak extends PXView {
	IsPrimary: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	LeadTimeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	LeadTime: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState;
	CuryUnitCost: PXFieldState;
	CuryExtCost: PXFieldState;
	MarkupPctOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	LaborMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	MaterialMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	ToolMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	OverheadMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedLaborOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedLaborCost: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableLaborOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableLaborCost: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineCost: PXFieldState<PXFieldOptions.CommitChanges>;
	MaterialOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MaterialCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ToolOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ToolCost: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedOverheadOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedOverheadCost: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableOverheadOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	VariableOverheadCost: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ReferenceMaterialCost: PXFieldState;
	Print: PXFieldState;
}

export class CreateProdOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateSubAssemblyOrders: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CreateBOMFilter extends PXView {
	BomID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AddToOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class HistoryFilter extends PXView {
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AMCopyEstimateFrom extends PXView {
	CopyFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	EstimateID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMRevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

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
	headerDescription,
	GridAutoGrowMode,
	handleEvent,
	CustomEventType,
	CurrentRowChangedHandlerArgs,
	PXViewCollection,
	GridColumnShowHideMode,
	GridPagerMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.ProdDetail", primaryView: "ProdItemRecords", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM209000 extends PXScreen {
	@viewInfo({ containerName: "Prod Order" })
	ProdItemRecords = createSingle(AMProdItem);
	@viewInfo({ containerName: "Operations" })
	ProdOperRecords = createCollection(AMProdOper);
	@viewInfo({ containerName: "Materials" })
	ProdMatlRecords = createCollection(AMProdMatl);
	@viewInfo({ containerName: "Steps" })
	ProdStepRecords = createCollection(AMProdStep);
	@viewInfo({ containerName: "Tools" })
	ProdToolRecords = createCollection(AMProdTool);
	@viewInfo({ containerName: "Overhead" })
	ProdOvhdRecords = createCollection(AMProdOvhd);
	@viewInfo({ containerName: "Totals" })
	ProdOperSelected = createSingle(AMProdOper2);
	@viewInfo({ containerName: "Purchasing Settings" })
	currentposupply = createSingle(AMProdMatl2);
	@viewInfo({ containerName: "Purchasing Details" })
	posupply = createCollection(POLineMatl);
	@viewInfo({ containerName: "None" })
	linkProdOrderSelectFilter = createSingle(linkProdOrderSelectFilter);
	@viewInfo({ containerName: "Production Details" })
	AMProdMatlLinkRecords = createCollection(AMProdMatlLinkRecords);

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "ProdMatlRecords" })
	onProdMatlChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<AMProdMatl>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.POSupplyOK) model.POSupplyOK.enabled = !!ar?.POLinkEnable?.value;
		if (model.linkProdOrder) model.linkProdOrder.enabled = !!ar?.ProdLinkEnable?.value;

	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "ProdOperRecords" })
	onProdOperChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<AMProdOper>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.CreatePurchaseOrder) model.CreatePurchaseOrder.enabled = !!ar?.OutsideProcess.value;
		if (model.CreateVendorShipment) model.CreateVendorShipment.enabled = !!ar?.OutsideProcess.value;
	}
}

export class AMProdItem extends PXView {
	@headerDescription
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription
	ProdOrdID: PXFieldState;
	ProdDate: PXFieldState;
	InventoryID: PXFieldState;
	QtytoProd: PXFieldState;
	UOM: PXFieldState;
	SubItemID: PXFieldState;
	SiteId: PXFieldState;
	StatusID: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState;
	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	QtyRemaining: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	autoRepaint: ["ProdMatlRecords", "ProdStepRecords", "ProdToolRecords", "ProdOvhdRecords", "ProdOperSelected"],
})
export class AMProdOper extends PXView {
	CreatePurchaseOrder: PXActionState;
	CreateVendorShipment: PXActionState;

	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	OperationCD: PXFieldState<PXFieldOptions.CommitChanges>;
	WcID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	SetupTime: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	QueueTime: PXFieldState;
	FinishTime: PXFieldState;
	MoveTime: PXFieldState;
	QtytoProd: PXFieldState;
	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	QtyRemaining: PXFieldState;
	TotalQty: PXFieldState;
	StatusID: PXFieldState;
	BFlush: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	ActStartDate: PXFieldState;
	ActEndDate: PXFieldState;
	ScrapAction: PXFieldState;
	PhtmBOMID: PXFieldState;
	PhtmBOMRevisionID: PXFieldState;
	PhtmBOMOperationID: PXFieldState;
	PhtmBOMLineRef: PXFieldState;
	PhtmLevel: PXFieldState;
	PhtmMatlBOMID: PXFieldState;
	PhtmMatlRevisionID: PXFieldState;
	PhtmMatlOperationID: PXFieldState;
	PhtmMatlLineRef: PXFieldState;
	PhtmPriorLevelQty: PXFieldState;
	ProdOrdID: PXFieldState;
	ControlPoint: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoReportQty: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False }) OutsideProcess: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
	allowDragRows: true,
	pasteCommand: "PasteLine",
	statusField: "Availability",
})
export class AMProdMatl extends PXView {
	ResetOrder: PXActionState;
	AddNew: PXActionState;
	Copy: PXActionState;
	Paste: PXActionState;
	MatlLineSplittingExtension_ShowSplits: PXActionState;
	InventoryAllocationDetailInqMatl: PXActionState;
	POSupplyOK: PXActionState;
	linkProdOrder: PXActionState;
	Availability: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventorySource: PXFieldState;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	QtyReq: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchSize: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusID: PXFieldState;
	BFlush: PXFieldState;
	WarehouseOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewCompBomID") CompBOMID: PXFieldState;
	CompBOMRevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScrapFactor: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalQtyRequired: PXFieldState<PXFieldOptions.CommitChanges>;
	PlanCost: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyActual: PXFieldState;
	QtyRemaining: PXFieldState;
	QtyRoundUp: PXFieldState<PXFieldOptions.CommitChanges>;
	TotActCost: PXFieldState;
	MaterialType: PXFieldState<PXFieldOptions.CommitChanges>;
	PhtmBOMID: PXFieldState;
	PhtmBOMLineRef: PXFieldState;
	PhtmBOMOperationID: PXFieldState;
	PhtmLevel: PXFieldState;
	PhtmMatlLineRef: PXFieldState;
	PhtmMatlOperationID: PXFieldState;
	IsByproduct: PXFieldState;
	LineID: PXFieldState;
	SortOrder: PXFieldState;
	POCreate: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdCreate: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractSource: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False }) POLinkEnable: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False }) ProdLinkEnable: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMProdStep extends PXView {
	Descr: PXFieldState;
	PhtmBOMID: PXFieldState;
	PhtmBOMRevisionID: PXFieldState;
	PhtmBOMOperationID: PXFieldState;
	PhtmBOMLineRef: PXFieldState;
	PhtmLevel: PXFieldState;
	PhtmMatlBOMID: PXFieldState;
	PhtmMatlRevisionID: PXFieldState;
	PhtmMatlOperationID: PXFieldState;
	PhtmMatlLineRef: PXFieldState;
	LineID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	ProdOrdID: PXFieldState;
	SortOrder: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMProdTool extends PXView {
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	LineID: PXFieldState;
	ToolID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyReq: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	TotActUses: PXFieldState<PXFieldOptions.CommitChanges>;
	TotActCost: PXFieldState<PXFieldOptions.CommitChanges>;
	PhtmBOMID: PXFieldState;
	PhtmBOMRevisionID: PXFieldState;
	PhtmBOMOperationID: PXFieldState;
	PhtmBOMLineRef: PXFieldState;
	PhtmLevel: PXFieldState;
	PhtmMatlBOMID: PXFieldState;
	PhtmMatlRevisionID: PXFieldState;
	PhtmMatlOperationID: PXFieldState;
	PhtmMatlLineRef: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMProdOvhd extends PXView {
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	LineID: PXFieldState;
	OvhdID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMOverhead__Descr: PXFieldState;
	AMOverhead__OvhdType: PXFieldState;
	OFactor: PXFieldState;
	AMOverheadCurySettings__CostRate: PXFieldState;
	TotActCost: PXFieldState;
	WCFlag: PXFieldState;
	PhtmBOMID: PXFieldState;
	PhtmBOMRevisionID: PXFieldState;
	PhtmBOMOperationID: PXFieldState;
	PhtmBOMLineRef: PXFieldState;
	PhtmLevel: PXFieldState;
	PhtmMatlBOMID: PXFieldState;
	PhtmMatlRevisionID: PXFieldState;
	PhtmMatlOperationID: PXFieldState;
	PhtmMatlLineRef: PXFieldState;
}

export class AMProdOper2 extends PXView {
	PlanLaborTime: PXFieldState;
	PlanLabor: PXFieldState;
	PlanMachine: PXFieldState;
	PlanMaterial: PXFieldState;
	PlanTool: PXFieldState;
	PlanFixedOverhead: PXFieldState;
	PlanVariableOverhead: PXFieldState;
	PlanSubcontract: PXFieldState;
	PlanQtyToProduce: PXFieldState;
	PlanTotal: PXFieldState;
	PlanCostDate: PXFieldState;
	PlanReferenceMaterial: PXFieldState;
	ActualLaborTime: PXFieldState;
	ActualLabor: PXFieldState;
	ActualMachine: PXFieldState;
	ActualMaterial: PXFieldState;
	ActualTool: PXFieldState;
	ActualFixedOverhead: PXFieldState;
	ActualVariableOverhead: PXFieldState;
	ActualSubcontract: PXFieldState;
	QtyComplete: PXFieldState;
	WIPAdjustment: PXFieldState;
	ScrapAmount: PXFieldState;
	WIPTotal: PXFieldState;
	WIPComp: PXFieldState;
	VarianceLaborTime: PXFieldState;
	VarianceLabor: PXFieldState;
	VarianceMachine: PXFieldState;
	VarianceMaterial: PXFieldState;
	VarianceTool: PXFieldState;
	VarianceFixedOverhead: PXFieldState;
	VarianceVariableOverhead: PXFieldState;
	VarianceSubcontract: PXFieldState;
	QtyRemaining: PXFieldState;
	VarianceTotal: PXFieldState;
	WIPBalance: PXFieldState;
	OutsideProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	DropShippedToVendor: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	POOrderNbr: PXFieldState;
	POLineNbr: PXFieldState;
	QtytoProd: PXFieldState;
	ShippedQuantity: PXFieldState;
	ShipRemainingQty: PXFieldState;
	AtVendorQuantity: PXFieldState;
}

export class AMProdMatl2 extends PXView {
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
})
export class POLineMatl extends PXView {
	Selected: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	VendorRefNbr: PXFieldState;
	LineType: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	VendorID: PXFieldState;
	VendorID_Vendor_AcctName: PXFieldState;
	PromisedDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	OrderQty: PXFieldState;
	OpenQty: PXFieldState;
	TranDesc: PXFieldState;
}

export class linkProdOrderSelectFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMProdMatlLinkRecords extends PXView {
	@columnConfig({ allowCheckAll: false }) Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	StatusID: PXFieldState;
	QtytoProd: PXFieldState;
	QtyComplete: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

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
	controlConfig,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.ProdMaint", primaryView: "ProdMaintRecords", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM201500 extends PXScreen {
	ProdMaintRecords = createSingle(AMProdItem);
	ProdItemSelected = createSingle(AMProdItem2);
	@viewInfo({ containerName: "References" })
	ItemConfiguration = createSingle(AMConfigurationResults);
	@viewInfo({ containerName: "Related Production" })
	relatedProdOrders = createCollection(ProdItemRelated);
	@viewInfo({ containerName: "Events" })
	ProdEventRecords = createCollection(AMProdEvnt);
	@viewInfo({ containerName: "Attributes" })
	ProductionAttributes = createCollection(AMProdAttribute);
	@viewInfo({ containerName: "Totals" })
	ProdTotalRecs = createSingle(AMProdTotal);
	@viewInfo({ containerName: "None" })
	linkSalesLinesFilter = createSingle(LinkSalesLinesFilter);
	@viewInfo({ containerName: "SO Line Details" })
	LinkSOLineRecords = createCollection(SOLine);
}

export class AMProdItem extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ displayMode: "id" }) ProdOrdID: PXFieldState;
	StatusID: PXFieldState<PXFieldOptions.CommitChanges>;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdDate: PXFieldState<PXFieldOptions.CommitChanges>;

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	QtytoProd: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState;
	Descr: PXFieldState;

	ProductOrderType: PXFieldState;
	ProductOrdID: PXFieldState;

	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	QtyRemaining: PXFieldState;
}

// General and References tabs
export class AMProdItem2 extends PXView {
	linkSalesOrder: PXActionState;

	// General tab
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProductWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProductManagerID: PXFieldState;
	SchPriority: PXFieldState<PXFieldOptions.CommitChanges>;
	CostMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	PreassignLotSerial: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentLotSerialRequired: PXFieldState<PXFieldOptions.CommitChanges>;

	ScrapOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ScrapSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScrapLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	ScheduleStatus: PXFieldState;
	SchedulingMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	ConstDate: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	DueDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FMLTime: PXFieldState;
	FMLTMRPOrdorOP: PXFieldState;
	ExcludeFromMRP: PXFieldState;
	AutoBackwardReporting: PXFieldState<PXFieldOptions.CommitChanges>;

	// References tab
	CustomerID: PXFieldState;
	OrdTypeRef: PXFieldState;
	OrdNbr: PXFieldState;
	OrdLineRef: PXFieldState;

	BranchID: PXFieldState;
	WIPAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	WIPSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	WIPVarianceAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	WIPVarianceSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	DetailSource: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMEffDate: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMRevisionID: PXFieldState<PXFieldOptions.CommitChanges>;

	EstimateID: PXFieldState<PXFieldOptions.CommitChanges>;
	EstimateRevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceProductionNbr: PXFieldState;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateProject: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AMConfigurationResults extends PXView {
	ConfigureEntry: PXActionState;
	Reconfigure: PXActionState;

	ConfigurationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Revision: PXFieldState<PXFieldOptions.CommitChanges>;
	KeyID: PXFieldState<PXFieldOptions.CommitChanges>;
}

// Related Production tab
@gridConfig({
	preset: GridPreset.Details,
})
export class ProdItemRelated extends PXView {
	RelationType: PXFieldState;
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusID: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	QtytoProd: PXFieldState;
	QtyRemaining: PXFieldState;
	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	ScheduleStatus: PXFieldState;
}

// Events tab
@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
})
export class AMProdEvnt extends PXView {
	@columnConfig({ format: "g" }) CreatedDateTime: PXFieldState;
	EventType: PXFieldState;
	Description: PXFieldState;
	CreatedByScreenIDTitle: PXFieldState;
	CreatedByScreenID: PXFieldState;
	@columnConfig({ hideViewLink: true }) CreatedByID: PXFieldState;
	RefBatNbr: PXFieldState;
	RefDocType: PXFieldState;
	@linkCommand("AMProdEvnt$RefNoteID$Link") RefNoteID: PXFieldState;
	LineNbr: PXFieldState;
}

// Attributes tab
@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class AMProdAttribute extends PXView {
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	LineNbr: PXFieldState;
	Level: PXFieldState;
	OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Source: PXFieldState;
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Label: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	Enabled: PXFieldState;
	TransactionRequired: PXFieldState;
	Value: PXFieldState;
}

// Totals tab
export class AMProdTotal extends PXView {
	PlanLaborTime: PXFieldState;
	PlanLaborTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
	PlanLabor: PXFieldState;
	PlanMachine: PXFieldState;
	PlanMaterial: PXFieldState;
	PlanTool: PXFieldState;
	PlanFixedOverhead: PXFieldState;
	PlanVariableOverhead: PXFieldState;
	PlanSubcontract: PXFieldState;
	PlanQtyToProduce: PXFieldState;
	PlanTotal: PXFieldState;
	PlanUnitCost: PXFieldState;
	PlanCostDate: PXFieldState;
	PlanReferenceMaterial: PXFieldState;

	ActualLaborTime: PXFieldState;
	ActualLaborTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
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
	VarianceLaborTimeRaw: PXFieldState<PXFieldOptions.Hidden>;
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
}

// Smart panel SO Line Details
export class LinkSalesLinesFilter extends PXView {
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class SOLine extends PXView {
	@columnConfig({ allowCheckAll: true }) AMSelected: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	OrderQty: PXFieldState;
	OpenQty: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	LineNbr: PXFieldState;
}

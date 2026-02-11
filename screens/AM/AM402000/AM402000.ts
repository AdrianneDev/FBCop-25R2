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

@graphInfo({ graphType: "PX.Objects.AM.BOMWhereUsedInq", primaryView: "Filter" })
export class AM402000 extends PXScreen {
	Filter = createSingle(Filter);
	BOMWhereUsedRecs = createCollection(BOMWhereUsedRecs);
}

export class Filter extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	MultiLevel: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowActiveOnly: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
})
export class BOMWhereUsedRecs extends PXView {
	ViewBOM: PXActionState;

	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	Level: PXFieldState;
	ParentInventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ParentItemClassID: PXFieldState;
	@columnConfig({ hideViewLink: true }) BOMSiteID: PXFieldState;
	@linkCommand("ViewBOM") BOMID: PXFieldState;
	RevisionID: PXFieldState;
	BOMStatus: PXFieldState;
	EffStartDate: PXFieldState;
	EffEndDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	EffDate: PXFieldState;
	ExpDate: PXFieldState;
	ParentSubItemID: PXFieldState;
	QtyRequired: PXFieldState;
	BatchSize: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	@columnConfig({ hideViewLink: true }) ItemClassID: PXFieldState;
	IsStockItem: PXFieldState;
	Source: PXFieldState;
	Description: PXFieldState;
	ParentDescription: PXFieldState;
	Sequence: PXFieldState;
	LineID: PXFieldState;
	SortOrder: PXFieldState;
	UnitCost: PXFieldState;
	PlanCost: PXFieldState;
	MaterialType: PXFieldState;
	PhantomRouting: PXFieldState;
	BFlush: PXFieldState;
	@columnConfig({ hideViewLink: true }) CompBOMID: PXFieldState;
	CompBOMRevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState;
	ScrapFactor: PXFieldState;
	BubbleNbr: PXFieldState;
	SubcontractSource: PXFieldState;
}

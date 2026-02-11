import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.GenerateForecastProcess", primaryView: "SelectedRecs" })
export class AM502000 extends PXScreen {
	Settings = createSingle(ForecastSettings);
	SelectedRecs = createCollection(AMForecastStaging);
}

export class ForecastSettings extends PXView {
	ForecastDate: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Seasonality: PXFieldState;
	GrowthRate: PXFieldState;
	GrowthFactor: PXFieldState;
	CalculateByMonth: PXFieldState<PXFieldOptions.CommitChanges>;
	Years: PXFieldState;
	Dependent: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessByCustomer: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteId: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	adjustPageSize: false,
	initNewRow: true,
	allowDelete: true,
	allowInsert: true,
	allowImport: true,
	actionsConfig: { insert: { hidden: false }, delete: { hidden: false } },
})
export class AMForecastStaging extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	BeginDate: PXFieldState;
	EndDate: PXFieldState;
	ForecastQty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	ChangeUnits: PXFieldState;
	PercentChange: PXFieldState;
	@columnConfig({ hideViewLink: true }) CustomerID2: PXFieldState;
	Dependent: PXFieldState;
	LastYearSalesQty: PXFieldState;
	LastYearBaseQty: PXFieldState;
	Seasonality: PXFieldState;
	@columnConfig({ hideViewLink: true }) BranchID: PXFieldState;
}

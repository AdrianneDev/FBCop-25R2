import {
	PXScreen,
	viewInfo,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.Forecast", primaryView: "ForecastRecords", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM202000 extends PXScreen {
	ForecastRecords = createCollection(ForecastRecords);
}

@gridConfig({
	preset: GridPreset.Primary,
	initNewRow: true,
})
export class ForecastRecords extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	Interval: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	BeginDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Dependent: PXFieldState;
	ActiveFlg: PXFieldState;
	ForecastID: PXFieldState;
	CustomerID: PXFieldState;
	CustomerID_description: PXFieldState;
	InventoryID_description: PXFieldState;
	@columnConfig({ hideViewLink: true }) BranchID: PXFieldState;
	SubItemID: PXFieldState;
}

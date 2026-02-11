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

@graphInfo({ graphType: "PX.Objects.AM.ClockApprovalProcess", primaryView: "UnapprovedTrans", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM516000 extends PXScreen {
	@viewInfo({ containerName: "Filter" })
	Filter = createSingle(Filter);
	@viewInfo({ containerName: "Documents" })
	UnapprovedTrans = createCollection(UnapprovedTrans);
}

export class Filter extends PXView {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class UnapprovedTrans extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	@columnConfig({ hideViewLink: true }) EmployeeID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ShiftCD: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDate: PXFieldState;
	StartTime_Date: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t" }) StartTime_Time: PXFieldState;
	EndTime_Date: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t" }) EndTime_Time: PXFieldState;
	LaborTime: PXFieldState;
	@columnConfig({ hideViewLink: true }) FinPeriodID: PXFieldState;
	WcID: PXFieldState;
	QtyScrapped: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScrapAction: PXFieldState<PXFieldOptions.CommitChanges>;
}

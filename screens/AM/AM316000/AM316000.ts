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
	GridColumnDisplayMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.MultipleProductionClockEntry", primaryView: "Document", showUDFIndicator: true })
export class AM316000 extends PXScreen {
	FillCurrentUser: PXActionState;

	@viewInfo({ containerName: "Document" })
	Document = createSingle(AMClockItem);
	@viewInfo({ containerName: "Clock Entries" })
	Transactions = createCollection(AMClockTran);
	@viewInfo({ containerName: "Operations" })
	Operations = createCollection(AMProdOper);
}

export class AMClockItem extends PXView {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class AMClockTran extends PXView {
	clockEntriesClockIn: PXActionState;
	clockEntriesClockOut: PXActionState;
	AMClockTranLineSplittingMultipleProductionExtension_ShowSplits: PXActionState;

	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	TranDate: PXFieldState;
	StartTime_Time: PXFieldState;
	EndTime_Time: PXFieldState;
	Duration: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ displayMode: GridColumnDisplayMode.Value }) ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	WcID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) ShiftCD: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	QtyScrapped: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScrapAction: PXFieldState;
	LaborTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState;
	EmployeeID: PXFieldState;
	Closeflg: PXFieldState;
	LineNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMProdOper extends PXView {
	operationsClockIn: PXActionState;

	Selected: PXFieldState;
	@columnConfig({ hideViewLink: true }) WcID: PXFieldState;
	AMWC__AllowMultiClockEntry: PXFieldState;
	ClockedInByOperation__Active: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	AMProdItem__StatusID: PXFieldState;
	OperationCD: PXFieldState;
	AMProdItem__Descr: PXFieldState;
	StatusID: PXFieldState;
	TotalQty: PXFieldState;
	QtytoProd: PXFieldState;
	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	StartDate_Date: PXFieldState;
	StartDate_Time: PXFieldState;
	EndDate_Date: PXFieldState;
	EndDate_Time: PXFieldState;
	AMProdItem__InventoryID: PXFieldState;
	AMProdItem__InventoryID_InventoryItem_descr: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__SiteID: PXFieldState;
	AMProdItem__OrdTypeRef: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__OrdNbr: PXFieldState;
	AMProdItem__OrdLineRef: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__CustomerID: PXFieldState;
	AMProdItem__CustomerID_Customer_acctName: PXFieldState;
	AMProdItem__SchPriority: PXFieldState;
	AMProdItem__ScheduleStatus: PXFieldState;
	ControlPoint: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__BranchID: PXFieldState;
}

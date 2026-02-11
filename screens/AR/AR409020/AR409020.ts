import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs,
	PXViewCollection, PXPageLoadBehavior, PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo, disabled,
	PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "ReconciliationTools.ARGLDiscrepancyByCustomerEnq", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class AR409020 extends PXScreen {

	ViewDetails: PXActionState;

	@viewInfo({containerName: "Selection"})
	Filter = createSingle(DiscrepancyEnqFilter);
	Rows = createCollection(ARHistoryResult);
}

export class DiscrepancyEnqFilter extends PXView  {

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowOnlyWithDiscrepancy: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalGLAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalXXAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalDiscrepancy: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Inquiry })
export class ARHistoryResult extends PXView {

	@linkCommand("ViewCustomer")
	AcctCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AcctName: PXFieldState;

	GLTurnover: PXFieldState;
	XXTurnover: PXFieldState;

	@linkCommand("ViewDetails")
	Discrepancy: PXFieldState;
}

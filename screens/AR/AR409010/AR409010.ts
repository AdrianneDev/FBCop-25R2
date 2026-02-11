import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType,
	RowSelectedHandlerArgs, PXViewCollection, PXPageLoadBehavior, PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo,
	disabled,  PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset
} from "client-controls";

@graphInfo({ graphType: "ReconciliationTools.ARGLDiscrepancyByAccountEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AR409010 extends PXScreen {

	ViewDetails: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(DiscrepancyEnqFilter);
	Rows = createCollection(GLTran);
}

export class DiscrepancyEnqFilter extends PXView {

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodTo: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowOnlyWithDiscrepancy: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalGLAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalXXAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalDiscrepancy: PXFieldState<PXFieldOptions.Disabled>;
}


@gridConfig({ preset: GridPreset.Inquiry })
export class GLTran extends PXView {

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	GLTurnover: PXFieldState;

	XXTurnover: PXFieldState;

	NonXXTrans: PXFieldState;

	@linkCommand("ViewDetails")
	Discrepancy: PXFieldState;
}

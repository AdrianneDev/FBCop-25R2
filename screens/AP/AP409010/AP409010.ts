import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, graphInfo, PXPageLoadBehavior, PXScreen,
	createSingle, createCollection, PXActionState, GridPreset
} from "client-controls";

@graphInfo({ graphType: "ReconciliationTools.APGLDiscrepancyByAccountEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AP409010 extends PXScreen {

	ViewDetails: PXActionState;

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

	FinPeriodID: PXFieldState;
	GLTurnover: PXFieldState;
	XXTurnover: PXFieldState;
	NonXXTrans: PXFieldState;

	@linkCommand("ViewDetails")
	Discrepancy: PXFieldState;
}

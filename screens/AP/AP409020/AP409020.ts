import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, PXActionState, graphInfo, PXPageLoadBehavior,
	PXScreen, createSingle, createCollection, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "ReconciliationTools.APGLDiscrepancyByVendorEnq",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class AP409020 extends PXScreen {

	ViewVendor: PXActionState;
	ViewDetails: PXActionState;

	Filter = createSingle(DiscrepancyEnqFilter);
	Rows = createCollection(APHistoryResult);

}

export class DiscrepancyEnqFilter extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowOnlyWithDiscrepancy: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalGLAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalXXAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalDiscrepancy: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Inquiry })
export class APHistoryResult extends PXView {

	@linkCommand("ViewVendor")
	AcctCD: PXFieldState;

	AcctName: PXFieldState;
	GLTurnover: PXFieldState;
	XXTurnover: PXFieldState;

	@linkCommand("ViewDetails")
	Discrepancy: PXFieldState;

}

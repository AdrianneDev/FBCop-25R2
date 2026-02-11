import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, PXActionState, graphInfo, PXPageLoadBehavior,
	PXScreen, createSingle, createCollection, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "ReconciliationTools.APGLDiscrepancyByDocumentEnq",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class AP409030 extends PXScreen {

	ViewDocument: PXActionState;
	ViewBatch: PXActionState;

	Filter = createSingle(DiscrepancyEnqFilter);
	Rows = createCollection(APDocumentResult);

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
export class APDocumentResult extends PXView {

	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	Status: PXFieldState;

	OrigDocAmt: PXFieldState;

	@linkCommand("ViewBatch")
	BatchNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	GlTurnover: PXFieldState;
	XXTurnover: PXFieldState;
	Discrepancy: PXFieldState;
}

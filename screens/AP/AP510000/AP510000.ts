import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, createCollection, createSingle,
	PXScreen, graphInfo, PXPageLoadBehavior, PXActionState, GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AP.APRetainageRelease",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class AP510000 extends PXScreen {

	ViewDocument: PXActionState;

	Filter = createSingle(APRetainageFilter);
	DocumentList = createCollection(APInvoice);

}

export class APRetainageFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowBillsWithOpenBalance: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class APInvoice extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	LineNbr: PXFieldState;
	RetainageReleasePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageReleasedAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageUnreleasedCalcAmt: PXFieldState;
	DocDate: PXFieldState;
	CuryOrigDocAmtWithRetainageTotal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DisplayProjectID: PXFieldState;

	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	InvoiceNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTranInventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTranTaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTranCostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTranAccountID: PXFieldState;
}

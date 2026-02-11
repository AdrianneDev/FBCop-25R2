import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, PXPageLoadBehavior, viewInfo,
	gridConfig, columnConfig, linkCommand,
	PXFieldOptions,
	CurrencyInfo, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARChargeInvoices", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class AR511000 extends PXScreen {
	ViewDocument: PXActionState;

	@viewInfo({containerName: "Selection"})
	Filter = createSingle(PayBillsFilter);

	@viewInfo({containerName: "Payment Details"})
    ARDocumentList = createCollection(ARInvoice);

	_PayBillsFilter_CurrencyInfo_ = createSingle(CurrencyInfo);
}

export class PayBillsFilter extends PXView {
	PayDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PayFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowOverDueFor: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	OverDueFor: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	ShowDueInLessThan: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	DueInLessThan: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	ShowDiscountExparedWithinLast: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	DiscountExparedWithinLast: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	ShowDiscountExpiresInLessThan: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	DiscountExpiresInLessThan: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
}

@gridConfig({
	initNewRow: true,
	preset: GridPreset.Processing
})
export class ARInvoice extends PXView {
	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true, format: ">AAAAAAAAAA" })
	CustomerID: PXFieldState;

	CustomerID_BAccountR_acctName: PXFieldState;

	DueDate: PXFieldState;
	DiscDate: PXFieldState;
	InvoiceNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CashAccount__CashAccountCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CashAccount__CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerPaymentMethod__PaymentMethodID: PXFieldState;

	CustomerPaymentMethod__Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TermsID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Customer__StatementCycleID: PXFieldState;
}

import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, CurrencyInfo, PXFieldOptions,
	controlConfig, columnConfig, linkCommand, PXActionState, GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.TX.TXInvoiceEntry", primaryView: "Document", udfTypeField: "DocType",
	showUDFIndicator: true, bpEventsIndicator: true, showActivitiesIndicator: true
})
export class TX303000 extends PXScreen {

	AddInvoicesOK: PXActionState;
	ViewPayment: PXActionState;
	Inquiry: PXActionState;
	Report: PXActionState;
	ReverseInvoice: PXActionState;
	VendorRefund: PXActionState;
	VoidDocument: PXActionState;
	PayInvoice: PXActionState;
	ViewSchedule: PXActionState;
	CreateSchedule: PXActionState;
	ViewBatch: PXActionState;
	NewVendor: PXActionState;
	EditVendor: PXActionState;
	ReclassifyBatch: PXActionState;
	VendorDocuments: PXActionState;
	Approve: PXActionState;
	Reject: PXActionState;
	ReleaseRetainage: PXActionState;
	ViewSourceDocument: PXActionState;
	AddPOReceipt2: PXActionState;
	AddReceiptLine2: PXActionState;
	AddPOOrder2: PXActionState;
	AddPOReceipt: PXActionState;
	AddReceiptLine: PXActionState;
	AddPOOrder: PXActionState;
	AddPOOrderLine: PXActionState;
	AddPOOrderLine2: PXActionState;
	AddLandedCost: PXActionState;
	AddLandedCost2: PXActionState;
	LinkLine: PXActionState;
	ViewPODocument: PXActionState;
	CurrencyView: PXActionState;
	LsLCSplits: PXActionState;
	RecalculateDiscountsAction: PXActionState;
	RecalcOk: PXActionState;
	OpenFSDocument: PXActionState;

	Document = createSingle(APInvoice);
	Taxes = createCollection(TaxTran);
	CurrentDocument = createSingle(APInvoice2);
	Adjustments = createCollection(APAdjust);
	BillFilter = createSingle(AddBillFilter);
	DocumentList = createCollection(APInvoice3); // for qp-panel with specified columns

	currencyinfo = createSingle(CurrencyInfo);
}

export class APInvoice extends PXView {

	DocType: PXFieldState;
	RefNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ rows: 2 })
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;

	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class APInvoice2 extends PXView {

	@controlConfig({ allowEdit: true })
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	APAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	APSubID: PXFieldState;
	SeparateCheck: PXFieldState;
	PaySel: PXFieldState<PXFieldOptions.CommitChanges>;
	PayDate: PXFieldState;
	PayLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class TaxTran extends PXView {

	OrigTranType: PXFieldState;
	OrigRefNbr: PXFieldState;

	@columnConfig({hideViewLink: true})
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxAmt: PXFieldState;

	@columnConfig({hideViewLink: true})
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({hideViewLink: true})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({hideViewLink: true})
	SubID: PXFieldState;

	// Actions:
	AddInvoices: PXActionState;

}

@gridConfig({ preset: GridPreset.Details })
export class APAdjust extends PXView {

	AdjgDocType: PXFieldState;

	@linkCommand("ViewPayment")
	AdjgRefNbr: PXFieldState;

	CuryAdjdAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	APPayment__DocDate: PXFieldState;
	CuryDocBal: PXFieldState;
	APPayment__DocDesc: PXFieldState;

	@columnConfig({hideViewLink: true})
	APPayment__CuryID: PXFieldState;

	@columnConfig({hideViewLink: true})
	APPayment__FinPeriodID: PXFieldState;

	APPayment__ExtRefNbr: PXFieldState;
	AdjdDocType: PXFieldState;
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	APPayment__Status: PXFieldState;

	// Actions:
	AutoApply: PXActionState;

}

export class AddBillFilter extends PXView {

	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.ReadOnly, fastFilterByAllFields: false })
export class APInvoice3 extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	DocType: PXFieldState;

	@columnConfig({ allowFastFilter: true, hideViewLink: true })
	RefNbr: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	InvoiceNbr: PXFieldState;

	DocDate: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	VendorID: PXFieldState;

	VendorID_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;
	DueDate: PXFieldState;
	DocDesc: PXFieldState;

}

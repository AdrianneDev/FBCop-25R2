import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, fieldConfig, linkCommand, controlConfig, columnConfig,
	PXActionState, GridPreset, GridNoteFilesShowMode, headerDescription, HeaderDescription,
} from "client-controls";

export class CABatch extends PXView {
	BatchNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState;
	@headerDescription(HeaderDescription.ShowKeyAndDescription)
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReferenceID: PXFieldState<PXFieldOptions.Disabled>;
	ExportTime: PXFieldState;

	@controlConfig({ rows: 2 })
	TranDesc: PXFieldState<PXFieldOptions.Multiline>;

	CuryDetailTotal: PXFieldState<PXFieldOptions.Disabled>;
	BatchSeqNbr: PXFieldState;
	DateSeqNbr: PXFieldState<PXFieldOptions.Disabled>;
	CountOfPayments: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Details, allowInsert: false, repaintColumns: true})
export class CABatchDetail extends PXView {

	AddPayments: PXActionState;

	OrigDocType: PXFieldState;

	@linkCommand("ViewAPDocument")
	APPayment__RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APPayment__VendorID: PXFieldState;

	APPayment__VendorID_Vendor_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APPayment__VendorLocationID: PXFieldState;

	APPayment__DocDate: PXFieldState;
	APPayment__Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APPayment__CuryID: PXFieldState;

	APPayment__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APPayment__PaymentMethodID: PXFieldState;

	APPayment__ExtRefNbr: PXFieldState;
	APPayment__CuryOrigDocAmt: PXFieldState;
	APRegisterAlias__DocDate: PXFieldState;
	AddendaPaymentRelatedInfo: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, adjustPageSize: true, showNoteFiles: GridNoteFilesShowMode.Suppress })
export class APPayment extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	DocType: PXFieldState;
	RefNbr: PXFieldState;
	VendorID: PXFieldState;
	VendorID_BAccountR_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	ExtRefNbr: PXFieldState;
	DocDate: PXFieldState;
	DepositAfter: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;

	CashAccountID_CashAccount_Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class AddendaInfo_APPayment extends PXView {
	RefNbr: PXFieldState;
	DocDesc: PXFieldState;
	DocDate: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	ExtRefNbr: PXFieldState;
	APInvoice__RefNbr: PXFieldState;
	APInvoice__InvoiceNbr: PXFieldState;
	APInvoice__DocDesc: PXFieldState;
	APInvoice__DocDate: PXFieldState;
	APAdjust__CuryAdjgAmt: PXFieldState;
	Vendor__AcctName: PXFieldState;
}

export class AddPaymentsFilter extends PXView {
	NextPaymentRefNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class VoidFilter extends PXView {

	@fieldConfig({ controlType: "qp-radio" })
	VoidDateOption: PXFieldState<PXFieldOptions.CommitChanges>;

	VoidDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

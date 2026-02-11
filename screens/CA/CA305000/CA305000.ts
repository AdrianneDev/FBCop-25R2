import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, columnConfig, linkCommand,
	PXFieldOptions, CurrencyInfo, GridColumnType, GridPreset,
	headerDescription,
	HeaderDescription
} from "client-controls";


@graphInfo({
	graphType: "PX.Objects.CA.CADepositEntry",
	primaryView: "Document",
	udfTypeField: "TranType",
	showUDFIndicator: true,
	showActivitiesIndicator: true,
	bpEventsIndicator: true
})
export class CA305000 extends PXScreen {
	ViewDocument: PXActionState;

	@viewInfo({containerName: "Payment Selection"})
	filter = createSingle(PaymentFilter);

	@viewInfo({containerName: "Add Payment to Deposit"})
	AvailablePayments = createCollection(PaymentInfo);

	@viewInfo({containerName: "Deposit Summary"})
	Document = createSingle(CADeposit);

	@viewInfo({containerName: "Payments"})
	DepositPayments = createCollection(CADepositDetail);

	@viewInfo({containerName: "Charges"})
	Charges = createCollection(CADepositCharge);

	@viewInfo({containerName: "Financial"})
    DocumentCurrent = createSingle(CADeposit2);

	CurrencyInfo = createSingle(CurrencyInfo);
}

export class PaymentFilter extends PXView  {
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SelectionTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfDocuments: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details })
export class PaymentInfo extends PXView  {
	@columnConfig({ allowNull: false, allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	Module: PXFieldState;
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	BAccountCD: PXFieldState;
	BAccountName: PXFieldState;
	@columnConfig({ hideViewLink: true })
	LocationCD: PXFieldState;
	ExtRefNbr: PXFieldState;
	@columnConfig({ allowUpdate: false })
	DocDate: PXFieldState;
	@columnConfig({ allowUpdate: false })
	DepositAfter: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	@columnConfig({ allowNull: false })
	CuryOrigDocAmt: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CashAccountID_CashAccount_Descr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PMInstanceID: PXFieldState;
	CuryChargeTotal: PXFieldState;
	CuryGrossPaymentAmount: PXFieldState;
}

export class CADeposit extends PXView  {

	@headerDescription(HeaderDescription.ShowDescription)
	TranType: PXFieldState;

	@headerDescription
	RefNbr: PXFieldState;

	@headerDescription(HeaderDescription.ShowKeyAndDescription)
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	TranDesc: PXFieldState<PXFieldOptions.Multiline>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState;
	ExtraCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtraCashTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDetailTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryChargeTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTranAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryControlAmt: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class CADepositDetail extends PXView {
	AddPayment: PXActionState;

	OrigModule: PXFieldState;
	PaymentInfo__DocType: PXFieldState;

	@linkCommand("ViewDocument")
	OrigRefNbr: PXFieldState;

	@linkCommand("ViewBAccount")
	BAccount__AcctCD: PXFieldState;

	BAccount__AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Location__LocationCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentInfo__CuryID: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryTranAmt: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryOrigAmt: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	PaymentInfo__PaymentMethodID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	PaymentInfo__Status: PXFieldState;

	PaymentInfo__ExtRefNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	PaymentInfo__DocDate: PXFieldState;

	@columnConfig({ allowUpdate: false })
	PaymentInfo__DepositAfter: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ChargeEntryTypeID: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class CADepositCharge extends PXView {
	@columnConfig({ hideViewLink: true })
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	ChargeRate: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryChargeableAmt: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryChargeAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
}

export class CADeposit2 extends PXView  {
	TranID_CATran_batchNbr: PXFieldState<PXFieldOptions.Disabled>;
	WorkgroupID: PXFieldState;
	OwnerID: PXFieldState;
	ClearDate: PXFieldState;
	Cleared: PXFieldState<PXFieldOptions.NoLabel>;
	ChargesSeparate: PXFieldState<PXFieldOptions.CommitChanges>;
}

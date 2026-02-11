import { createCollection, createSingle, PXScreen, graphInfo, controlConfig, PXActionState, viewInfo,
	PXPageLoadBehavior, PXView, PXFieldState, gridConfig, GridPreset, columnConfig, CurrencyInfo, PXFieldOptions, linkCommand,
} from "client-controls";

@graphInfo({graphType: "PX.Objects.CA.CATranEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues, showUDFIndicator: true })
export class CA303000 extends PXScreen {

	@viewInfo({containerName: "Quick Transaction"})
	AddFilter = createSingle(AddTrxFilter);
	@viewInfo({containerName: "Selection"})
	Filter = createSingle(CAEnqFilter);
	@viewInfo({containerName: "Cash Transactions"})
	CATranListRecords = createCollection(CATran);
	@viewInfo({syncAlways: true})
	_AddTrxFilter_CurrencyInfo_ = createSingle(CurrencyInfo);

	ViewBatch: PXActionState;
	ViewBatchPayment: PXActionState;
	ViewRecon: PXActionState;
	ViewBankDeposit: PXActionState;
}

// Views

export class AddTrxFilter extends PXView  {
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ReferenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	PMInstanceID: PXFieldState;
	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ rows: 2 })
	Descr: PXFieldState<PXFieldOptions.Multiline>;

	DrCr: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	OrigModule: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	Cleared: PXFieldState;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	// Actions :
	releaseTransaction: PXActionState;
}

export class CAEnqFilter extends PXView  {
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowSummary: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeUnreleased: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
	BegBal: PXFieldState<PXFieldOptions.Disabled>;
	DebitTotal: PXFieldState<PXFieldOptions.Disabled>;
	CreditTotal: PXFieldState<PXFieldOptions.Disabled>;
	EndBal: PXFieldState<PXFieldOptions.Disabled>;
	BegClearedBal: PXFieldState<PXFieldOptions.Disabled>;
	DebitClearedTotal: PXFieldState<PXFieldOptions.Disabled>;
	CreditClearedTotal: PXFieldState<PXFieldOptions.Disabled>;
	EndClearedBal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Details })
export class CATran extends PXView  {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	TranDate: PXFieldState;
	FinPeriodID: PXFieldState;
	DayDesc: PXFieldState;
	OrigModule: PXFieldState;

	@linkCommand("ViewDoc")
	OrigRefNbr: PXFieldState;

	ExtRefNbr: PXFieldState;
	OrigTranTypeUI: PXFieldState;

	@linkCommand("ViewBatch")
	BatchNbr: PXFieldState;

	Status: PXFieldState;
	CuryDebitAmt: PXFieldState;
	CuryCreditAmt: PXFieldState;
	EndBal: PXFieldState;

	@linkCommand("ViewBatchPayment")
	BatchPaymentRefNbr: PXFieldState;

	Cleared: PXFieldState;
	ClearDate: PXFieldState;
	Reconciled: PXFieldState;

	@linkCommand("ViewBankDeposit")
	DepositNbr: PXFieldState;

	TranDesc: PXFieldState;

	@linkCommand("ViewBAccount")
	BAccountR__AcctCD: PXFieldState;

	BAccountR__AcctName: PXFieldState;

	@linkCommand("ViewRecon")
	ReconNbr: PXFieldState;

	// Actions:
	AddDet: PXActionState;
	ViewDoc: PXActionState;
	DoubleClick: PXActionState;
}

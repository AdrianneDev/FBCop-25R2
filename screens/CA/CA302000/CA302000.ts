import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, PXView, PXFieldState,
	gridConfig, PXFieldOptions, columnConfig, controlConfig, CurrencyInfo, GridPreset, GridNoteFilesShowMode, linkCommand, PXPageLoadBehavior,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CAReconEntry", primaryView: "CAReconRecords", showUDFIndicator: true, showActivitiesIndicator: true, pageLoadBehavior: PXPageLoadBehavior.InsertRecord, bpEventsIndicator: true })
export class CA302000 extends PXScreen {

	@viewInfo({containerName: "Quick Transaction"})
	AddFilter = createSingle(AddTrxFilter);
	@viewInfo({containerName: "Reconciliation Summary"})
	CAReconRecords = createSingle(CARecon);
	@viewInfo({containerName: "Reconciliation Details"})
	CAReconTranRecords = createCollection(CATran);
	@viewInfo({syncAlways: true})
	_AddTrxFilter_CurrencyInfo_ = createSingle(CurrencyInfo);

	releaseAdjustment: PXActionState;
}

// Views

export class AddTrxFilter extends PXView {
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ReferenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	PMInstanceID: PXFieldState;
	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;

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

export class CARecon extends PXView {
	CashAccountID: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({displayMode: "id"})
	ReconNbr: PXFieldState;

	ReconDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	CashAccountID_Description: PXFieldState;
	LastReconDate: PXFieldState<PXFieldOptions.Disabled>;
	LoadDocumentsTill: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryBegBalance: PXFieldState<PXFieldOptions.Disabled>;
	CuryReconciledDebits: PXFieldState<PXFieldOptions.Disabled>;
	CuryReconciledCredits: PXFieldState<PXFieldOptions.Disabled>;
	CuryReconciledBalance: PXFieldState<PXFieldOptions.Disabled>;
	CuryBalance: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiffBalance: PXFieldState<PXFieldOptions.Disabled>;
	CountDebit: PXFieldState<PXFieldOptions.Disabled>;
	CountCredit: PXFieldState<PXFieldOptions.Disabled>;
	SkipVoided: PXFieldState<PXFieldOptions.Disabled>;
	ShowBatchPayments: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class CATran extends PXView {

	Reconciled: PXFieldState<PXFieldOptions.CommitChanges>;
	Cleared: PXFieldState;
	ClearDate: PXFieldState;
	CuryEffDebitAmt: PXFieldState;
	CuryEffCreditAmt: PXFieldState;
	ExtRefNbr: PXFieldState;
	OrigModule: PXFieldState;
	OrigTranTypeUI: PXFieldState;

	@linkCommand("ViewDoc")
	OrigRefNbr: PXFieldState;

	@columnConfig({allowUpdate: false})
	Status: PXFieldState;

	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BAccountR__acctCD: PXFieldState;

	BAccountR__AcctName: PXFieldState;
	TranDesc: PXFieldState;

	// Actions:
	ToggleReconciled: PXActionState;
	ToggleCleared: PXActionState;
	ReconcileProcessed: PXActionState;
	CreateAdjustment: PXActionState;
	ViewDoc: PXActionState;
}

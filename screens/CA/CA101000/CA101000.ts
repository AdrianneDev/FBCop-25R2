import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, gridConfig, GridPreset,
	controlConfig, columnConfig, GridColumnDisplayMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CASetupMaint", primaryView: "CASetupRecord" })
export class CA101000 extends PXScreen {
	CASetupRecord = createSingle(CASetup);
	Approval = createCollection(CASetupApproval);
}

export class CASetup extends PXView {

	@controlConfig({ allowEdit: true })
	BatchNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	RegisterNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	TransferNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CABatchNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CAStatementNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CorpCardNumberingID: PXFieldState;

	UnknownPaymentEntryTypeID: PXFieldState;
	TransitAcctId: PXFieldState<PXFieldOptions.CommitChanges>;
	TransitSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipVoided: PXFieldState;

	CalcBalDebitUnclearedUnreleased: PXFieldState;
	CalcBalDebitClearedUnreleased: PXFieldState;
	CalcBalDebitUnclearedReleased: PXFieldState;

	CalcBalCreditUnclearedUnreleased: PXFieldState;
	CalcBalCreditClearedUnreleased: PXFieldState;
	CalcBalCreditUnclearedReleased: PXFieldState;

	AutoPostOption: PXFieldState;
	ReleaseAP: PXFieldState;
	ReleaseAR: PXFieldState;

	HoldEntry: PXFieldState;
	RequireControlTotal: PXFieldState;
	RequireControlTaxTotal: PXFieldState;
	RequireExtRefNbr: PXFieldState;
	ValidateDataConsistencyOnRelease: PXFieldState;
	DateRangeDefault: PXFieldState;

	DisbursementTranDaysBefore: PXFieldState;
	DisbursementTranDaysAfter: PXFieldState;
	AllowMatchingCreditMemo: PXFieldState;

	ReceiptTranDaysBefore: PXFieldState;
	ReceiptTranDaysAfter: PXFieldState;
	AllowMatchingDebitAdjustment: PXFieldState;

	InvoiceFilterByCashAccount: PXFieldState;
	InvoiceFilterByDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DaysBeforeInvoiceDiscountDate: PXFieldState;
	DaysBeforeInvoiceDueDate: PXFieldState;
	DaysAfterInvoiceDueDate: PXFieldState;

	AllowMatchingToUnreleasedBatch: PXFieldState;
	SkipReconciled: PXFieldState;

	MatchThreshold: PXFieldState;
	RelativeMatchThreshold: PXFieldState;

	IgnoreCuryCheckOnImport: PXFieldState;
	AllowEmptyFITID: PXFieldState;
	ImportToSingleAccount: PXFieldState;
	StatementImportTypeName: PXFieldState;

	RefNbrCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	EmptyRefNbrMatching: PXFieldState<PXFieldOptions.CommitChanges>;
	DateCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	PayeeCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	AmountWeight: PXFieldState;
	CuryDiffThreshold: PXFieldState;
	DateMeanOffset: PXFieldState;
	DateSigma: PXFieldState;

	InvoiceRefNbrCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceDateCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoicePayeeCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	AveragePaymentDelay: PXFieldState;
	InvoiceDateSigma: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class CASetupApproval extends PXView {

	IsActive: PXFieldState;
	GraphType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AssignmentNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;

}

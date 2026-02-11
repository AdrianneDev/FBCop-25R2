import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, controlConfig, columnConfig,
	linkCommand, PXActionState, gridConfig, GridAutoGrowMode, GridPreset, GridColumnDisplayMode, GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AR.ARSetupMaint", primaryView: "ARSetupRecord" })
export class AR101000 extends PXScreen {
	ARSetupRecord = createSingle(ARSetup);
	SetupApproval = createCollection(ARSetupApproval);
	DunningSetup = createCollection(ARDunningSetup);

	ViewAssignmentMap: PXActionState;

}

export class ARSetup extends PXView {

	@controlConfig({ allowEdit: true })
	BatchNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	InvoiceNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PaymentNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	DebitAdjNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CreditAdjNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	WriteOffNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PrepaymentInvoiceNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	FinChargeNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PriceWSNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	DunningFeeNumberingID: PXFieldState;

	AutoPost: PXFieldState;
	SummaryPost: PXFieldState;
	MigrationMode: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	DfltCustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	SalesSubMask: PXFieldState;
	IntercompanySalesAccountDefault: PXFieldState;
	InvoiceRounding: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoicePrecision: PXFieldState;
	HoldEntry: PXFieldState;
	RequireControlTotal: PXFieldState;
	RequireExtRef: PXFieldState;
	CreditCheckError: PXFieldState;
	PrintBeforeRelease: PXFieldState;
	EmailBeforeRelease: PXFieldState;
	TermsInCreditMemos: PXFieldState;
	IntegratedCCProcessing: PXFieldState;
	AgeCredits: PXFieldState;
	DefFinChargeFromCycle: PXFieldState;
	FinChargeOnCharge: PXFieldState;
	FinChargeFirst: PXFieldState;
	SPCommnCalcType: PXFieldState;
	SPCommnPeriodType: PXFieldState;
	PrepareStatements: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	StatementBranchID: PXFieldState;
	PrepareDunningLetters: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	DunningLetterBranchID: PXFieldState;

	@controlConfig({ allowEdit: true })
	BalanceWriteOff: PXFieldState;

	@controlConfig({ allowEdit: true })
	CreditWriteOff: PXFieldState;

	AutoReleasePPDCreditMemo: PXFieldState;
	PPDCreditMemoDescr: PXFieldState;
	RetainTaxes: PXFieldState;
	RetainageInvoicesAutoRelease: PXFieldState;

	@controlConfig({ allowEdit: true })
	DefaultRateTypeID: PXFieldState;

	AlwaysFromBaseCury: PXFieldState;
	LoadSalesPricesUsingAlternateID: PXFieldState;
	RetentionType: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfMonths: PXFieldState<PXFieldOptions.CommitChanges>;
	LineDiscountTarget: PXFieldState;
	ApplyQuantityDiscountBy: PXFieldState;

	DunningLetterProcessType: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoReleaseDunningLetter: PXFieldState;
	IncludeNonOverdueDunning: PXFieldState;
	AddOpenPaymentsAndCreditMemos: PXFieldState;
	AddUnpaidPPI: PXFieldState;

	@controlConfig({ allowEdit: true })
	DunningFeeInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	DunningFeeTermID: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoReleaseDunningFee: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class ARSetupApproval extends PXView {
	IsActive: PXFieldState;
	DocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewAssignmentMap")
	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AssignmentNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowImport: false,
	allowSort: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class ARDunningSetup extends PXView {
	DunningLetterLevel: PXFieldState;
	DueDays: PXFieldState<PXFieldOptions.CommitChanges>;
	DaysToSettle: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	DunningFee: PXFieldState<PXFieldOptions.CommitChanges>;
}

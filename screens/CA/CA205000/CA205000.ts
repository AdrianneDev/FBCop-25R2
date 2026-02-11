import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, viewInfo, headerDescription,
	gridConfig, columnConfig, TextAlign, GridColumnType, PXActionState, GridPreset, controlConfig,
} from "client-controls";

@graphInfo({graphType: "PX.Objects.CA.CCProcessingCenterMaint", primaryView: "ProcessingCenter", })
export class CA205000 extends PXScreen {

	@viewInfo({containerName: "Credit Card Processing Center"})
	ProcessingCenter = createSingle(CCProcessingCenter);

	@viewInfo({ containerName: "Preferences" })
	CurrentProcessingCenter = createSingle(CCProcessingCenter2);

	@viewInfo({ containerName: "Plug-In Parameters" })
	Details = createCollection(CCProcessingCenterDetail);

	@viewInfo({containerName: "Payment Methods"})
	PaymentMethods = createCollection(CCProcessingCenterPmntMethod);

	@viewInfo({containerName: "Fees"})
	FeeTypes = createCollection(CCProcessingCenterFeeType);

	@viewInfo({containerName: "Payment Links"})
	ProcCenterBranch = createCollection(CCProcessingCenterBranch);

	@viewInfo({containerName: "POS Terminals"})
	POSTerminals = createCollection(CCProcessingCenterTerminal);

	CashAccount = createSingle(CashAccount);
}

// Views

export class CCProcessingCenter extends PXView  {
	ProcessingCenterID: PXFieldState;

	@headerDescription
	Name: PXFieldState;

	@controlConfig({ allowEdit: true })
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingTypeName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CCProcessingCenter2 extends PXView  {
	AllowSaveProfile: PXFieldState;
	SyncronizeDeletion: PXFieldState;
	UseAcceptPaymentForm: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateAdditionalCustomerProfiles: PXFieldState<PXFieldOptions.CommitChanges>;
	CreditCardLimit: PXFieldState;
	AllowDirectInput: PXFieldState;

	AllowUnlinkedRefund: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowPayLink: PXFieldState<PXFieldOptions.CommitChanges>;
	AcceptPOSPayments: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowAuthorizedIncrement: PXFieldState;

	OpenTranTimeout: PXFieldState;
	SyncRetryAttemptsNo: PXFieldState;
	SyncRetryDelayMs: PXFieldState;

	ReauthRetryNbr: PXFieldState;
	ReauthRetryDelay: PXFieldState;

	ImportSettlementBatches: PXFieldState<PXFieldOptions.CommitChanges>;
	ImportStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	LastSettlementDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	DepositAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	AutoCreateBankDeposit: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowPartialPayment: PXFieldState<PXFieldOptions.CommitChanges>;
	AttachDetailsToPayLink: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	WebhookID: PXFieldState;

	DocTypeForSOPayLink: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class CCProcessingCenterDetail extends PXView  {
	DetailID: PXFieldState;
	Descr: PXFieldState;
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class CCProcessingCenterPmntMethod extends PXView  {
	PaymentMethodID: PXFieldState;
	IsActive: PXFieldState;
	IsDefault: PXFieldState;
	FundHoldPeriod: PXFieldState;
	ReauthDelay: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class CCProcessingCenterFeeType extends PXView  {
	FeeType: PXFieldState;
	EntryTypeID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class CCProcessingCenterBranch extends PXView  {

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DefaultForBranch: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CCPaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CCCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	EFTPaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	EFTCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CashAccount extends PXView  {
	CuryID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class CCProcessingCenterTerminal extends PXView {
	ImportTerminals: PXActionState;

	TerminalID: PXFieldState;
	TerminalName: PXFieldState;
	DisplayName: PXFieldState;
	IsActive: PXFieldState;
}

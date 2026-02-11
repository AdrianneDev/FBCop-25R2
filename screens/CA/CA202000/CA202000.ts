import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, PXFieldOptions,
	controlConfig, gridConfig, columnConfig, GridColumnShowHideMode, GridPreset, GridAutoGrowMode,
	handleEvent, CustomEventType, CallbackCompletedHandlerArgs,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CA.CashAccountMaint", primaryView: "CashAccount",
	showUDFIndicator: true, showActivitiesIndicator: true,
})
export class CA202000 extends PXScreen {

	@viewInfo({containerName: "Cash Account Summary"})
	CashAccount = createSingle(CashAccount);

	CurrentCashAccount = createSingle(CashAccount2);

	@viewInfo({containerName: "Payment Methods"})
	Details = createCollection(PaymentMethodAccount);

	@viewInfo({containerName: "Clearing Accounts"})
	Deposits = createCollection(CashAccountDeposit);

	@viewInfo({containerName: "Entry Types"})
	ETDetails = createCollection(CashAccountETDetail);

	@viewInfo({containerName: "Payment Method"})
	PaymentMethodForRemittance = createCollection(PaymentMethodAccount2);

	@viewInfo({containerName: "Remittance Details"})
	PaymentDetails = createCollection(CashAccountPaymentMethodDetail);

	IfShowClearingAccountsTab: boolean = false;

	@handleEvent(CustomEventType.CallbackCompleted)
	async onCallbackCompleted(args: CallbackCompletedHandlerArgs<any>) {
		// updating IfShowClearingAccountsTab only after server validated CashAccount.ClearingAccount
		this.IfShowClearingAccountsTab = !this.CashAccount.ClearingAccount.value;

	}
}

// Views

export class CashAccount extends PXView  {

	@controlConfig({ displayMode: "id" })
	CashAccountCD: PXFieldState;

	Active: PXFieldState;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	CuryRateTypeID: PXFieldState;

	ExtRefNbr: PXFieldState;
	Descr: PXFieldState;
	ClearingAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	Reconcile: PXFieldState<PXFieldOptions.CommitChanges>;
	RestrictVisibilityWithBranch: PXFieldState;
	MatchToBatch: PXFieldState;
	UseForCorpCard: PXFieldState;

	@controlConfig({ allowEdit: true })
	ReconNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	ReferenceID: PXFieldState;

	StatementImportTypeName: PXFieldState;
	AcctSettingsAllowed: PXFieldState<PXFieldOptions.Disabled>;
	PTInstancesAllowed: PXFieldState<PXFieldOptions.Disabled>;
}

export class CashAccount2 extends PXView  {
	SignatureDescr: PXFieldState;
	Signature: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class PaymentMethodAccount extends PXView  {
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	UseForAP: PXFieldState<PXFieldOptions.CommitChanges>;
	UseForPR: PXFieldState<PXFieldOptions.CommitChanges>;
	APIsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	APAutoNextNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	APLastRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	APBatchLastRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	APQuickBatchGeneration: PXFieldState<PXFieldOptions.CommitChanges>;
	UseForAR: PXFieldState<PXFieldOptions.CommitChanges>;
	ARIsDefault: PXFieldState;
	ARIsDefaultForRefund: PXFieldState;
	ARAutoNextNbr: PXFieldState;
	ARLastRefNbr: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class CashAccountDeposit extends PXView  {
	@columnConfig({hideViewLink: true})
	DepositAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	ChargeEntryTypeID: PXFieldState;
	ChargeRate: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class CashAccountETDetail extends PXView  {
	@columnConfig({allowShowHide: GridColumnShowHideMode.False})
	CashAccountID: PXFieldState<PXFieldOptions.Hidden>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	CAEntryType__DrCr: PXFieldState;
	CAEntryType__Module: PXFieldState;

	@columnConfig({hideViewLink: true})
	CAEntryType__BranchID: PXFieldState;

	@columnConfig({hideViewLink: true})
	CAEntryType__AccountID: PXFieldState;

	@columnConfig({hideViewLink: true})
	CAEntryType__SubID: PXFieldState;

	@columnConfig({hideViewLink: true})
	CAEntryType__CashAccountID: PXFieldState;

	@columnConfig({hideViewLink: true})
	CAEntryType__ReferenceID: PXFieldState;

	CAEntryType__Descr: PXFieldState;

	@columnConfig({hideViewLink: true})
	CAEntryType__UseToReclassifyPayments: PXFieldState;

	@columnConfig({hideViewLink: true})
	OffsetCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({hideViewLink: true})
	OffsetBranchID: PXFieldState;

	@columnConfig({hideViewLink: true})
	OffsetAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({hideViewLink: true})
	OffsetSubID: PXFieldState;

	@columnConfig({hideViewLink: true})
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showTopBar: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	autoRepaint: ["PaymentDetails"],
})
export class PaymentMethodAccount2 extends PXView  {
	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showTopBar: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class CashAccountPaymentMethodDetail extends PXView  {
	PaymentMethodID: PXFieldState;
	DetailID: PXFieldState;
	PaymentMethodDetail__descr: PXFieldState;

	@columnConfig({allowShowHide: GridColumnShowHideMode.False})
	DetailValue: PXFieldState;
}

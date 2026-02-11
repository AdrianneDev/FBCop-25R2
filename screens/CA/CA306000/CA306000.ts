import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, actionConfig,
	PXFieldOptions, columnConfig, controlConfig, GridColumnShowHideMode, PXActionState, GridPreset, GridNoteFilesShowMode,
	RowSelectedHandlerArgs, PXViewCollection, linkCommand, handleEvent,	CustomEventType, QpGridCustomElement,
	CurrentRowChangedHandlerArgs
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CABankTransactionsMaint", primaryView: "TranFilter", })
export class CA306000 extends PXScreen {

	RefreshAfterRuleCreate: PXActionState;
	ViewInvoice: PXActionState;
	ViewPayment: PXActionState;
	ViewBAccount: PXActionState;
	ViewBAccountInvoices: PXActionState;
	UnapplyRule: PXActionState;

	@actionConfig({ popupCommand: "RefreshAfterRuleCreate" })
	CreateRule: PXActionState;

	ResetMatchSettingsToDefault: PXActionState;
	ViewDocumentToApply: PXActionState;

	TranFilter = createSingle(Filter);
	Details = createCollection(CABankTran);

	@viewInfo({ containerName: "Match to Payments" })
	DetailsForPaymentMatching = createSingle(CABankTran2);

	@viewInfo({ containerName: "Match to Payments" })
	DetailMatchesCA = createCollection(CATran);

	@viewInfo({ containerName: "Create Document" })
	DetailsForInvoiceApplication = createSingle(CABankTran3);

	@viewInfo({ containerName: "Matching Invoices" })
	detailMatchingInvoices = createCollection(CABankTranInvoiceMatch);

	@viewInfo({ containerName: "Matching Expense Receipts" })
	ExpenseReceiptDetailMatches = createCollection(CABankTranExpenseDetailMatch);

	@viewInfo({ containerName: "Create Payment" })
	DetailsForPaymentCreation = createSingle(CABankTran4);

	@viewInfo({ containerName: "AP/AR Adjustments" })
	Adjustments = createCollection(CABankTranAdjustment);

	@viewInfo({ containerName: "CA Splits" })
	TranSplit = createCollection(CABankTranDetail);

	@viewInfo({ containerName: "Transaction Matching Settings" })
	cashAccount = createSingle(CashAccount);

	@viewInfo({ containerName: "Create Rule" })
	RuleCreation = createSingle(CreateRuleSettings);

	@viewInfo({ containerName: "Tax Details" })
	CurrentCABankTran = createSingle(CABankTran5);

	@viewInfo({ containerName: "Tax Details" })
	TaxTrans = createCollection(CABankTaxTran);

	@viewInfo({ containerName: "Load Options" })
	loadOpts = createSingle(LoadOptions);

	transSplitVM: QpGridCustomElement;

	private previousTranIndex: number;

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "TranSplit" })
	onCASplitSelected(args: CurrentRowChangedHandlerArgs<PXViewCollection<CABankTranDetail>>) {
		// AutoInsertField="CuryTranAmt" conversion from ASPX
		const modelRow = args.viewModel.activeRow;
		if (modelRow?.CuryTranAmt?.value === undefined) return;
		const autoInsert = !!(modelRow?.CuryTranAmt?.value);
		const gridRow = this.transSplitVM.getActiveRow();
		if (gridRow) gridRow.changed = autoInsert;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Details" })
	onBankTransactionSelected(args: RowSelectedHandlerArgs<PXViewCollection<CABankTran>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (this?.CreateRule) {
			this.CreateRule.enabled = !!args.viewModel.activeRow?.ApplyRuleEnabled?.value;
		}
		if (this?.UnapplyRule) {
			this.UnapplyRule.enabled = !!args.viewModel.activeRow?.RuleApplied?.value;
		}

		if (this.previousTranIndex === model?.records.indexOf(activeRow)) {
			return;
		}
		this.previousTranIndex = model?.records.indexOf(activeRow);

		const tabbar = <any>document.getElementById("tabs");

		if (this.TranFilter?.IsCorpCardCashAccount?.value) {
			if (activeRow?.Status?.value) {
				switch (activeRow.Status.value) {
					case "M": {
						tabbar.au.controller.viewModel.activeTabId = "tabMatchToPayments";
						break;
					}
					case "I": {
						tabbar.au.controller.viewModel.activeTabId = "tabMatchToInvoices";
						break;
					}
					case "R": {
						tabbar.au.controller.viewModel.activeTabId = "tabMatchToExpenseReceipts";
						break;
					}
					case "C": {
						tabbar.au.controller.viewModel.activeTabId = "tabCreatePayment";
						break;
					}
					default: {
						tabbar.au.controller.viewModel.activeTabId = "tabMatchToPayments";
						break;
					}
				}
			}
			else {
				// Wait fix of AC-317974. Set active tab depends on grids content
				//if (this.DetailMatchesCA.records.length) {
				tabbar.au.controller.viewModel.activeTabId = "tabMatchToPayments";
				//} else if (this.detailMatchingInvoices.records.length) {
				//	tabbar.au.controller.viewModel.activeTabId = "tabMatchToInvoices";
				//} else if (this.ExpenseReceiptDetailMatches.records.length) {
				//	tabbar.au.controller.viewModel.activeTabId = "tabMatchToExpenseReceipts";
				//} else {
				//	tabbar.au.controller.viewModel.activeTabId = "tabCreatePayment";
				//}
			}
		}
		else {
			if (activeRow?.Status?.value) {
				switch (activeRow.Status.value) {
					case "M": {
						tabbar.au.controller.viewModel.activeTabId = "tabMatchToPayments";
						break;
					}
					case "I": {
						tabbar.au.controller.viewModel.activeTabId = "tabMatchToInvoices";
						break;
					}
					case "C": {
						tabbar.au.controller.viewModel.activeTabId = "tabCreatePayment";
						break;
					}
					default: {
						tabbar.au.controller.viewModel.activeTabId = "tabMatchToPayments";
						break;
					}
				}
			}
			else {
				// Wait fix of AC-317974. Set active tab depends on grids content
				//if (this.DetailMatchesCA.records.length) {
				tabbar.au.controller.viewModel.activeTabId = "tabMatchToPayments";
				//} else if (this.detailMatchingInvoices.records.length) {
				//	tabbar.au.controller.viewModel.activeTabId = "tabMatchToInvoices";
				//} else {
				//	tabbar.au.controller.viewModel.activeTabId = "tabCreatePayment";
				//}
			}
		}
	}
}

export class Filter extends PXView {

	@controlConfig({ allowEdit: true })
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	IsCorpCardCashAccount: PXFieldState;

}

@gridConfig({
	preset: GridPreset.Details,
	statusField: "MatchStatsInfo",
	keepPosition: true,
	autoRepaint: ["DetailsForPaymentMatching", "DetailMatchesCA", "detailMatchingInvoices",
		"DetailsForPaymentCreation", "DetailsForInvoiceApplication", "ExpenseReceiptDetailMatches", "Adjustments", "TranSplit", "Details"],
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class CABankTran extends PXView {

	ClearMatch: PXActionState;
	ClearAllMatches: PXActionState;
	Hide: PXActionState;
	Split: PXActionState;

	Status: PXFieldState;

	@columnConfig({ allowSort: false, allowResize: false, allowFilter: false, allowShowHide: GridColumnShowHideMode.Server })
	SplittedIcon: PXFieldState;

	DocumentMatched: PXFieldState;
	RuleApplied: PXFieldState;
	ApplyRuleEnabled: PXFieldState;
	ExtTranID: PXFieldState;
	ExtRefNbr: PXFieldState;
	TranDate: PXFieldState;

	CuryDebitAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryCreditAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigDebitAmt: PXFieldState;
	CuryOrigCreditAmt: PXFieldState;
	CardNumber: PXFieldState;
	TranDesc: PXFieldState;
	TranCode: PXFieldState;
	TranEntryDate: PXFieldState;
	PayeeName: PXFieldState;
	EntryTypeID1: PXFieldState;
	InvoiceInfo1: PXFieldState;
	PaymentMethodID1: PXFieldState;
	PayeeBAccountID1: PXFieldState;
	AcctName: PXFieldState;
	OrigModule1: PXFieldState;
	PayeeLocationID1: PXFieldState;
	UserDesc: PXFieldState;
	AllowedOperations: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	IsAutoMatchOnly: PXFieldState;

	@columnConfig({ textField: "BankFeedAccountMapID_CABankFeedAccountMapping_AccountNameMask" })
	BankFeedAccountMapID: PXFieldState;

	MatchStatsInfo: PXFieldState;
}

export class CABankTran2 extends PXView {

	MultipleMatchingToPayments: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchReceiptsAndDisbursements: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTotalAmtDisplay: PXFieldState<PXFieldOptions.Disabled>;
	CuryApplAmtMatchToPayment: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnappliedBalMatchToPayment: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true, showNoteFiles: GridNoteFilesShowMode.Suppress })
export class CATran extends PXView {

	@columnConfig({ allowSort: false })
	IsMatched: PXFieldState<PXFieldOptions.CommitChanges>;

	MatchRelevancePercent: PXFieldState;

	@linkCommand("ViewPayment")
	OrigRefNbr: PXFieldState;
	TranDate: PXFieldState;
	ExtRefNbr: PXFieldState;
	OrigModule: PXFieldState;
	OrigTranTypeUI: PXFieldState;
	Status: PXFieldState;
	TranDesc: PXFieldState;
	FinPeriodID: PXFieldState;
	CuryTranAmtCalc: PXFieldState;
	@linkCommand("ViewBAccount")
	BAccount__AcctCD: PXFieldState;
	BAccount__AcctName: PXFieldState;
}

export class CABankTran3 extends PXView {

	MultipleMatching: PXFieldState<PXFieldOptions.CommitChanges>;
	PayeeBAccountIDCopy: PXFieldState<PXFieldOptions.CommitChanges>;
	PayeeLocationIDCopy: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodIDCopy: PXFieldState<PXFieldOptions.CommitChanges>;
	PMInstanceIDCopy: PXFieldState<PXFieldOptions.CommitChanges>;
	ChargeTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTotalAmtCopy: PXFieldState<PXFieldOptions.Disabled>;
	CuryApplAmtMatchToInvoice: PXFieldState<PXFieldOptions.Disabled>;
	CuryChargeAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryChargeTaxAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnappliedBalMatchToInvoice: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Details, allowDelete: false, allowInsert: false, syncPosition: false })
export class CABankTranInvoiceMatch extends PXView {

	@columnConfig({ allowSort: false })
	IsMatched: PXFieldState<PXFieldOptions.CommitChanges>;

	MatchRelevancePercent: PXFieldState;

	BranchID: PXFieldState;
	OrigModule: PXFieldState;
	@columnConfig({ fullState: true })
	OrigTranType: PXFieldState;

	@linkCommand("ViewInvoice")
	OrigRefNbr: PXFieldState;

	ExtRefNbr: PXFieldState;
	TranDate: PXFieldState;
	CuryTranAmt: PXFieldState;
	CuryDiscAmt: PXFieldState;
	DiscDate: PXFieldState;
	@linkCommand("ViewBAccountInvoices")
	ReferenceCD: PXFieldState;
	ReferenceName: PXFieldState;
	TranDesc: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, allowDelete: false, allowInsert: false })
export class CABankTranExpenseDetailMatch extends PXView {

	@columnConfig({ allowSort: false })
	IsMatched: PXFieldState<PXFieldOptions.CommitChanges>;

	MatchRelevancePercent: PXFieldState;
	RefNbr: PXFieldState;
	TranDesc: PXFieldState;
	DocDate: PXFieldState;
	CuryDocAmt: PXFieldState;
	ClaimCuryID: PXFieldState;
	CuryDocAmtDiff: PXFieldState;
	CardNumber: PXFieldState;
	ReferenceID: PXFieldState;
	ReferenceName: PXFieldState;
	ExtRefNbr: PXFieldState;
	PaidWith: PXFieldState;

}

export class CABankTran4 extends PXView {

	CreateDocument: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true, displayMode: "text" })
	RuleID: PXFieldState<PXFieldOptions.Disabled>;

	OrigModule: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchingPaymentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchingFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	PayeeBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	PayeeLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;

	InvoiceInfo: PXFieldState;
	UserDesc: PXFieldState;
	CuryDetailsWithTaxesTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTotalAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryApplAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnappliedBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryWOAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryApplAmtCA: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ linkCommand: "viewTaxDetails" })
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnappliedBalCA: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({
	initNewRow: true,
	preset: GridPreset.Details
})
export class CABankTranAdjustment extends PXView {

	LoadInvoices: PXActionState;

	@columnConfig({ hideViewLink: true })
	AdjdBranchID: PXFieldState;
	AdjdDocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewDocumentToApply")
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ARInvoice__CustomerID: PXFieldState;
	CuryAdjgAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APExtRefNbr: PXFieldState;

	CuryAdjgDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscBal: PXFieldState;
	CuryAdjgWhTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryWhTaxBal: PXFieldState;
	CuryAdjgWOAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WriteOffReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	AdjdDocDate: PXFieldState;
	AdjdFinPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AdjdCuryID: PXFieldState;

	AdjdCuryRate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigDocAmt: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true, initNewRowCommand: ["DetailsForPaymentCreation"] })
export class CABankTranDetail extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	AccountID_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;

	NonBillable: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CashAccount extends PXView {

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
	SkipVoided: PXFieldState;
	MatchThreshold: PXFieldState;
	RelativeMatchThreshold: PXFieldState;
	RefNbrCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	EmptyRefNbrMatching: PXFieldState<PXFieldOptions.CommitChanges>;
	DateCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	PayeeCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNbrComparePercent: PXFieldState<PXFieldOptions.Disabled>;
	DateComparePercent: PXFieldState<PXFieldOptions.Disabled>;
	PayeeComparePercent: PXFieldState<PXFieldOptions.Disabled>;
	AmountWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiffThreshold: PXFieldState;
	DateMeanOffset: PXFieldState;
	DateSigma: PXFieldState;
	RatioInRelevanceCalculationLabel: PXFieldState<PXFieldOptions.Disabled>;
	InvoiceRefNbrCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceDateCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoicePayeeCompareWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceRefNbrComparePercent: PXFieldState<PXFieldOptions.Disabled>;
	InvoiceDateComparePercent: PXFieldState<PXFieldOptions.Disabled>;
	InvoicePayeeComparePercent: PXFieldState<PXFieldOptions.Disabled>;
	AveragePaymentDelay: PXFieldState;
	InvoiceDateSigma: PXFieldState;

}

export class CreateRuleSettings extends PXView {

	RuleName: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class CABankTran5 extends PXView {

	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.ShortList })
export class CABankTaxTran extends PXView {

	TaxID: PXFieldState;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class LoadOptions extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState;
	TillDate: PXFieldState;
	MaxDocs: PXFieldState;
	StartRefNbr: PXFieldState;
	EndRefNbr: PXFieldState;
	OrderBy: PXFieldState;

}

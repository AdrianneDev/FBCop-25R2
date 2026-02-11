import { autoinject } from "aurelia-framework";
import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState,
	gridConfig, columnConfig, linkCommand, PXActionState, PXFieldOptions,
	CurrencyInfo, viewInfo, GridPreset, controlConfig, fieldConfig,
	PaymentRedirectExceptionHandler, actionConfig, ISelectorControlConfig,
	RedirectHandlersProvider
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARPaymentEntry",
	primaryView: "Document",
	showActivitiesIndicator: true,
	bpEventsIndicator: true,
	udfTypeField: "DocType",
	showUDFIndicator: true
})
@autoinject
export class AR302000 extends PXScreen {
	ViewDocumentToApply: PXActionState;
	ViewCurrentBatch: PXActionState;
	ViewApplicationDocument: PXActionState;
	NewCustomer: PXActionState;
	EditCustomer: PXActionState;
	ViewPPDVATAdj: PXActionState;

	@viewInfo({containerName: "Payment Summary"})
	Document = createSingle(ARPayment);

	@viewInfo({containerName: "Current Document"})
	CurrentDocument = createSingle(ARPayment2);

	ExternalTran = createSingle(ExternalTransaction);

	@viewInfo({containerName: "Payment Summary -> Rate Selection"})
	CurrencyInfo = createSingle(CurrencyInfo);

	@viewInfo({containerName: "Documents to Apply"})
	Adjustments = createCollection(ARAdjust);

	@viewInfo({containerName: "Application History"})
	ARPost = createCollection(ARTranPostBal);

	@viewInfo({containerName: "Card Processing"})
	ccProcTran = createCollection(CCProcTran);

	@viewInfo({containerName: "Charges"})
	PaymentCharges = createCollection(ARPaymentChargeTran);

	@viewInfo({containerName: "Load Options"})
	loadOpts = createSingle(LoadOptions);

	constructor(redirectHandlersProvider: RedirectHandlersProvider,
		paymentRedirect: PaymentRedirectExceptionHandler) {
		super();

		redirectHandlersProvider.register("openPayment", paymentRedirect);
	}
}

export class ARPayment extends PXView {
	@actionConfig({ popupCommand: "SyncPaymentTransaction" })
	AuthorizeCCPayment: PXActionState;
	@actionConfig({ popupCommand: "SyncPaymentTransaction" })
	CaptureCCPayment: PXActionState;
	AdjustDocAmt: PXActionState;

	DocType: PXFieldState;

	@controlConfig<ISelectorControlConfig>({
		fastFilterFields: ["RefNbr", "ARPayment__ExtRefNbr", "CustomerID", "CustomerID_Customer_acctName"]
	})
	RefNbr: PXFieldState;

	Status: PXFieldState;
	AdjDate: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CCTransactionRefund: PXFieldState<PXFieldOptions.CommitChanges>;
	RefTranExtNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;

	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	TerminalID: PXFieldState<PXFieldOptions.CommitChanges>;
	NewCard: PXFieldState<PXFieldOptions.CommitChanges>;
	NewAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	SaveCard: PXFieldState<PXFieldOptions.CommitChanges>;
	SaveAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	CCPaymentStateDescr: PXFieldState;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	DepositAfter: PXFieldState<PXFieldOptions.CommitChanges>;
	ChkServiceManagement: PXFieldState;

	@controlConfig({ rows: 2 })
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;

	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryApplAmt: PXFieldState<PXFieldOptions.Disabled>;
	CurySOApplAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnappliedBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryInitDocBal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryWOAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryChargeAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryConsolidateChargeTotal: PXFieldState<PXFieldOptions.Disabled>;
}

export class ARPayment2 extends PXView {
	ViewOriginalDocument: PXActionState;

	@controlConfig({ allowEdit: true })
	BatchNbr: PXFieldState;

	DisplayCuryInitDocBal: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARSubID: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ linkCommand: "ViewOriginalDocument", allowEdit: true })
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	Cleared: PXFieldState<PXFieldOptions.CommitChanges>;
	ClearDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DepositAsBatch: PXFieldState<PXFieldOptions.CommitChanges>;
	Deposited: PXFieldState;
	DepositDate: PXFieldState;

	@controlConfig({ allowEdit: true })
	DepositNbr: PXFieldState;

	Printed: PXFieldState<PXFieldOptions.CommitChanges>;
	DontPrint: PXFieldState<PXFieldOptions.CommitChanges>;
	Emailed: PXFieldState<PXFieldOptions.CommitChanges>;
	DontEmail: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ARAdjust extends PXView {
	LoadInvoices: PXActionState;
	AutoApply: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AdjdBranchID: PXFieldState;

	AdjdDocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewDocumentToApply")
	@columnConfig({
		editorConfig: {
			parameters: (screen: AR302000) => ({
				"ARPayment.customerID": screen.Document.CustomerID.value.id,
				"ARAdjust.adjdDocType": screen.Adjustments.activeRow.AdjdDocType.value
			})
		}
	})
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		hideViewLink: true,
		editorConfig: {
			parameters: (screen: AR302000) => ({
				"ARAdjust.adjdDocType": screen.Adjustments.activeRow.AdjdDocType.value,
				"ARAdjust.adjdRefNbr": screen.Adjustments.activeRow.AdjdRefNbr.value.id
			})
		}
	})
	AdjdLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	ARTran__InventoryID: PXFieldState;
	ARTran__ProjectID: PXFieldState;

	@columnConfig({
		editorConfig: {
			parameters: (screen: AR302000) => ({
				"ARTran.projectID": screen.Adjustments.activeRow.ARTran__ProjectID.value.id,
			})
		}
	})
	ARTran__TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTran__CostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTran__AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AdjdCustomerID: PXFieldState;

	CuryAdjgAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgPPDAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgWOAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WriteOffReasonCode: PXFieldState;

	AdjdDocDate: PXFieldState;
	ARRegisterAlias__DueDate: PXFieldState;
	ARInvoice__DiscDate: PXFieldState;
	AdjdCuryRate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;
	ARRegisterAlias__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AdjdCuryID: PXFieldState;

	AdjdFinPeriodID: PXFieldState;
	ARInvoice__InvoiceNbr: PXFieldState;
	HasExpiredComplianceDocuments: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class ARTranPostBal extends PXView {
	ReverseApplication: PXActionState;

	@columnConfig({ hideViewLink: true })
	ARRegisterAlias__BranchID: PXFieldState;

	@linkCommand("ViewCurrentBatch")
	BatchNbr: PXFieldState;

	SourceDocType: PXFieldState;

	@linkCommand("ViewApplicationDocument")
	SourceRefNbr: PXFieldState;

	LineNbr: PXFieldState;
	ARTran__InventoryID: PXFieldState;
	ARTran__ProjectID: PXFieldState;

	@columnConfig({
		editorConfig: {
			parameters: (screen: AR302000) => ({
				"ARTran.projectID": screen.ARPost.activeRow.ARTran__ProjectID.value.id,
			})
		}
	})
	ARTran__TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTran__CostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTran__AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARRegisterAlias__CustomerID: PXFieldState;

	CuryAmt: PXFieldState;
	CuryPPDAmt: PXFieldState;
	CuryWOAmt: PXFieldState;
	ApplicationDate: PXFieldState;
	FinPeriodID: PXFieldState;
	ARRegisterAlias__DocDate: PXFieldState;
	ARRegisterAlias__DueDate: PXFieldState;
	ARInvoice__DiscDate: PXFieldState;
	CuryBalanceAmt: PXFieldState;
	CuryDiscBalanceAmt: PXFieldState;
	ARRegisterAlias__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARRegisterAlias__CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARRegisterAlias__FinPeriodID: PXFieldState;

	ARInvoice__InvoiceNbr: PXFieldState;
	ARAdjust2__PendingPPD: PXFieldState;

	@linkCommand("ViewPPDVATAdj")
	@columnConfig({ allowFilter: false, allowSort: false })
	ARAdjust2__PPDVATAdjDescription: PXFieldState;

	ARAdjust2__TaxInvoiceNbr: PXFieldState;
	ARAdjust2__HasExpiredComplianceDocuments: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class CCProcTran extends PXView {
	TranNbr: PXFieldState;
	ProcessingCenterID: PXFieldState;
	TranType: PXFieldState;
	TranStatus: PXFieldState;
	Amount: PXFieldState;
	FundHoldExpDate: PXFieldState;
	RefTranNbr: PXFieldState;
	MaskedCardNumber: PXFieldState;
	PCTranNumber: PXFieldState;
	AuthNumber: PXFieldState;
	PCResponseReasonText: PXFieldState;
	StartTime: PXFieldState;
	ProcStatus: PXFieldState;
	CVVVerificationStatus: PXFieldState;
	ErrorSource: PXFieldState;
	ErrorText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class ARPaymentChargeTran extends PXView {
	@columnConfig({ hideViewLink: true })
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class LoadOptions extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState;
	TillDate: PXFieldState;
	MaxDocs: PXFieldState;
	StartRefNbr: PXFieldState;
	EndRefNbr: PXFieldState;
	StartOrderNbr: PXFieldState;
	EndOrderNbr: PXFieldState;
	Apply: PXFieldState;
	LoadChildDocuments: PXFieldState;

	@fieldConfig({
		controlType: "qp-radio",
		controlConfig: {
			class: "vertical"
		}
	})
	OrderBy: PXFieldState;

	@fieldConfig({
		controlType: "qp-radio",
		controlConfig: {
			class: "vertical"
		}
	})
	SOOrderBy: PXFieldState;
}

export class ExternalTransaction extends PXView {
	CommerceTranNumber: PXFieldState<PXFieldOptions.Disabled>;
}

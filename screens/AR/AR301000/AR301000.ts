import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, gridConfig, columnConfig, linkCommand, PXActionState,
	PXFieldOptions, CurrencyInfo, GridColumnShowHideMode, viewInfo, GridPreset, GridAutoGrowMode, controlConfig,
	ISelectorControlConfig
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.AR.ARInvoiceEntry",
	primaryView: "Document",
	showActivitiesIndicator: true,
	bpEventsIndicator: true,
	udfTypeField: "DocType",
	showUDFIndicator: true
})
export class AR301000 extends PXScreen {

	ViewOriginalDocument: PXActionState;
	ViewCorrectionDocument: PXActionState;
	ViewBatch: PXActionState;
	ViewOrigRetainageDocument: PXActionState;
	ViewItem: PXActionState;
	ARTran$RelatedDocument$Link: PXActionState;
	ViewRetainageDocument: PXActionState;
	ViewPayment: PXActionState;
	ViewPPDVATAdj: PXActionState;
	ViewInvoice: PXActionState;

	RecalcOk: PXActionState;
	ViewSchedule: PXActionState;
	CreateSchedule: PXActionState;

	@viewInfo({ containerName: "Invoice Summary" })
	Document = createSingle(ARInvoice);

	@viewInfo({ containerName: "Financial -> Link to GL" })
	CurrentDocument = createSingle(ARInvoice2);

	@viewInfo({ containerName: "currencyinfo" })
	CurrencyInfo = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Financial" })
	dunningLetterDetail = createSingle(ARDunningLetterDetail);

	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(ARTran);

	@viewInfo({ containerName: "Bill-To Contact" })
	Billing_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Bill-To Address" })
	Billing_Address = createSingle(Address);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(ARTaxTran);

	@viewInfo({ containerName: "Commissions" })
	SalesPerTrans = createCollection(ARSalesPerTran);

	@viewInfo({ containerName: "Discounts" })
	ARDiscountDetails = createCollection(ARInvoiceDiscountDetail);

	@viewInfo({ containerName: "Applications" })
	Adjustments = createCollection(ARAdjust2);

	@viewInfo({ containerName: "Applications" })
	Adjustments_1 = createCollection(ARAdjust);

	@viewInfo({ containerName: "Payment Links" })
	PayLink = createSingle(CCPayLink);

	@viewInfo({ containerName: "Recalculate Prices" })
	recalcdiscountsfilter = createSingle(RecalcDiscountsParamFilter);

}

export class ARInvoice extends PXView {

	DocType: PXFieldState;

	@controlConfig<ISelectorControlConfig>({
		fastFilterFields: ["RefNbr", "ARInvoice__InvoiceNbr", "CustomerID", "CustomerID_Customer_AcctName"]
	})
	RefNbr: PXFieldState;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState;
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState;
	IsRetainageDocument: PXFieldState<PXFieldOptions.Disabled>;
	RetainageApply: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscDate: PXFieldState;
	PaymentsByLinesAllowed: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDetailExtPriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineRetainageTotal: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryInitDocBal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRoundDiff: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDocBal_Label: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;

}

export class ARInvoice2 extends PXView {


	@linkCommand("ViewBatch")
	BatchNbr: PXFieldState;
	DisplayCuryInitDocBal: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARSubID: PXFieldState;
	PrepaymentAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentSubID: PXFieldState;
	RetainageAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageSubID: PXFieldState;

	@controlConfig({ linkCommand: "ViewOriginalDocument" })
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ linkCommand: "ViewCorrectionDocument" })
	CorrectionRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Printed: PXFieldState<PXFieldOptions.Disabled>;
	DontPrint: PXFieldState<PXFieldOptions.CommitChanges>;
	Emailed: PXFieldState<PXFieldOptions.Disabled>;
	DontEmail: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true, displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;

	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ApplyOverdueCharge: PXFieldState;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	AvalaraCustomerUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryVatTaxableTotal: PXFieldState;
	CuryVatExemptTotal: PXFieldState;

	IsHiddenInIntercompanySales: PXFieldState;
	Revoked: PXFieldState;
	CuryDiscountedDocTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscountedTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscountedPrice: PXFieldState<PXFieldOptions.Disabled>;

	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryCommnblAmt: PXFieldState;
	CuryCommnAmt: PXFieldState;

	DefRetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigDocAmtWithRetainageTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageUnreleasedAmt: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryRetainageReleased: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageUnpaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainagePaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainedTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainedDiscTotal: PXFieldState<PXFieldOptions.Disabled>;

	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeliveryMethod: PXFieldState;

	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class ARTran extends PXView {

	ViewSchedule: PXActionState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrigDocType: PXFieldState;

	@linkCommand("ViewOrigRetainageDocument")
	OrigRefNbr: PXFieldState;
	SortOrder: PXFieldState;

	@linkCommand("ViewItem")
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ARTran$RelatedDocument$Link")
	@columnConfig({ visible: false })
	RelatedDocument: PXFieldState;

	TranDesc: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	TranCost: PXFieldState<PXFieldOptions.CommitChanges>;

	DiscPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipLineDiscounts: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DiscountSequenceID: PXFieldState;

	PrepaymentPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaymentAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageBal: PXFieldState;
	CuryRetainedTaxAmt: PXFieldState;
	CuryTranAmt: PXFieldState;
	CuryCashDiscBal: PXFieldState;
	CuryTranBal: PXFieldState;
	CuryOrigTaxAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrderType: PXFieldState;

	SOOrderNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccrualAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccrualAccountID_Account_description: PXFieldState;
	ExpenseAccrualSubID: PXFieldState;
	ExpenseAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccountID_Account_description: PXFieldState;
	ExpenseSubID: PXFieldState;
	CostBasisNull: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAccruedCost: PXFieldState<PXFieldOptions.CommitChanges>;

	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SalesPersonID: PXFieldState;

	DefScheduleID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;

	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	AvalaraCustomerUsageType: PXFieldState;
	Date: PXFieldState;
	Commissionable: PXFieldState<PXFieldOptions.CommitChanges>;
	CaseCD: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryUnitPriceDR: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	DiscPctDR: PXFieldState;

	HasExpiredComplianceDocuments: PXFieldState;
}

export class ARDunningLetterDetail extends PXView {

	ARDunningLetter__DunningLetterDate: PXFieldState;
	DunningLetterLevel: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	repaintColumns: true,
})
export class ARTaxTran extends PXView {

	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;
	CuryExemptedAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	CuryRetainedTaxableAmt: PXFieldState;
	CuryRetainedTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
	CuryDiscountedTaxableAmt: PXFieldState;
	CuryDiscountedPrice: PXFieldState;
	CuryAdjustedTaxableAmt: PXFieldState;
	CuryAdjustedTaxAmt: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false, allowInsert: false, fastFilterByAllFields: false,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class ARSalesPerTran extends PXView {

	SalespersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	CommnPct: PXFieldState;
	CuryCommnAmt: PXFieldState;
	CuryCommnblAmt: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	AdjdDocType: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({ preset: GridPreset.Details })
export class ARInvoiceDiscountDetail extends PXView {

	SkipDiscount: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState;
	IsManual: PXFieldState;
	CuryDiscountableAmt: PXFieldState;
	DiscountableQty: PXFieldState;
	CuryDiscountAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountPct: PXFieldState<PXFieldOptions.CommitChanges>;
	FreeItemID: PXFieldState;
	FreeItemQty: PXFieldState;
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	ExtDiscCode: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details })
export class ARAdjust2 extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	LoadDocuments: PXActionState;
	AutoApply: PXActionState;

	@columnConfig({ hideViewLink: true })
	AdjgBranchID: PXFieldState;
	AdjgDocType: PXFieldState;

	@linkCommand("ViewPayment")
	@columnConfig({
		editorConfig: {
			parameters: (screen: AR301000) => ({
				"ARInvoice.customerID": screen.Document.CustomerID.value.id,
				"ARAdjust2.adjgDocType": screen.Adjustments.activeRow.AdjgDocType.value
			})
		}
	})
	AdjgRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	CuryAdjdAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjdPPDAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjdWOAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WriteOffReasonCode: PXFieldState;

	ARPayment__DocDate: PXFieldState;
	CuryDocBal: PXFieldState;
	ARPayment__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARPayment__FinPeriodID: PXFieldState;

	ARPayment__ExtRefNbr: PXFieldState;

	ARPayment__Status: PXFieldState;

	AdjdDocType: PXFieldState;
	AdjdRefNbr: PXFieldState;
	PendingPPD: PXFieldState;

	@linkCommand("ViewPPDVATAdj")
	@columnConfig({ allowFilter: false, allowSort: false })
	PPDVATAdjDescription: PXFieldState;

	HasExpiredComplianceDocuments: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ARAdjust extends PXView {

	@columnConfig({ hideViewLink: true })
	DisplayBranchID: PXFieldState;

	DisplayDocType: PXFieldState;

	@linkCommand("ViewInvoice")
	@columnConfig({
		editorConfig: {
			parameters: (screen: AR301000) => ({
				"ARInvoice.customerID": screen.Document.CustomerID.value.id,
				"ARAdjust.displayDocType": screen.Adjustments_1.activeRow.DisplayDocType.value
			})
		}
	})
	DisplayRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DisplayCustomerID: PXFieldState;

	DisplayCuryAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayDocDate: PXFieldState;
	CuryDocBal: PXFieldState;
	DisplayDocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DisplayFinPeriodID: PXFieldState;

	ARInvoice__InvoiceNbr: PXFieldState;
	DisplayStatus: PXFieldState;
}

export class RecalcDiscountsParamFilter extends PXView {

	RecalcTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDocGroupDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CCPayLink extends PXView {
	Url: PXFieldState;
	LinkStatus: PXFieldState;
}
export class APInvoice extends PXView {
	DocumentKey: PXFieldState<PXFieldOptions.Disabled>;
}

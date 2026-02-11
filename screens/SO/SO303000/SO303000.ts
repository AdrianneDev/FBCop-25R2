import { autoinject } from "aurelia-framework";
import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	createCollection,
	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset,
	GridColumnShowHideMode,
	GridColumnType,
	CurrencyInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	controlConfig,
	fieldConfig,
	PaymentRedirectExceptionHandler,
	RedirectHandlersProvider,
	GridAutoGrowMode,
} from "client-controls";
import { LSNullText } from "src/screens/IN/common/line-splitting/views";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.SO.SOInvoiceEntry",
	primaryView: "Document",
	udfTypeField: "DocType",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
@autoinject
export class SO303000 extends PXScreen {
	@viewInfo({ containerName: "Invoice Summary" })
	Document = createSingle(ARInvoice);

	@viewInfo({ containerName: "Invoice Summary" })
	CurrentDocument = createSingle(ARInvoiceCurrent);

	@viewInfo({ containerName: "Currency" })
	CurrencyInfo = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(ARTran);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(TaxTran);

	@viewInfo({ containerName: "Commissions" })
	SalesPerTrans = createCollection(ARSalesPerTran);

	@viewInfo({ containerName: "Freight" })
	FreightDetails = createCollection(SOFreightDetail);

	@viewInfo({ containerName: "Payment Information" })
	SODocument = createSingle(SOInvoice);

	@viewInfo({ containerName: "Bill-To Contact" })
	Billing_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Bill-To Address" })
	Billing_Address = createSingle(Address);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Discounts" })
	ARDiscountDetails = createCollection(ARInvoiceDiscountDetail);

	@viewInfo({ containerName: "Application Invoice" })
	Adjustments = createCollection(ARAdjust2);

	@viewInfo({ containerName: "Application Credit Memo" })
	Adjustments_1 = createCollection(ARAdjust);

	constructor(redirectHandlersProvider: RedirectHandlersProvider,
		paymentRedirect: PaymentRedirectExceptionHandler) {
		super();

		redirectHandlersProvider.register("openPayment", paymentRedirect);
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Adjustments" })
	onARAdjustChanged(args: RowSelectedHandlerArgs<PXViewCollection<ARAdjust2>>) {
		const model = (<any>args.viewModel as ARAdjust2);
		const ar = args.viewModel.activeRow;

		if (model.CaptureDocumentPayment) model.CaptureDocumentPayment.enabled = !!ar?.CanCapture.value;
		if (model.VoidDocumentPayment) model.VoidDocumentPayment.enabled = !!ar?.CanVoid.value;
		if (model.IncreaseAuthorizedAmount) model.IncreaseAuthorizedAmount.enabled = !!ar?.CanIncreaseAuthorizedAmount.value;
	}
}

export class ARInvoice extends PXView {
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDesc: PXFieldState;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState;
	DiscDate: PXFieldState;
	CuryDetailExtPriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryFreightTot: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ARInvoiceCurrent extends PXView {
	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryCommnblAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryCommnAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryFreightAmt: PXFieldState;
	CuryPremiumFreightAmt: PXFieldState;
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARSubID: PXFieldState;
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;
	CorrectionRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "WorkgroupID",
				valueField: "Description",
				dataMember: "_EPCompanyTree_Tree_",
				textField: "Description",
				mode: "single",
				hideRootNode: true
			},
		},
	})
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;

	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	DontPrint: PXFieldState<PXFieldOptions.CommitChanges>;
	Printed: PXFieldState<PXFieldOptions.Disabled>;
	DontEmail: PXFieldState<PXFieldOptions.CommitChanges>;
	Emailed: PXFieldState<PXFieldOptions.Disabled>;
	DisableAutomaticTaxCalculation: PXFieldState;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	AvalaraCustomerUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscountedDocTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscountedTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscountedPrice: PXFieldState<PXFieldOptions.Disabled>;
	MultiShipAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnreleasedPaymentAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryCCAuthorizedAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryPaidAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryPaymentTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryBalanceWOTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnpaidBalance: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
	allowDragRows: true,
	pasteCommand: "PasteLine"
})
export class ARTran extends PXView {
	ShowItems: PXActionState;
	SelectShipment: PXActionState;
	SelectSOLine: PXActionState;
	SelectARTran: PXActionState;
	ViewSchedule: PXActionState;
	ResetOrder: PXActionState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranType: PXFieldState;
	RefNbr: PXFieldState;
	LineNbr: PXFieldState;
	SortOrder: PXFieldState;

	@columnConfig({ allowUpdate: false })
	LineType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	SOShipmentNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	SOOrderType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	SOOrderNbr: PXFieldState;

	AssociatedOrderLineNbr: PXFieldState;
	GiftMessage: PXFieldState;

	@linkCommand("ViewItem")
	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("AddRelatedItems")
	@columnConfig({
		type: GridColumnType.Icon,
		suppressExport: true,
		allowFilter: false,
		allowSort: false,
		allowShowHide: GridColumnShowHideMode.Server,
		width: 80
	})
	RelatedItems: PXFieldState;

	SubstitutionRequired: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState;

	ReplaceSMEquipmentID: PXFieldState<PXFieldOptions.Hidden>;
	EquipmentAction: PXFieldState<PXFieldOptions.CommitChanges>;
	Comment: PXFieldState<PXFieldOptions.CommitChanges>;
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	NewEquipmentLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ComponentID: PXFieldState<PXFieldOptions.CommitChanges>;
	EquipmentComponentLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ARTran$RelatedDocument$Link")
	@columnConfig({ visible: false })
	RelatedDocument: PXFieldState;

	@columnConfig({ allowDragDrop: true })
	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split, hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;

	BaseQty: PXFieldState;

	@columnConfig({ nullText: LSNullText.Split, hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	ExpireDate: PXFieldState;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualDisc: PXFieldState;
	SkipLineDiscounts: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DiscountSequenceID: PXFieldState;

	CuryTranAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ExpenseAccrualAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccrualAccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExpenseAccrualSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExpenseAccountID: PXFieldState;
	ExpenseAccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExpenseSubID: PXFieldState;

	CostBasisNull: PXFieldState;
	CuryAccruedCost: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;

	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DefScheduleID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	AvalaraCustomerUsageType: PXFieldState;
	Commissionable: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	SOOrderLineNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	OrigInvoiceType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	OrigInvoiceNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	OrigInvoiceLineNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvtDocType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvtRefNbr: PXFieldState;

	BlanketNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class TaxTran extends PXView {
	@columnConfig({ allowUpdate: false })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	TaxRate: PXFieldState;

	CuryTaxableAmt: PXFieldState;
	CuryExemptedAmt: PXFieldState;
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
	CuryDiscountedTaxableAmt: PXFieldState;
	CuryDiscountedPrice: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
})
export class ARSalesPerTran extends PXView {
	@columnConfig({ hideViewLink: true })
	SalespersonID: PXFieldState<PXFieldOptions.CommitChanges>;

	CommnPct: PXFieldState;
	CuryCommnAmt: PXFieldState;
	CuryCommnblAmt: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
})
export class SOFreightDetail extends PXView {
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ShipmentNbr: PXFieldState;

	ShipmentType: PXFieldState;
	ShipTermsID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ShipZoneID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ShipVia: PXFieldState;

	@columnConfig({	format: "F2" })
	Weight: PXFieldState;
	@columnConfig({	format: "F2" })
	Volume: PXFieldState;
	CuryLineTotal: PXFieldState;
	CuryFreightCost: PXFieldState;
	CuryFreightAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPremiumFreightAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTotalFreightAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCategoryID: PXFieldState;
}

export class SOInvoice extends PXView {
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;

	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ARInvoiceDiscountDetail extends PXView {
	SkipDiscount: PXFieldState;
	LineNbr: PXFieldState;
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
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
	ExtDiscCode: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class ARAdjust2 extends PXView {
	LoadDocuments: PXActionState;
	AutoApply: PXActionState;
	CreateDocumentPayment: PXActionState;
	CaptureDocumentPayment: PXActionState;
	VoidDocumentPayment: PXActionState;
	ImportDocumentPayment: PXActionState;
	IncreaseAuthorizedAmount: PXActionState;

	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjgDocType: PXFieldState;

	@linkCommand("ViewPayment")
	@columnConfig({
		editorConfig: {
			parameters: (screen: SO303000) => ({
				"ARInvoice.customerID": screen.Document.CustomerID.value.id,
				"ARAdjust2.adjgDocType": screen.Adjustments.activeRow.AdjgDocType.value
			})
		}
	})
	AdjgRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryAdjdAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgDiscAmt: PXFieldState;
	CuryAdjdWOAmt: PXFieldState;
	ARPayment__DocDate: PXFieldState;
	CuryDocBal: PXFieldState;
	ARPayment__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARPayment__CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARPayment__FinPeriodID: PXFieldState;

	ARPayment__ExtRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	AdjdDocType: PXFieldState;
	AdjdRefNbr: PXFieldState;
	AdjNbr: PXFieldState;
	ARPayment__Status: PXFieldState;
	ExternalTransaction__ProcStatus: PXFieldState;
	CanVoid: PXFieldState;
	CanCapture: PXFieldState;
	CanIncreaseAuthorizedAmount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class ARAdjust extends PXView {
	CreateDocumentRefund: PXActionState;
	DisplayDocType: PXFieldState;

	@linkCommand("ViewInvoice")
	@columnConfig({
		editorConfig: {
			parameters: (screen: SO303000) => ({
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
	DisplayCuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DisplayFinPeriodID: PXFieldState;

	ARInvoice__InvoiceNbr: PXFieldState;
	DisplayStatus: PXFieldState;
	DisplayProcStatus: PXFieldState;
}

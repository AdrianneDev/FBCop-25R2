import { autoinject } from "aurelia-framework";
import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	PXViewCollection,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,

	GridPreset,
	GridColumnType,
	GridColumnShowHideMode,
	GridColumnDisplayMode,

	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	CurrentRowChangedHandlerArgs,

	linkCommand,
	CurrencyInfo,
	ValueChangedHandlerArgs,
	controlConfig,

	PaymentRedirectExceptionHandler,
	RedirectHandlersProvider,
	GridAutoGrowMode,
	GridPagerMode
} from "client-controls";
import { LSNullText } from "../../IN/common/line-splitting/views";
import { Address } from "src/screens/common/form-address/form-address";
import { NullTextValues } from "../../common/messages";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.SO.SOOrderEntry",
	primaryView: "Document",
	bpEventsIndicator: true,
	udfTypeField: "OrderType",
	showActivitiesIndicator: true,
	showUDFIndicator: true,
})
@autoinject
export class SO301000 extends PXScreen {
	OverrideBlanketTaxZone: PXActionState;
	AddRelatedItems: PXActionState;
	PasteLine: PXActionState;
	ViewChildOrder: PXActionState;
	ViewPayment: PXActionState;
	ViewOrigOrder: PXActionState;

	DeletePayment: PXActionState;
	DeleteRefund: PXActionState;
	CalculateFreight: PXActionState;
	CheckCopyParams: PXActionState;

	@viewInfo({ containerName: "Order Summary" })
	Document = createSingle(SOOrderHeader);

	@viewInfo({ containerName: "Order" })
	CurrentDocument = createSingle(SOOrder);

	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(SOLine);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(SOTaxTran);

	@viewInfo({ containerName: "Commissions" })
	SalesPerTran = createCollection(SOSalesPerTran);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Bill-To Contact" })
	Billing_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Bill-To Address" })
	Billing_Address = createSingle(Address);

	@viewInfo({ containerName: "Shipments" })
	ShipmentList = createCollection(SOOrderShipment);

	@viewInfo({ containerName: "Child Orders" })
	BlanketOrderChildrenDisplayList = createCollection(SOBlanketOrderDisplayLink);

	@viewInfo({ containerName: "Payments" })
	Adjustments = createCollection(SOAdjustments);

	@viewInfo({ containerName: "Process Order" })
	_SOOrder_CurrencyInfo_ = createSingle(CurrencyInfo);

	//Header = createSingle(EntryHeader); // TODO: Must be placed in feature extension

	constructor(redirectHandlersProvider: RedirectHandlersProvider,
		paymentRedirect: PaymentRedirectExceptionHandler) {
		super();

		redirectHandlersProvider.register("openPayment", paymentRedirect);
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "Transactions" })
	onSOLineChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<SOLine>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.POSupplyOK) model.POSupplyOK.enabled = !!ar?.POCreate.value;

		if (model.ItemAvailability) model.ItemAvailability.enabled = !!ar?.IsStockItem.value;
		if (model.SOOrderLineSplittingExtension_ShowSplits) model.SOOrderLineSplittingExtension_ShowSplits.enabled = !!ar;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Adjustments" })
	onSOAdjustmentsChanged(args: RowSelectedHandlerArgs<PXViewCollection<SOAdjustments>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.DeletePayment) model.DeletePayment.enabled = !!ar?.CanDeletePayment.value;
		if (model.IncreaseAuthorizedAmount) model.IncreaseAuthorizedAmount.enabled = !!ar?.CanIncreaseAuthorizedAmount.value;
		if (model.CaptureDocumentPayment) model.CaptureDocumentPayment.enabled = !!ar?.CanCapture.value;
		if (model.VoidDocumentPayment) model.VoidDocumentPayment.enabled = !!ar?.CanVoid.value;
		if (model.DeleteRefund) model.DeleteRefund.enabled = !!ar?.CanDeleteRefund.value;
	}

	@handleEvent(CustomEventType.ValueChanged, { view: "CurrentDocument", field: "OverrideTaxZone", order: 1 })
	onOverrideTaxZoneChange(args: ValueChangedHandlerArgs<SOOrder>) {
		if (args?.oldValue === false && args?.newValue === true) {
			this.OverrideBlanketTaxZone.press();
		}
	}
}

export class SOOrderHeader extends PXView {
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	OrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerRefNbr: PXFieldState;

	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderDesc: PXFieldState;

	OrderQty: PXFieldState<PXFieldOptions.Disabled>;
	CuryDetailExtPriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryFreightTot: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrderTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryControlTotal: PXFieldState;

	ArePaymentsApplicable: PXFieldState<PXFieldOptions.CommitChanges>;
	IsFSIntegrated: PXFieldState<PXFieldOptions.Disabled>;

	ShowDiscountsTab: PXFieldState;
	ShowShipmentsTab: PXFieldState;
	ShowOrdersTab: PXFieldState;
}

export class SOOrder extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchBaseCuryID: PXFieldState;
	DisableAutomaticTaxCalculation: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideTaxZone: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	AvalaraCustomerUsageType: PXFieldState;
	BillSeparately: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState;
	InvoiceDate: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState;
	DiscDate: PXFieldState;
	FinPeriodID: PXFieldState;

	OverridePrepayment: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentReqPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaymentReqAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentReqSatisfied: PXFieldState;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;

	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;

	OrigOrderType: PXFieldState<PXFieldOptions.Disabled>;
	OrigOrderNbr: PXFieldState<PXFieldOptions.Disabled>;
	Emailed: PXFieldState<PXFieldOptions.Disabled>;
	Printed: PXFieldState<PXFieldOptions.Disabled>;

	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	DisableAutomaticDiscountCalculation: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryUnreleasedPaymentAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryCCAuthorizedAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryPaidAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryPaymentTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryBilledPaymentTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTransferredToChildrenPaymentTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnpaidBalance: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnbilledOrderTotal: PXFieldState<PXFieldOptions.Disabled>;
	RiskStatus: PXFieldState<PXFieldOptions.Disabled>;

	ShipVia: PXFieldState<PXFieldOptions.CommitChanges>;
	WillCall: PXFieldState;
	DeliveryConfirmation: PXFieldState<PXFieldOptions.CommitChanges>;
	EndorsementService: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightClass: PXFieldState;
	FOBPoint: PXFieldState;
	Priority: PXFieldState;
	ShipTermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	Resedential: PXFieldState<PXFieldOptions.CommitChanges>;
	SaturdayDelivery: PXFieldState<PXFieldOptions.CommitChanges>;
	Insurance: PXFieldState<PXFieldOptions.CommitChanges>;
	UseCustomerAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	GroundCollect: PXFieldState<PXFieldOptions.CommitChanges>;
	IntercompanyPOType: PXFieldState;
	IntercompanyPONbr: PXFieldState<PXFieldOptions.Disabled>;
	IntercompanyPOReturnNbr: PXFieldState<PXFieldOptions.Disabled>;
	ShipDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipSeparately: PXFieldState;
	ShipComplete: PXFieldState<PXFieldOptions.CommitChanges>;
	CancelDate: PXFieldState;
	Cancelled: PXFieldState<PXFieldOptions.Disabled>;
	DefaultSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	//Freight Info
	OrderWeight: PXFieldState<PXFieldOptions.Disabled>;
	OrderVolume: PXFieldState<PXFieldOptions.Disabled>;
	PackageWeight: PXFieldState<PXFieldOptions.Disabled>;
	CuryFreightCost: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightCostIsValid: PXFieldState;
	OverrideFreightAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightAmountSource: PXFieldState;
	CuryFreightAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPremiumFreightAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightTaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	//VAT Totals
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	//Order Totals
	CuryGoodsExtPriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryMiscExtPriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	MarginPct: PXFieldState<PXFieldOptions.Disabled>;
	CuryMarginAmt: PXFieldState<PXFieldOptions.Disabled>;
	//Shipment and Invoice Info
	BlanketOpenQty: PXFieldState<PXFieldOptions.Disabled>;
	OpenOrderQty: PXFieldState<PXFieldOptions.Disabled>;
	CuryOpenOrderTotal: PXFieldState<PXFieldOptions.Disabled>;
	UnbilledOrderQty: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnrefundedBalance: PXFieldState<PXFieldOptions.Disabled>;
	//Order Orchestration
	OrchestrationStatus: PXFieldState<PXFieldOptions.Disabled>;
	OrchestrationStrategy: PXFieldState<PXFieldOptions.CommitChanges>;
	LimitWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfWarehouses: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
	allowDragRows: true,
	pasteCommand: "PasteLine"
})
export class SOLine extends PXView {
	ShowItems: PXActionState;
	ShowMatrixPanel: PXActionState;
	AddInvoice: PXActionState;
	AddBlanketLine: PXActionState;
	SOOrderLineSplittingExtension_ShowSplits: PXActionState;
	POSupplyOK: PXActionState;
	ItemAvailability: PXActionState;
	ShowAddLotSerialNbrPanel: PXActionState; //Add Lot/Serial Nbr. button on Details tab

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ExcludedFromExport: PXFieldState;

	IsConfigurable: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	LineNbr: PXFieldState;
	AssociatedOrderLineNbr: PXFieldState;
	GiftMessage: PXFieldState;
	SortOrder: PXFieldState;
	LineType: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	InvoiceNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		type: GridColumnType.Icon,
		allowShowHide: GridColumnShowHideMode.Server,
		allowFilter: false,
		allowSort: false,
		suppressExport: true,
	})
	IsStockItem: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, width: 80 })
	@linkCommand<SO301000>("AddRelatedItems")
	RelatedItems: PXFieldState;

	SubstitutionRequired: PXFieldState;
	IsSpecialOrder: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	AutoCreateIssueLine: PXFieldState;

	IsFree: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split, allowShowHide: GridColumnShowHideMode.Server, })
	LocationID: PXFieldState;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true, allowDragDrop: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;

	BaseOrderQty: PXFieldState;
	QtyOnOrders: PXFieldState;
	BlanketOpenQty: PXFieldState;
	ShippedQty: PXFieldState<PXFieldOptions.Disabled>;
	UnshippedQty: PXFieldState;
	OpenQty: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnitCost: PXFieldState;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState;
	CuryDiscAmt: PXFieldState;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState;
	ManualDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	AutomaticDiscountsDisabled: PXFieldState;

	@columnConfig({ nullText: NullTextValues.Zero })
	CuryDiscPrice: PXFieldState;

	SkipLineDiscounts: PXFieldState;

	@columnConfig({ nullText: NullTextValues.Zero })
	AvgCost: PXFieldState;

	CuryLineAmt: PXFieldState;
	MarginPct: PXFieldState;
	CuryMarginAmt: PXFieldState;

	@columnConfig({ nullText: LSNullText.Split })
	SchedOrderDate: PXFieldState<PXFieldOptions.CommitChanges>;

	CustomerOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID_Location_descr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ShipVia: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	FOBPoint: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ShipTermsID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ShipZoneID: PXFieldState;

	@columnConfig({ nullText: LSNullText.Split })
	SchedShipDate: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnbilledAmt: PXFieldState<PXFieldOptions.Disabled>;
	RequestDate: PXFieldState;
	ShipDate: PXFieldState;
	ShipComplete: PXFieldState;
	CompleteQtyMin: PXFieldState;
	CompleteQtyMax: PXFieldState;
	Completed: PXFieldState<PXFieldOptions.CommitChanges>;
	OrigOrderType: PXFieldState;

	@linkCommand<SO301000>("ViewOrigOrder")
	OrigOrderNbr: PXFieldState;
	POCreate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPOLinkAllowed: PXFieldState;
	POSource: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split })
	POCreateDate: PXFieldState<PXFieldOptions.CommitChanges>;

	POOrderNbr: PXFieldState;
	POOrderStatus: PXFieldState;
	POLineNbr: PXFieldState;
	POLinkActive: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split, allowShowHide: GridColumnShowHideMode.Server, })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ExpireDate: PXFieldState;

	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SalesPersonID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	AvalaraCustomerUsageType: PXFieldState;
	Commissionable: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BlanketNbr: PXFieldState;
	AlternateID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SalesSubID: PXFieldState;

	@columnConfig({ fullState: true })
	InventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryUnitPriceDR: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	DiscPctDR: PXFieldState;

	IsOrchestratedLine: PXFieldState;
	OrchestrationPlanID: PXFieldState;
}

export class SOTaxTranTax {
	TaxType: PXFieldState;
	PendingTax: PXFieldState;
	ReverseTax: PXFieldState;
	ExemptTax: PXFieldState;
	StatisticalTax: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class SOTaxTran extends PXView {
	@columnConfig({ allowUpdate: false })
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	TaxRate: PXFieldState<PXFieldOptions.Disabled>;

	CuryTaxableAmt: PXFieldState;
	CuryExemptedAmt: PXFieldState;
	TaxUOM: PXFieldState;

	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	Tax: SOTaxTranTax;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class SOSalesPerTran extends PXView {
	@columnConfig({ hideViewLink: true })
	SalespersonID: PXFieldState<PXFieldOptions.CommitChanges>;

	CommnPct: PXFieldState;

	@columnConfig({ allowUpdate: false })
	CuryCommnAmt: PXFieldState;

	@columnConfig({ allowUpdate: false })
	CuryCommnblAmt: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
})
export class SOOrderShipment extends PXView {
	ShipmentType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ShipmentNbr: PXFieldState;

	@linkCommand("SOOrderShipment~DisplayShippingRefNoteID~Link")
	DisplayShippingRefNoteID: PXFieldState;

	Status: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Operation: PXFieldState;

	@columnConfig({ allowUpdate: false })
	OrderType: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ allowUpdate: false })
	OrderNbr: PXFieldState<PXFieldOptions.Disabled>;

	ShipDate: PXFieldState;
	ShipmentQty: PXFieldState;

	@columnConfig({	format: "F2" })
	ShipmentWeight: PXFieldState;

	@columnConfig({	format: "F2" })
	ShipmentVolume: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvoiceType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvoiceNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvtDocType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvtRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
	allowUpdate: false,
})
export class SOBlanketOrderDisplayLink extends PXView {
	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	@linkCommand<SO301000>("ViewChildOrder")
	OrderNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	OrderDate: PXFieldState;

	OrderStatus: PXFieldState;
	OrderedQty: PXFieldState;
	CuryOrderedAmt: PXFieldState;
	ShipmentType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ShipmentNbr: PXFieldState;

	@linkCommand("SOBlanketOrderDisplayLink~DisplayShippingRefNoteID~Link")
	DisplayShippingRefNoteID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ShipmentDate: PXFieldState;

	ShipmentStatus: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ShippedQty: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvoiceType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvoiceNbr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InvoiceDate: PXFieldState;

	InvoiceStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class SOAdjustments extends PXView {
	CreatePrepaymentInvoice: PXActionState;
	CreateDocumentPayment: PXActionState;
	CreateOrderPrepayment: PXActionState;
	DeletePayment: PXActionState;
	CaptureDocumentPayment: PXActionState;
	VoidDocumentPayment: PXActionState;
	ImportDocumentPayment: PXActionState;
	CreateDocumentRefund: PXActionState;
	DeleteRefund: PXActionState;
	IncreaseAuthorizedAmount: PXActionState;

	AdjgDocType: PXFieldState<PXFieldOptions.CommitChanges>; // TODO: there was no CommitChanges here in the old ui, paramters used instead

	@linkCommand<SO301000>("ViewPayment")
	AdjgRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	BlanketNbr: PXFieldState;
	CuryAdjdAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjdBilledAmt: PXFieldState;
	CuryAdjdTransferredToChildrenAmt: PXFieldState;

	@columnConfig({ allowUpdate: false })
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ allowUpdate: false })
	ARPayment__Status: PXFieldState<PXFieldOptions.Disabled>;

	ExtRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true, allowUpdate: false })
	PaymentMethodID: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARPayment__CuryID: PXFieldState;

	ExternalTransaction__ProcStatus: PXFieldState;
	CanVoid: PXFieldState;
	CanIncreaseAuthorizedAmount: PXFieldState;
	CanCapture: PXFieldState;
	CanDeletePayment: PXFieldState;
	CanDeleteRefund: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
})
export class Relations extends PXView {
	Role: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPrimary: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	@linkCommand("RelationsViewTargetDetails")
	TargetNoteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	@linkCommand("RelationsViewEntityDetails")
	EntityID: PXFieldState<PXFieldOptions.CommitChanges>;

	Name: PXFieldState;

	@columnConfig({ allowUpdate: false })
	@linkCommand("RelationsViewContactDetails")
	ContactID: PXFieldState;

	Email: PXFieldState;
	AddToCC: PXFieldState<PXFieldOptions.CommitChanges>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
}

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
	controlConfig,

	GridPreset,
	GridColumnShowHideMode,
	linkCommand,
	headerDescription,
	CurrencyInfo,

	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection, GridColumnGeneration,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.Objects.PO.POOrderEntry",
	primaryView: "Document",
	udfTypeField: "OrderType",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
export class PO301000 extends PXScreen {
	AddSelectedItems: PXActionState;
	ViewChangeOrder: PXActionState;
	ViewReversingChangeOrders: PXActionState;
	ViewOrigChangeOrder: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	Document = createSingle(POOrderHeader);

	@viewInfo({ containerName: "Document" })
	CurrentDocument = createSingle(POOrder);

	@viewInfo({ containerName: "currencyinfo" })
	CurrencyInfo = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(POLine);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(POTaxTran);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Vendor Contact" })
	Remit_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Vendor Address" })
	Remit_Address = createSingle(Address);

	@viewInfo({ containerName: "Discounts" })
	DiscountDetails = createCollection(POOrderDiscountDetail);

	@viewInfo({ containerName: "PO History" })
	Receipts = createCollection(POOrderPOReceipt);

	@viewInfo({ containerName: "PO History" })
	APDocs = createCollection(POOrderAPDoc);

	@viewInfo({ containerName: "Blanket PO History" })
	ChildOrdersReceipts = createCollection(POOrderChildOrdersReceipts);

	@viewInfo({ containerName: "Blanket PO History" })
	ChildOrdersAPDocs = createCollection(POOrderChildOrdersAPDocs);

	@viewInfo({ containerName: "Prepayments" })
	PrepaymentDocuments = createCollection(POOrderPrepayment);

	@viewInfo({ containerName: "Change Orders" })
	ChangeOrderDetails = createCollection(PMChangeOrderLine);

	@viewInfo({ containerName: "Reversing Change Orders" })
	ReversingChangeOrders = createCollection(ReversingChangeOrders);

	@handleEvent(CustomEventType.RowSelected, { view: "Transactions" })
	onSOLineChanged(args: RowSelectedHandlerArgs<PXViewCollection<POLine>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.ViewDemand) model.ViewDemand.enabled = !!ar?.ViewDemandEnabled.value;
	}
}

export class POOrderHeader extends PXView {
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Behavior: PXFieldState;
	RequestApproval: PXFieldState;
	OrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpectedDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderDesc: PXFieldState;

	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true, nullText: NullTextValues.MultipleProjects })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryDetailExtCostTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrderTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryControlTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageTotal: PXFieldState<PXFieldOptions.Disabled>;
}

export class POOrder extends PXView {
	ShipDestType: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderNbr: PXFieldState;
	FOBPoint: PXFieldState;
	ShipVia: PXFieldState;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	PayToVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentPct: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	RQReqNbr: PXFieldState<PXFieldOptions.Disabled>;
	OriginalPONbr: PXFieldState<PXFieldOptions.Disabled>;
	SuccessorPONbr: PXFieldState<PXFieldOptions.Disabled>;
	OwnerWorkgroupID: PXFieldState;
	DontPrint: PXFieldState<PXFieldOptions.CommitChanges>;
	Printed: PXFieldState<PXFieldOptions.Disabled>;
	DontEmail: PXFieldState<PXFieldOptions.CommitChanges>;
	Emailed: PXFieldState<PXFieldOptions.Disabled>;
	OrderBasedAPBill: PXFieldState;
	RetainageApply: PXFieldState<PXFieldOptions.CommitChanges>;
	DefRetainagePct: PXFieldState;
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryGoodsExtCostTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryServiceExtCostTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot: PXFieldState<PXFieldOptions.Disabled>;
	UnbilledOrderQty: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnbilledOrderTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryPrepaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnprepaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	IntercompanySOType: PXFieldState;
	IntercompanySONbr: PXFieldState<PXFieldOptions.Disabled>;
	ExcludeFromIntercompanyProc: PXFieldState;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "PasteLine"
})
export class POLine extends PXView {
	ShowItems: PXActionState;
	ShowMatrixPanel: PXActionState;
	AddProjectItem: PXActionState;
	AddPOOrder: PXActionState;
	AddPOOrderLine: PXActionState;
	ViewDemand: PXActionState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	IsSpecialOrder: PXFieldState;
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, allowDragDrop: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true, allowDragDrop: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;

	BaseOrderQty: PXFieldState;
	OrderedQty: PXFieldState;
	NonOrderedQty: PXFieldState;
	ReceivedQty: PXFieldState;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderNbr: PXFieldState;
	SOOrderStatus: PXFieldState;
	SOLineNbr: PXFieldState;
	SOLinkActive: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState;
	CuryDiscAmt: PXFieldState;
	CuryDiscCost: PXFieldState;
	ManualDisc: PXFieldState;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState;
	DisplayReqPrepaidQty: PXFieldState;
	CuryReqPrepaidAmt: PXFieldState;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState;
	AlternateID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	LotSerialNbr: PXFieldState;

	RcptQtyMin: PXFieldState;
	RcptQtyMax: PXFieldState;
	RcptQtyThreshold: PXFieldState;
	RcptQtyAction: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	ExpenseAcctID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExpenseSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	POAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	POAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;

	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	SortOrder: PXFieldState<PXFieldOptions.Hidden>;
	RequestedDate: PXFieldState;
	PromisedDate: PXFieldState;
	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletePOLine: PXFieldState<PXFieldOptions.Hidden>;
	Completed: PXFieldState;
	Cancelled: PXFieldState;
	Closed: PXFieldState;
	BilledQty: PXFieldState;
	CuryBilledAmt: PXFieldState;
	UnbilledQty: PXFieldState;
	CuryUnbilledAmt: PXFieldState;
	POType: PXFieldState;

	@linkCommand("ViewBlanketOrder")
	PONbr: PXFieldState;

	POAccrualType: PXFieldState;
	HasExpiredComplianceDocuments: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	ViewDemandEnabled: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class POTaxTran extends PXView {
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxUOM: PXFieldState;

	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	CuryRetainedTaxableAmt: PXFieldState;
	CuryRetainedTaxAmt: PXFieldState;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class POOrderDiscountDetail extends PXView {
	SkipDiscount: PXFieldState;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState;
	IsManual: PXFieldState;
	CuryDiscountableAmt: PXFieldState;
	DiscountableQty: PXFieldState;
	CuryDiscountAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainedDiscountAmt: PXFieldState;
	DiscountPct: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtDiscCode: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	statusField: "StatusText",
	adjustPageSize: true,
})
export class POOrderPOReceipt extends PXView {
	ReceiptType: PXFieldState;
	ReceiptNbr: PXFieldState;
	DocDate: PXFieldState;
	Status: PXFieldState;
	TotalQty: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	statusField: "StatusText",
	adjustPageSize: true,
})
export class POOrderAPDoc extends PXView {
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	DocDate: PXFieldState;
	Status: PXFieldState;
	TotalQty: PXFieldState;
	TotalAmt: PXFieldState;
	TotalPPVAmt: PXFieldState;
	CuryID: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	statusField: "StatusText",
	adjustPageSize: true,
})
export class POOrderChildOrdersReceipts extends PXView {
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	OrderDate: PXFieldState;
	Status: PXFieldState;
	TotalQty: PXFieldState;
	POBlanketOrderPOReceipt__ReceiptType: PXFieldState;
	POBlanketOrderPOReceipt__ReceiptNbr: PXFieldState;
	POBlanketOrderPOReceipt__ReceiptDate: PXFieldState;
	POBlanketOrderPOReceipt__Status: PXFieldState;
	POBlanketOrderPOReceipt__TotalQty: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	statusField: "StatusText",
	adjustPageSize: true,
})
export class POOrderChildOrdersAPDocs extends PXView {
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	DocDate: PXFieldState;
	Status: PXFieldState;
	TotalQty: PXFieldState;
	TotalAmt: PXFieldState;
	TotalPPVAmt: PXFieldState;
	CuryID: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	statusField: "StatusText",
})
export class POOrderPrepayment extends PXView {
	APDocType: PXFieldState;
	APRefNbr: PXFieldState;
	APRegister__DocDate: PXFieldState;
	CuryAppliedAmt: PXFieldState;
	APRegister__CuryDocBal: PXFieldState;
	APRegister__Status: PXFieldState;
	APRegister__CuryID: PXFieldState;
	PayRefNbr: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class PMChangeOrderLine extends PXView {
	@linkCommand("ViewChangeOrder")
	PMChangeOrder__RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMChangeOrder__ClassID: PXFieldState;

	PMChangeOrder__ProjectNbr: PXFieldState;
	PMChangeOrder__Status: PXFieldState;
	PMChangeOrder__Description: PXFieldState;
	PMChangeOrder__Date: PXFieldState;
	PMChangeOrder__CompletionDate: PXFieldState;
	PMChangeOrder__DelayDays: PXFieldState;

	@linkCommand("ViewReversingChangeOrders")
	PMChangeOrder__ReversingRefNbr: PXFieldState;

	@linkCommand("ViewOrigChangeOrder")
	PMChangeOrder__OrigRefNbr: PXFieldState;

	PMChangeOrder__ExtRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMChangeOrderLine__ProjectID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMChangeOrderLine__TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMChangeOrderLine__InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMChangeOrderLine__CostCodeID: PXFieldState;

	PMChangeOrderLine__Description: PXFieldState;
	PMChangeOrderLine__Qty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMChangeOrderLine__UOM: PXFieldState;

	PMChangeOrderLine__UnitCost: PXFieldState;
	PMChangeOrderLine__Amount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class ReversingChangeOrders extends PXView {
	@linkCommand("ViewCurrentReversingChangeOrder")
	RefNbr: PXFieldState;
	Description: PXFieldState;
}

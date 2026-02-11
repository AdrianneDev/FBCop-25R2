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

	TextAlign,
	GridPreset,
	GridColumnShowHideMode,
	CurrencyInfo,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.RQ.RQRequisitionEntry",
	primaryView: "Document",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class RQ302000 extends PXScreen {
	AddSelectedItems: PXActionState;
	RecalculatePricesActionOk: PXActionState;
	vendorInfo: PXActionState;
	ViewSOOrder: PXActionState;
	viewPOOrder: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	Document = createSingle(RQRequisition);

	@viewInfo({ containerName: "Document Summary General" })
	CurrentDocument = createSingle(RQRequisition2);

	@viewInfo({ containerName: "Details" })
	Lines = createCollection(RQRequisitionLine);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Bidding Vendors" })
	Vendors = createCollection(RQBiddingVendor);

	@viewInfo({ containerName: "Bidding Vendors" })
	_RQBiddingVendor_CurrencyInfo_ = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Vendor Contact" })
	Remit_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Vendor Address" })
	Remit_Address = createSingle(Address);

	@viewInfo({ containerName: "Purchase Orders" })
	POOrders = createCollection(POOrder);

	@viewInfo({ containerName: "Sales Orders" })
	SOOrders = createCollection(SOOrder);

	_RQRequisition_CurrencyInfo_ = createSingle(CurrencyInfo);
}

export class RQRequisition extends PXView {
	RecalculatePricesAction: PXActionState;

	ReqNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	OrderDate: PXFieldState;
	Quoted: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Priority: PXFieldState;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState;
	CuryEstExtCostTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class RQRequisition2 extends PXView {
	ShipDestType: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToLocationID: PXFieldState;
	FOBPoint: PXFieldState;
	ShipVia: PXFieldState;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorRefNbr: PXFieldState;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	POType: PXFieldState<PXFieldOptions.CommitChanges>;
	Splittable: PXFieldState;
	WorkgroupID: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
})
export class RQRequisitionLine extends PXView {
	viewDetails: PXActionState;
	ShowItems: PXActionState;
	addRequestLine: PXActionState;
	transfer: PXActionState;
	merge: PXActionState;
	viewLineDetails: PXActionState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ visible: false })
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false, allowNull: false })
	LineSource: PXFieldState;

	@columnConfig({ allowNull: false })
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	CuryEstUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;

	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	CuryEstExtCost: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ExpenseSubID: PXFieldState;

	AlternateID: PXFieldState;
	IsUseMarkup: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	MarkupPct: PXFieldState;

	RcptQtyMin: PXFieldState;
	RcptQtyMax: PXFieldState;
	RcptQtyThreshold: PXFieldState;
	RcptQtyAction: PXFieldState;
	RequestedDate: PXFieldState;
	PromisedDate: PXFieldState;
	Cancelled: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class RQBiddingVendor extends PXView {
	responseVendor: PXActionState;
	chooseVendor: PXActionState;
	sendRequestToCurrentVendor: PXActionState;

	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID_Vendor_AcctName: PXFieldState;

	@columnConfig({hideViewLink: true})
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorLocationID_Location_Descr: PXFieldState;

	@columnConfig({
		editorType: "qp-currency-selector",
		hideViewLink: true,
		editorConfig: {
			viewName: "_RQBiddingVendor_CurrencyInfo_"
		},
	})
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;

	Location__VShipTermsID: PXFieldState;
	FOBPoint: PXFieldState;
	Location__VLeadTime: PXFieldState;
	ShipVia: PXFieldState;
	ExpireDate: PXFieldState;
	PromisedDate: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	RemitContactID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	RemitAddressID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
})
export class POOrder extends PXView {
	CreatePOOrder: PXActionState;

	@columnConfig({ hideViewLink: true })
	POOrder__OrderType: PXFieldState;

	@linkCommand("viewPOOrder")
	OrderNbr: PXFieldState;

	@columnConfig({ allowNull: false })
	Status: PXFieldState;

	OrderDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	VendorRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryLineTotal: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryTaxTotal: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryOrderTotal: PXFieldState;

	@columnConfig({ hideViewLink: true, textAlign: TextAlign.Left })
	OwnerId: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
})
export class SOOrder extends PXView {
	CreateQTOrder: PXActionState;

	@columnConfig({ allowNull: false, hideViewLink: true })
	OrderType: PXFieldState;

	@linkCommand("viewSOOrder")
	OrderNbr: PXFieldState;

	OrderDate: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryLineTotal: PXFieldState;
	CuryTaxTotal: PXFieldState;
	CuryOrderTotal: PXFieldState;
}

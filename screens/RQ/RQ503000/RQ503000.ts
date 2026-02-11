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
	GridPreset,
	CurrencyInfo,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.RQ.RQBiddingProcess",
	primaryView: "Document",
})
export class RQ503000 extends PXScreen {
	@viewInfo({ containerName: "Requisition Summary" })
	Document = createSingle(RQRequisition);

	@viewInfo({ containerName: "Bidding Vendors" })
	Vendors = createCollection(RQBiddingVendor);

	@viewInfo({ containerName: "Bidding Vendors" })
	_RQBiddingVendor_CurrencyInfo_ = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Requisition Details" })
	Lines = createCollection(RQRequisitionLine);

	@viewInfo({ containerName: "Bidding Details" })
	Bidding = createCollection(RQBidding);

	_RQRequisition_CurrencyInfo_ = createSingle(CurrencyInfo);
}

export class RQRequisition extends PXView {
	ReqNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Splittable: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	OrderDate: PXFieldState;
	Priority: PXFieldState;
	Description: PXFieldState;
	EmployeeID: PXFieldState;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorRefNbr: PXFieldState;
	CuryEstExtCostTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class RQBiddingVendor extends PXView {
	vendorInfo: PXActionState;
	chooseVendor: PXActionState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID_Vendor_AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID_Location_Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Location__VShipTermsID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FOBPoint: PXFieldState;

	Location__VLeadTime: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ShipVia: PXFieldState;

	EntryDate: PXFieldState;
	ExpireDate: PXFieldState;
	PromisedDate: PXFieldState;

	@columnConfig({ allowNull: false })
	TotalQuoteQty: PXFieldState;


	@columnConfig({
		editorType: "qp-currency-selector",
		hideViewLink: true,
		editorConfig: {
			viewName: "_RQBiddingVendor_CurrencyInfo_"
		}
	})
	CuryID: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryTotalQuoteExtCost: PXFieldState;

	@columnConfig({ hideViewLink: true })
	RemitContactID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	RemitAddressID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
	autoRepaint: ["Bidding"]
})
export class RQRequisitionLine extends PXView {
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	@columnConfig({ allowNull: false })
	OrderQty: PXFieldState;

	@columnConfig({ allowNull: false })
	BiddingQty: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryEstUnitCost: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryEstExtCost: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class RQBidding extends PXView {
	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID_Vendor_AcctName: PXFieldState;

	@columnConfig({hideViewLink: true})
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	QuoteNumber: PXFieldState;

	@columnConfig({ allowNull: false })
	MinQty: PXFieldState;

	@columnConfig({ allowNull: false })
	QuoteQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ allowUpdate: false, allowNull: false })
	CuryQuoteUnitCost: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryQuoteExtCost: PXFieldState;

	@columnConfig({ allowNull: false })
	OrderQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Location__VShipTermsID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	RQBiddingVendor__FOBPoint: PXFieldState;

	Location__VLeadTime: PXFieldState;

	@columnConfig({ hideViewLink: true })
	RQBiddingVendor__ShipVia: PXFieldState;

	RQBiddingVendor__ExpireDate: PXFieldState;
	RQBiddingVendor__PromisedDate: PXFieldState;
}

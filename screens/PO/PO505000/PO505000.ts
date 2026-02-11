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
	linkCommand,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POCreate",
	primaryView: "Filter",
})
export class PO505000 extends PXScreen {
	ViewDocument: PXActionState;
	ViewServiceOrderDocument: PXActionState;
	ViewProdDocument: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(POCreateFilter);

 	@viewInfo({ containerName: "Details" })
	FixedDemand = createCollection(INItemPlan);
}

export class POCreateFilter extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchDate: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyWorkGroup: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	ItemClassCD: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestedOnDate: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;
	serviceOrderRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	AMOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderTotal: PXFieldState<PXFieldOptions.Disabled>;
	OrderWeight: PXFieldState<PXFieldOptions.Disabled>;
	OrderVolume: PXFieldState<PXFieldOptions.Disabled>;
	OrderQty: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: ["InventoryID", "POSiteID", "VendorID", "SalesCustomerID"],
})
export class INItemPlan extends PXView {
	@columnConfig({ allowNull: false, allowCheckAll: true })
	Selected: PXFieldState;

	LocalizedPlanDescr: PXFieldState;

	InventoryID: PXFieldState;
	InventoryID_InventoryItem_descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	POSiteID: PXFieldState;
	POSiteID_description: PXFieldState;
	SourceSiteID: PXFieldState;
	SourceSiteDescr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DemandUOM: PXFieldState;

	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestedDate: PXFieldState;

	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID_Vendor_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	Location__vLeadTime: PXFieldState;
	AddLeadTimeDays: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Vendor__TermsID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Location__vCarrierID: PXFieldState;

	effPrice: PXFieldState;
	ExtCost: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	SalesCustomerID: PXFieldState;
	SalesCustomerID_BAccountR_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrder__CustomerLocationID: PXFieldState;

	SOLine__UnitPrice: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOLine__UOM: PXFieldState;

	@linkCommand("viewDocument")
	SOOrder__OrderNbr: PXFieldState;

	AMProdMatlSplitPlan__OrderType: PXFieldState;

	@linkCommand("viewProdDocument")
	AMProdMatlSplitPlan__ProdOrdID: PXFieldState;

	@linkCommand("viewDocument")
	FSServiceOrder__RefNbr: PXFieldState;

	@columnConfig({ allowNull: false })
	ExtWeight: PXFieldState;

	@columnConfig({ allowNull: false })
	ExtVolume: PXFieldState;
}

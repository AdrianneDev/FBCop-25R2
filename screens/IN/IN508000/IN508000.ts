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
	PXPageLoadBehavior,
	linkCommand,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INReplenishmentCreate",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class IN508000 extends PXScreen {
	ViewInventoryItem: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(INReplenishmentFilter);

	@viewInfo({ containerName: "Items Requiring Replenishment" })
	Records = createCollection(INItemSite);
}

export class INReplenishmentFilter extends PXView {
	ReplenishmentSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchaseDate: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyWorkGroup: PXFieldState<PXFieldOptions.CommitChanges>;
	OnlySuggested: PXFieldState<PXFieldOptions.CommitChanges>;
	PreferredVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassCD: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class INItemSite extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@linkCommand("viewInventoryItem")
	InventoryID: PXFieldState;

	Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PurchaseUnit: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseUnit: PXFieldState;

	QtyProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyINReplaned: PXFieldState;
	QtyOnHand: PXFieldState;
	QtyNotAvail: PXFieldState;
	QtyReplenishment: PXFieldState;
	QtyDemand: PXFieldState;
	QtyHardDemand: PXFieldState;
	QtyPOPrepared: PXFieldState;
	QtyPOOrders: PXFieldState;
	QtyPOReceipts: PXFieldState;
	QtyInTransit: PXFieldState;
	QtyINReceipts: PXFieldState;
	QtyINAssemblySupply: PXFieldState;
	QtySOBackOrdered: PXFieldState;
	QtySOPrepared: PXFieldState;
	QtySOBooked: PXFieldState;
	QtySOShipped: PXFieldState;
	QtyFSSrvOrdPrepared: PXFieldState;
	QtyFSSrvOrdBooked: PXFieldState;
	QtyFSSrvOrdAllocated: PXFieldState;
	QtySOShipping: PXFieldState;
	QtyINIssues: PXFieldState;
	QtyINAssemblyDemand: PXFieldState;
	SafetyStock: PXFieldState;
	MinQty: PXFieldState;
	MaxQty: PXFieldState;
	ReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ReplenishmentSourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PreferredVendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PreferredVendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	PreferredVendorName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorClassID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ItemClassID: PXFieldState;
}

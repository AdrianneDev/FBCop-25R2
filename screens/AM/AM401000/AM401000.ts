import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.CriticalMaterialsInq", primaryView: "ProdItemRecs" })
export class AM401000 extends PXScreen {
	// to remove the button from the screen toolbar
	Process: PXActionState;
	ProcessAll: PXActionState;
	Schedule: PXActionState;

	@viewInfo({ containerName: "Selection" })
	ProdItemRecs = createSingle(ProdItemRecs);
	ProdMatlRecs = createCollection(ProdMatlRecs);
	@viewInfo({ containerName: "Create Transfer" })
	TransferOrderFilter = createSingle(TransferOrderFilter);
	@viewInfo({ containerName: "Create Production Order" })
	CreateProductionOrderFilter = createSingle(CreateProductionOrderFilter);
	@viewInfo({ containerName: "Create Purchase Order" })
	CreatePurchaseOrderFilter = createSingle(CreatePurchaseOrderFilter);
}

export class ProdItemRecs extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAll: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAllocated: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class ProdMatlRecs extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	LineID: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	QtyRemaining: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	QtyOnHand: PXFieldState;
	QtyShort: PXFieldState;
	ReplenishmentSource: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	IsStockItem: PXFieldState;
	QtyAvail: PXFieldState;
	QtyHardAvail: PXFieldState;
	QtyProductionSupplyPrepared: PXFieldState;
	QtyProductionSupply: PXFieldState;
	QtyProductionDemandPrepared: PXFieldState;
	QtyProductionDemand: PXFieldState;
	RequiredDate: PXFieldState;
	IsByproduct2: PXFieldState;
	TotalQtyRequired: PXFieldState;
	BatchSize: PXFieldState;
	PreferredVendorID: PXFieldState;
	PreferredVendorID_Vendor_AcctName: PXFieldState;
	@columnConfig({ hideViewLink: true }) ItemClassID: PXFieldState;
	IsAllocated: PXFieldState;
	POCreate: PXFieldState;
	POOrderNbr: PXFieldState;
	ProdCreate: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMOrderType: PXFieldState;
	AMProdOrdID: PXFieldState;
	MaterialType: PXFieldState;
	SubcontractSource: PXFieldState;
	StatusID: PXFieldState;
	QtyOnHandPjct: PXFieldState;
	QtyShortPjct: PXFieldState;
}

export class TransferOrderFilter extends PXView {
	FromSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ToSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	UseFullQty: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CreateProductionOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateLinkedOrders: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	UseFullQty: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CreatePurchaseOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

import {
	PXScreen,
	PXView,
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
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.IntercompanyReturnedGoodsInTransitInq",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class IN402020 extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(IntercompanyGoodsInTransitFilter);

	@viewInfo({ containerName: "Inventory Summary" })
	Results = createCollection(IntercompanyReturnedGoodsInTransitResult);
}

export class IntercompanyGoodsInTransitFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippedBefore: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowItemsWithoutReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchasingCompany: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchasingSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	SellingCompany: PXFieldState<PXFieldOptions.CommitChanges>;
	SellingSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	batchUpdate: true,
	allowUpdate: false,
})
export class IntercompanyReturnedGoodsInTransitResult extends PXView {
	InventoryID: PXFieldState;
	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PurchasingBranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PurchasingSiteID: PXFieldState;

	POReturnNbr: PXFieldState;
	ReturnDate: PXFieldState;
	POReceipt__ReceiptNbr: PXFieldState;
	POReceipt__ReceiptDate: PXFieldState;
	ReturnedQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	ExtCost: PXFieldState;
	DaysInTransit: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SellingBranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SellingSiteID: PXFieldState;

	SOType: PXFieldState;
	SONbr: PXFieldState;
	ShipmentNbr: PXFieldState;
	ShipmentDate: PXFieldState;
	ShipmentStatus: PXFieldState;
}
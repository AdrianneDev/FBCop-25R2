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
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POCreateIntercompanySalesOrder",
	primaryView: "Filter",
})
export class PO504000 extends PXScreen {
	ViewSODocument: PXActionState;
	ViewPOReceipt: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(SOForPurchaseReceiptFilter);

	@viewInfo({ containerName: "Documents" })
	Documents = createCollection(SOShipment);
}

export class SOForPurchaseReceiptFilter extends PXView {
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchasingCompany: PXFieldState<PXFieldOptions.CommitChanges>;
	SellingCompany: PXFieldState<PXFieldOptions.CommitChanges>;
	PutReceiptsOnHold: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class SOShipment extends PXView {
	@columnConfig({ allowSort: false, allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrder__BranchID: PXFieldState;

	@linkCommand("ViewSODocument")
	ShipmentNbr: PXFieldState;

	Status: PXFieldState;
	ShipDate: PXFieldState;
	ShipmentQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	ShipmentDesc: PXFieldState;
	WorkgroupID: PXFieldState;
	ShipmentWeight: PXFieldState;
	ShipmentVolume: PXFieldState;
	PackageCount: PXFieldState;
	PackageWeight: PXFieldState;
	SOOrder__IntercompanyPONbr: PXFieldState;
	Excluded: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOReceipt")
	IntercompanyPOReceiptNbr: PXFieldState;
}

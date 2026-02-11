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
import { Labels } from "../common/localization";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({ graphType: "PX.Objects.AM.VendorShipmentEntry", primaryView: "Document", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM310000 extends PXScreen {
	AddShipLines: PXActionState;
	AddShipLinesClose: PXActionState;

	@viewInfo({ containerName: "Shipment Summary" })
	Document = createSingle(AMVendorShipment);
	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(AMVendorShipLine);
	@viewInfo({ containerName: "Ship-To Contact" })
	ShippingContact = createSingle(Contact);
	@viewInfo({ containerName: "Ship-To Address" })
	ShippingAddress = createSingle(Address);
	@viewInfo({ containerName: "Shipping Information" })
	CurrentDocument = createSingle(AMVendorShipment2);
	@viewInfo({ containerName: "Production Order Lookup" })
	ShipmentProdOrders = createCollection(AMProdOper);
}

export class AMVendorShipment extends PXView {
	ShipmentNbr: PXFieldState;
	ShipmentType: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	ShipmentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipmentQty: PXFieldState<PXFieldOptions.Disabled>;
	ControlQty: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
})
export class AMVendorShipLine extends PXView {
	AMVendorShipmentLineSplittingExtension_ShowSplits: PXActionState;
	Split: PXActionState;
	AddProductionOrders: PXActionState;

	Availability: PXFieldState;
	LineNbr: PXFieldState;
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ nullText: Labels.Split }) SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	MatlLineID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LocationID: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	InventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LotSerialNbr: PXFieldState;
	ExpireDate: PXFieldState;
	InventoryID_description: PXFieldState;
	TranDesc: PXFieldState;
	POOrderNbr: PXFieldState;
	POLineNbr: PXFieldState;
	Released: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AMVendorShipment2 extends PXView {
	ShipVia: PXFieldState<PXFieldOptions.CommitChanges>;
	FOBPoint: PXFieldState;
	ShipTermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	Residential: PXFieldState;
	SaturdayDelivery: PXFieldState;
	Insurance: PXFieldState;
	GroundCollect: PXFieldState;
	CuryFreightCost: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideFreightAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightAmountSource: PXFieldState;
	CuryFreightAmt: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMProdOper extends PXView {
	Selected: PXFieldState;
	AMProdItem__OrderType: PXFieldState;
	AMProdItem__ProdOrdID: PXFieldState;
	OperationCD: PXFieldState;
	AMProdItem__InventoryID: PXFieldState;
	AMProdItem__SubItemID: PXFieldState;
	AMProdItem__SiteID: PXFieldState;
	AMProdItem__UOM: PXFieldState;
	AMProdItem__Descr: PXFieldState;
	QtytoProd: PXFieldState;
	ShippedQuantity: PXFieldState;
	ShipRemainingQty: PXFieldState;
}

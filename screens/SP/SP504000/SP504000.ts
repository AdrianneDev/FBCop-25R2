import {
	createCollection, createSingle, graphInfo, localizable, viewInfo, GridNoteFilesShowMode, PXActionState
} from "client-controls";
import {
	BillingAddressView, BillingContactView, PackageDetailView, ShippingAddressView, ShippingContactView,
	AddressView, SOAdjustmentView, SOLineView, SOOrderHeader, SOOrderShipmentView
} from "./view-models";
import { PortalScreen } from "../sp-base";

@localizable
export class Messages {
	static ShippingInformation = "Shipping Information";
	static OrderInformation = "Order Information";
	static PaymentMethod = "Payment Method";
	static Item = "Item";
	static Price = "Price";
	static Qty = "Qty.";
	static Quantity = "Quantity";
	static Discount = "Discount";
	static Total = "Total Price";
	static Amount = "Amount";
	static ShippedQty = "Shipped Qty.";
	static Packages = "Packages";
	static Processed = "Processed";
	static InProcess = "In Process";
	static Voided = "Voided";
	static Payments = "Payments";
	static Shipments = "Shipments";
}

@graphInfo({ graphType: "PX.Objects.Portals.SPOrderMaint", primaryView: "Document" })
export class SP504000 extends PortalScreen {

	msg = Messages;
	@viewInfo({containerName: "Order Summary"})
	Document = createSingle(SOOrderHeader);
	ShippingAddressSection = createSingle(ShippingAddressView);
	BillingAddressSection = createSingle(BillingAddressView);
	Shipping_Address = createSingle(AddressView);
	Billing_Address = createSingle(AddressView);
	ShippingContact = createSingle(ShippingContactView);
	BillingContact = createSingle(BillingContactView);

	PrintShipment: PXActionState;
	ViewPayment: PXActionState;
	ViewPackages: PXActionState;
	ViewInventoryItem: PXActionState;

	OrderedItems = createCollection(SOLineView);

	Adjustments = createCollection(SOAdjustmentView);

	ShipmentList = createCollection(SOOrderShipmentView);

	Packages = createCollection(PackageDetailView);
}

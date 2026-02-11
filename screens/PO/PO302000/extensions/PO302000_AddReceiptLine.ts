import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { PO302000 } from "../PO302000";

export interface PO302000_AddReceiptLine extends PO302000 { }
export class PO302000_AddReceiptLine {
	AddPOReceiptLine2: PXActionState;
	SetAddLineFilterToSource: PXActionState;

	@viewInfo({ containerName: "Add Receipt Line" })
	addReceipt = createSingle(POReceiptLineS);
}

export class POReceiptLineS extends PXView {
	BarCode: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState;
	ReceiptQty: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState;
	POType: PXFieldState<PXFieldOptions.CommitChanges>;
	PONbr: PXFieldState<PXFieldOptions.Disabled>;
	POLineNbr: PXFieldState<PXFieldOptions.Disabled>;
	ShipFromSiteID: PXFieldState<PXFieldOptions.Disabled>;
	SOOrderType: PXFieldState<PXFieldOptions.Disabled>;
	SOOrderNbr: PXFieldState<PXFieldOptions.Disabled>;
	SOOrderLineNbr: PXFieldState<PXFieldOptions.Disabled>;
	SOShipmentNbr: PXFieldState<PXFieldOptions.Disabled>;
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ByOne: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoAddLine: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
}

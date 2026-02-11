import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { PO301000 } from "../PO301000";

export interface PO301000_AddPurchaseOrder extends PO301000 { }
export class PO301000_AddPurchaseOrder {
	@viewInfo({ containerName: "Add Purchase Order" })
	openOrders = createCollection(POOrderS);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POOrderS extends PXView {
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrderNbr: PXFieldState;

	OrderDate: PXFieldState;
	ExpirationDate: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	CuryOrderTotal: PXFieldState;

	VendorRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TermsID: PXFieldState;

	OrderDesc: PXFieldState;

	@columnConfig({ allowUpdate: false })
	OpenOrderQty: PXFieldState;

	@columnConfig({ allowUpdate: false })
	CuryLeftToReceiveCost: PXFieldState;
}
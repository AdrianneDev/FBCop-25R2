import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { PO302000 } from "../PO302000";

export interface PO302000_AddPurchaseOrder extends PO302000 { }
export class PO302000_AddPurchaseOrder {
	AddPOOrder2: PXActionState;

	@viewInfo({ containerName: "Add Purchase Order" })
	openOrders = createCollection(POOrder);

	// the filter view is located in the AddFilters extension, since it is shared
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POOrder extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	OrderType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrderNbr: PXFieldState;

	OrderDate: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrderTotal: PXFieldState;
	VendorRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TermsID: PXFieldState;

	OrderDesc: PXFieldState;
	ReceivedQty: PXFieldState;
	LeftToReceiveQty: PXFieldState;
}
import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { PO303000 } from "../PO303000";

export interface PO303000_AddFilters extends PO303000 { }
export class PO303000_AddFilters { // this view is used by several other AddXXX extensions
	@viewInfo({ containerName: "PO Selection" })
	filter = createSingle(POReceiptFilter);
}

export class POReceiptFilter extends PXView {
	ReceiptType: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceiptNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}
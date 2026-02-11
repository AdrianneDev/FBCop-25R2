import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { PO302000 } from "../PO302000";

export interface PO302000_AddFilters extends PO302000 { }
export class PO302000_AddFilters { // these views are used by several other AddXXX extensions
	@viewInfo({ containerName: "PO Selection" })
	filter = createSingle(POOrderFilter);

	@viewInfo({ containerName: "PO Receipt Selection" })
	returnFilter = createSingle(POReceiptReturnFilter);
}

export class POOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipFromSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class POReceiptReturnFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceiptNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}
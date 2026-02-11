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

export interface PO302000_AddPurchaseLine extends PO302000 { }
export class PO302000_AddPurchaseLine {
	AddPOOrderLine2: PXActionState;

	@viewInfo({ containerName: "Add Purchase Order Line" })
	poLinesSelection = createCollection(POLine);

	// the filter view is located in the AddFilters extension, since it is shared
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POLine extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	OrderNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	LineType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	OrderQty: PXFieldState;
	ReceivedQty: PXFieldState;
	LeftToReceiveQty: PXFieldState;
	TranDesc: PXFieldState;
	PromisedDate: PXFieldState;
	RcptQtyMin: PXFieldState;
	RcptQtyMax: PXFieldState;
	RcptQtyAction: PXFieldState;
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
}
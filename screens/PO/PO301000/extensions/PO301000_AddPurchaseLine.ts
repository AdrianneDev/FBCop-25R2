import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { PO301000 } from "../PO301000";

export interface PO301000_AddPurchaseLine extends PO301000 { }
export class PO301000_AddPurchaseLine {
	@viewInfo({ containerName: "PO Selection" })
	filter = createSingle(POOrderFilter);

	@viewInfo({ containerName: "Add Purchase Order Line" })
	poLinesSelection = createCollection(POLineS);
}

export class POOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POLineS extends PXView {
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	LineType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	OrderQty: PXFieldState;
	OpenQty: PXFieldState;
	TranDesc: PXFieldState;
	RcptQtyMin: PXFieldState;
	RcptQtyMax: PXFieldState;
	RcptQtyAction: PXFieldState;
}
import {
	PXView,
	PXActionState,
	PXFieldState,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { SO303000 } from "../SO303000";

export interface SO303000_AddSalesLine extends SO303000 { }
export class SO303000_AddSalesLine {
	AddSOLine: PXActionState;

	@viewInfo({ containerName: "Add SO Line" })
	soLineList = createCollection(SOLineForDirectInvoice);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	batchUpdate: true,
})
export class SOLineForDirectInvoice extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState;

	OrderNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	Operation: PXFieldState;
	ShipDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	OrderQty: PXFieldState;
	ShippedQty: PXFieldState;
}

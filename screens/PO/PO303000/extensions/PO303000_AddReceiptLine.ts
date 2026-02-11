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
import { PO303000 } from "../PO303000";

export interface PO303000_AddReceiptLine extends PO303000 { }
export class PO303000_AddReceiptLine {
	AddPOReceiptLine2: PXActionState;

	@viewInfo({ containerName: "Add Receipt Line" })
	poReceiptLinesSelection = createCollection(POReceiptLineAdd);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POReceiptLineAdd extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	PONbr: PXFieldState;
	POType: PXFieldState;
	ReceiptNbr: PXFieldState;
	InvoiceNbr: PXFieldState;
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	ReceiptQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	TranCostFinal: PXFieldState;
}
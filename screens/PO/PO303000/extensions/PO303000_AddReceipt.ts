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

export interface PO303000_AddReceipt extends PO303000 { }
export class PO303000_AddReceipt {
	AddPOReceipt2: PXActionState;

	@viewInfo({ containerName: "Add Receipt" })
	poReceiptSelection = createCollection(POReceipt);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POReceipt extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	ReceiptType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReceiptNbr: PXFieldState;

	InvoiceNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	ReceiptDate: PXFieldState;
	OrderQty: PXFieldState;
}
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

export interface PO302000_AddReturnReceipt extends PO302000 { }
export class PO302000_AddReturnReceipt {
	AddPOReceiptReturn2: PXActionState;

	@viewInfo({ containerName: "Add Receipt" })
	poReceiptReturn = createCollection(POReceiptReturn);

	// the returnFilter view is located in the AddFilters extension, since it is shared
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POReceiptReturn extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ReceiptNbr: PXFieldState;

	ReceiptType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	ReceiptDate: PXFieldState;
	OrderQty: PXFieldState;
}
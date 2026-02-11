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

export interface PO302000_AddReturnLine extends PO302000 { }
export class PO302000_AddReturnLine {
	AddPOReceiptLineReturn2: PXActionState;

	@viewInfo({ containerName: "Add Receipt Line" })
	poReceiptLineReturn = createCollection(POReceiptLineReturn);

	// the returnFilter view is located in the AddFilters extension, since it is shared
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class POReceiptLineReturn extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PONbr: PXFieldState;

	POType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReceiptNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	InvoiceNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	ReceiptQty: PXFieldState;
	ReturnedQty: PXFieldState;
}
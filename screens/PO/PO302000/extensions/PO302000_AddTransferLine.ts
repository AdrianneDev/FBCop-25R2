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

export interface PO302000_AddTransferLine extends PO302000 { }
export class PO302000_AddTransferLine {
	AddINTran: PXActionState;
	AddINTran2: PXActionState;

	@viewInfo({ containerName: "Add Transfer Line" })
	intranSelection = createCollection(INTran);

	// the filter view is located in the AddFilters extension, since it is shared
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class INTran extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	Qty: PXFieldState;
	TranDesc: PXFieldState;
	LineNbr: PXFieldState;
}
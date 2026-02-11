import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset,
} from "client-controls";
import { SO303000 } from "../SO303000";

export interface SO303000_AddReturnLine extends SO303000 { }
export class SO303000_AddReturnLine {
	AddARTran: PXActionState;

	@viewInfo({ containerName: "Add Return Line" })
	arTranList = createCollection(ARTranForDirectInvoice);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	batchUpdate: true,
	autoAdjustColumns: true,
})
export class ARTranForDirectInvoice extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	TranType: PXFieldState;
	RefNbr: PXFieldState;
	LineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	Qty: PXFieldState;

	@linkCommand("ARTran$RelatedDocument$Link")
	RelatedDocument: PXFieldState<PXFieldOptions.Hidden>;
}
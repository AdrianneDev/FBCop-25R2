import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { SO302000 } from "../SO302000";

export interface SO302000_AddSalesOrder extends SO302000 { }
export class SO302000_AddSalesOrder {
	AddSO: PXActionState;
	AddSOCancel: PXActionState;

	@viewInfo({ containerName: "Add Order Header" })
	addsofilter = createSingle(addsofilter);

	@viewInfo({ containerName: "Add Orders" })
	soshipmentplan = createCollection(soshipmentplan);
}

export class addsofilter extends PXView {
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
})
export class soshipmentplan extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	SOLine__LineNbr: PXFieldState;
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOLineSplit__SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOLineSplit__UOM: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOLineSplit__LotSerialNbr: PXFieldState;

	PlanDate: PXFieldState;
	SOLineSplit__Qty: PXFieldState;
	SOLine__TranDesc: PXFieldState;
}
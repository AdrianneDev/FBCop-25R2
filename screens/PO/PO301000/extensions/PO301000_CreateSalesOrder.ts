import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { PO301000 } from "../PO301000";

export interface PO301000_CreateSalesOrder extends PO301000 { }
export class PO301000_CreateSalesOrder {
	@viewInfo({ containerName: "Create Sales Order" })
	createSOFilter = createSingle(CreateSOOrderFilter);
}

export class CreateSOOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}
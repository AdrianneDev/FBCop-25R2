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
import { RQ301000 } from "../RQ301000";

export interface RQ301000_RequisitionDetails extends RQ301000 { }
export class RQ301000_RequisitionDetails {
	@viewInfo({ containerName: "Requisition Details" })
	Contents = createCollection(RQRequisitionContent);
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
})
export class RQRequisitionContent extends PXView {
	viewRequisition: PXActionState;

	RQRequisition__ReqNbr: PXFieldState;
	RQRequisition__Priority: PXFieldState;
	RQRequisition__OrderDate: PXFieldState;
	RQRequisition__Status: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	RQRequisitionLineReceived__InventoryID: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	RQRequisitionLineReceived__UOM: PXFieldState;

	@columnConfig({ allowUpdate: false })
	RQRequisitionLineReceived__Description: PXFieldState;

	ItemQty: PXFieldState;
	RQRequisitionLineReceived__OrderQty: PXFieldState;
	RQRequisitionLineReceived__POOrderQty: PXFieldState;
	RQRequisitionLineReceived__POReceivedQty: PXFieldState;
}
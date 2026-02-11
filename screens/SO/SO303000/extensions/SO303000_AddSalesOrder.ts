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

export interface SO303000_AddSalesOrder extends SO303000 { }
export class SO303000_AddSalesOrder {
	AddShipment: PXActionState;
	AddShipmentCancel: PXActionState;

	@viewInfo({ containerName: "Add Order" })
	shipmentlist = createCollection(SOOrderShipment);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	batchUpdate: true,
})
export class SOOrderShipment extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState;

	OrderNbr: PXFieldState;
	ShipmentNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState;

	ShipDate: PXFieldState;
	ShipmentQty: PXFieldState;
}

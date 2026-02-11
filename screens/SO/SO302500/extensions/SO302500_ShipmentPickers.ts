import {
	PXView,
	PXFieldState,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { SO302500 } from "../SO302500";

export interface SO302500_ShipmentPickers extends SO302500 { }
export class SO302500_ShipmentPickers {
	@viewInfo({ containerName: "Shipment Pickers" })
	shipmentPickers = createCollection(ShipmentPickers);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false,
})
export class ShipmentPickers extends PXView {
	Confirmed: PXFieldState;
	PickerNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UserID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CartID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SortingLocationID: PXFieldState;
}
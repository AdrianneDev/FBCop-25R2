import {
	PXView,
	PXFieldState,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridPagerMode,
} from "client-controls";
import { SO302500 } from "../SO302500";

export interface SO302500_PickerShipments extends SO302500 { }
export class SO302500_PickerShipments {
	@viewInfo({ containerName: "Picker Shipments" })
	pickerShipments = createCollection(PickerShipments);

	@viewInfo({ containerName: "Pick List Entries by Shipment" })
	pickerListByShipment = createCollection(PickListEntriesByShipment);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	autoRepaint: ["pickerListByShipment"],
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class PickerShipments extends PXView {
	ShipmentNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false
})
export class PickListEntriesByShipment extends PXView {
	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState;

	Qty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	ExpireDate: PXFieldState;
	PickedQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ToteID: PXFieldState;
}
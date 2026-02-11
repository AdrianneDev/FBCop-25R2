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

export interface SO302500_PickList extends SO302500 { }
export class SO302500_PickList {
	@viewInfo({ containerName: "Pick List Entries" })
	pickerList = createCollection(PickListEntries);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false
})
export class PickListEntries extends PXView {
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
}
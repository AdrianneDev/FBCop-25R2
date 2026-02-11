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

export interface SO302500_LineDetails extends SO302500 { }
export class SO302500_LineDetails {
	@viewInfo({ containerName: "Line Details" })
	worksheetLineSplits = createCollection(LineSplits);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
})
export class LineSplits extends PXView {
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState;

	PickedQty: PXFieldState;
	Qty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	ExpireDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SortingLocationID: PXFieldState;
}
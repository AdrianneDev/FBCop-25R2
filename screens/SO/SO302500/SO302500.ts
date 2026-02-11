import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	headerDescription,
	GridPreset
} from "client-controls";
import { LSNullText } from "../../IN/common/line-splitting/views";

@graphInfo({
	graphType: "PX.Objects.SO.SOPickingWorksheetReview",
	primaryView: "worksheet",
	showUDFIndicator: true,
})
export class SO302500 extends PXScreen {
	@viewInfo({ containerName: "Picking Worksheet Summary" })
	worksheet = createSingle(SOPickingWorksheetHeader);

	@viewInfo({ containerName: "Details" })
	worksheetLines = createCollection(Lines);

	@viewInfo({ containerName: "Shipments" })
	shipmentLinks = createCollection(ShipmentLinks);

	@viewInfo({ containerName: "Pickers" })
	pickers = createCollection(Pickers);
}

export class SOPickingWorksheetHeader extends PXView {
	WorksheetNbr: PXFieldState;
	WorksheetType: PXFieldState;
	Status: PXFieldState;
	PickDate: PXFieldState;

	@headerDescription
	SiteID: PXFieldState;

	PickStartDate: PXFieldState;
	PickCompleteDate: PXFieldState;

	Qty: PXFieldState;
	ShipmentWeight: PXFieldState;
	ShipmentVolume: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false,
})
export class Lines extends PXView {
	ShowSplits: PXActionState;

	WorksheetNbr: PXFieldState;
	LineNbr: PXFieldState;
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LocationID: PXFieldState;

	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState;

	ExpireDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	Qty: PXFieldState;
	OrigOrderQty: PXFieldState;
	OpenOrderQty: PXFieldState;
	PickedQty: PXFieldState;
	TranDesc: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false,
})
export class ShipmentLinks extends PXView {
	ShowPickers: PXActionState;

	Picked: PXFieldState;
	ShipmentNbr: PXFieldState;
	PickedQty: PXFieldState;
	ShipmentQty: PXFieldState;
	ShipmentWeight: PXFieldState;
	ShipmentVolume: PXFieldState;
	Status: PXFieldState;
	Unlinked: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false
})
export class Pickers extends PXView {
	ShowShipments: PXActionState;
	ShowPickList: PXActionState;

	Confirmed: PXFieldState;
	PickerNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UserID: PXFieldState;

	PathLength: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CartID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SortingLocationID: PXFieldState;
}
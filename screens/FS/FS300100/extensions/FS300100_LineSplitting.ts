import {
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	linkCommand,
	placeBeforeProperty,
} from "client-controls";

import { FS300100 } from "../FS300100";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface FS300100_LineSplitting extends FS300100, LineSplittingBase { }
export class FS300100_LineSplitting extends LineSplittingBase {
	FSServiceOrderLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	FSServiceOrderLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	Splits = createCollection(LineSplittingDetails);
}

export interface FS300100_LineSplittingDetails extends LineSplittingDetails { }
export class FS300100_LineSplittingDetails {
	@placeBeforeProperty("InventoryID")
	SplitLineNbr: PXFieldState;

	@placeBeforeProperty("InventoryID")
	ParentSplitLineNbr: PXFieldState;


	@placeBeforeProperty("LocationID")
	ShipDate: PXFieldState;

	@placeBeforeProperty("LocationID")
	IsAllocated: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeBeforeProperty("LocationID")
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeBeforeProperty("LocationID")
	Completed: PXFieldState;


	@placeBeforeProperty("UOM")
	ShippedQty: PXFieldState;

	@placeBeforeProperty("UOM")
	ReceivedQty: PXFieldState;


	POCreate: PXFieldState;

	@linkCommand("FSSODetSplit$RefNoteID$Link")
	RefNoteID: PXFieldState;
}
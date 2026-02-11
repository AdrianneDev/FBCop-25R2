import {
	PXActionState,
	PXFieldState,

	createSingle,
	createCollection,

	viewInfo,
	linkCommand,
} from "client-controls";

import { FS300200 } from "../FS300200";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface FS300200_LineSplitting extends FS300200, LineSplittingBase { }
export class FS300200_LineSplitting extends LineSplittingBase {
	FSAppointmentLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	FSAppointmentLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	Splits = createCollection(LineSplittingDetails);
}

export interface FS300200_LineSplittingDetails extends LineSplittingDetails { }
export class FS300200_LineSplittingDetails {
	SiteID: PXFieldState;

	@linkCommand("FSApptLineSplit$RefNoteID$Link")
	RefNoteID: PXFieldState;

	InventoryID_InventoryItem_descr: PXFieldState;
}
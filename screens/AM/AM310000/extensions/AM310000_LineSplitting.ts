import {
	PXActionState,
	PXFieldState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";

import { AM310000 } from "../AM310000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM310000_LineSplitting extends AM310000, LineSplittingBase { }
export class AM310000_LineSplitting extends LineSplittingBase {
	AMVendorShipmentLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	AMVendorShipmentLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	Splits = createCollection(AMVendorShipLineSplit);
}

export class AMVendorShipLineSplit extends LineSplittingDetails {
	InventoryID_InventoryItem_descr: PXFieldState;
}
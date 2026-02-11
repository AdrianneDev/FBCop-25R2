import {
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";
import { SO302000 } from "../SO302000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface SO302000_LineSplitting extends SO302000, LineSplittingBase { }
export class SO302000_LineSplitting extends LineSplittingBase {
	SOShipmentLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	SOShipmentLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(SOShipLineSplit);
}

export class SOShipLineSplit extends LineSplittingDetails {
	PickedQty: PXFieldState;
	PackedQty: PXFieldState;
	InventoryID_InventoryItem_descr: PXFieldState<PXFieldOptions.Disabled>;
}
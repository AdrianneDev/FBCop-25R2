import {
	PXActionState,
	PXFieldState,

	createCollection,
	createSingle,

	viewInfo,
	gridConfig,
	GridPreset,
	placeAfterProperty,
} from "client-controls";

import { AM302000 } from "../AM302000";
import { SplitLotSerialAttributesBase } from "../../../IN/common/line-splitting/panel-split-lot-serial-attributes/panel-split-lot-serial-attributes";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM302000_LineSplitting extends AM302000, SplitLotSerialAttributesBase { }
export class AM302000_LineSplitting extends SplitLotSerialAttributesBase {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(AMMTranSplit);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoAdjustColumns: true,
	autoRepaint: ["lotSerialAttributes"],
})
export class AMMTranSplit extends LineSplittingDetails {
	UseAttributesFromFirstLine: PXActionState;

	@placeAfterProperty("LotSerialNbr")
	MfgLotSerialNbr: PXFieldState;
}

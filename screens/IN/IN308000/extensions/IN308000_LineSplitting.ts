import {
	PXActionState,
	PXFieldState,
	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	GridPreset,
	placeAfterProperty,
} from "client-controls";
import { IN308000 } from "../IN308000";
import { SplitLotSerialAttributesBase } from "../../../IN/common/line-splitting/panel-split-lot-serial-attributes/panel-split-lot-serial-attributes";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface IN308000_LineSplitting extends IN308000, SplitLotSerialAttributesBase { }
export class IN308000_LineSplitting extends SplitLotSerialAttributesBase {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(INTranSplit);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoAdjustColumns: true,
	autoRepaint: ["lotSerialAttributes"],
})
export class INTranSplit extends LineSplittingDetails {
	UseAttributesFromFirstLine: PXActionState;

	@placeAfterProperty("LotSerialNbr")
	MfgLotSerialNbr: PXFieldState;
}

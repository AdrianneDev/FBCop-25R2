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
import { IN301000 } from "../IN301000";
import { SplitLotSerialAttributesBase } from "../../common/line-splitting/panel-split-lot-serial-attributes/panel-split-lot-serial-attributes";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface IN301000_LineSplitting extends IN301000, SplitLotSerialAttributesBase { }
export class IN301000_LineSplitting extends SplitLotSerialAttributesBase {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(INTranSplit);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoRepaint: ["lotSerialAttributes"],
})
export class INTranSplit extends LineSplittingDetails {
	UseAttributesFromFirstLine: PXActionState; //Use Attributes From First Line button on Line Details Panel

	@placeAfterProperty("LotSerialNbr")
	MfgLotSerialNbr: PXFieldState;
}

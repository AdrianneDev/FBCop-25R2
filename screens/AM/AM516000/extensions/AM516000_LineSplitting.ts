import {
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";

import { AM516000 } from "../AM516000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM516000_LineSplitting extends AM516000, LineSplittingBase { }
export class AM516000_LineSplitting extends LineSplittingBase {
	AMClockTranLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	AMClockTranLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(splits);
}

export class splits extends LineSplittingDetails { }
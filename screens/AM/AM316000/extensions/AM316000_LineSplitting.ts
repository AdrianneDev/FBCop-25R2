import {
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";

import { AM316000 } from "../AM316000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM316000_LineSplitting extends AM316000, LineSplittingBase { }
export class AM316000_LineSplitting extends LineSplittingBase {
	AMClockTranLineSplittingMultipleProductionExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	AMClockTranLineSplittingMultipleProductionExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	Splits = createCollection(AMClockTranSplit);
}

export class AMClockTranSplit extends LineSplittingDetails { }
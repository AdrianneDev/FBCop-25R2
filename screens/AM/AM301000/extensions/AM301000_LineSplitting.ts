import {
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";

import { AM301000 } from "../AM301000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM301000_LineSplitting extends AM301000, LineSplittingBase { }
export class AM301000_LineSplitting extends LineSplittingBase {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(AMMTranSplit);
}

export class AMMTranSplit extends LineSplittingDetails { }
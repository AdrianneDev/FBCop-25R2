import {
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";
import { IN302000 } from "../IN302000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface IN302000_LineSplitting extends IN302000, LineSplittingBase { }
export class IN302000_LineSplitting extends LineSplittingBase {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(INTranSplit);
}

export class INTranSplit extends LineSplittingDetails { }
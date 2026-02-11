import {
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";

import { IN307000 } from "../IN307000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface IN307000_LineSplittingPanel extends IN307000, LineSplittingBase { }
export class IN307000_LineSplittingPanel extends LineSplittingBase {
	INComponentLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Component Details Header" })
	INComponentLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Component Splits" })
	ComponentSplits = createCollection(INComponentTranSplit);
}

export class INComponentTranSplit extends LineSplittingDetails { }

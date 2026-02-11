import {
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";

import { AM301500 } from "../AM301500";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM301500_LineSplittingPanel extends AM301500, LineSplittingBase { }
export class AM301500_LineSplittingPanel extends LineSplittingBase {
	AMDisassembleMaterialTranLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	AMDisassembleMaterialTranLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	MaterialSplits = createCollection(AMDisassembleTranSplit);
}

export class AMDisassembleTranSplit extends LineSplittingDetails { }
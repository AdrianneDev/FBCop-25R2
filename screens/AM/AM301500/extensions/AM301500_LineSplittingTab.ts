import {
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
} from "client-controls";

import { AM301500 } from "../AM301500";
import { LineSplittingTabBase } from "../../../IN/common/line-splitting/tab-line-splitting/tab-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM301500_LineSplittingTab extends AM301500, LineSplittingTabBase { }
export class AM301500_LineSplittingTab extends LineSplittingTabBase {
	AMDisassembleMasterTranLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	AMDisassembleMasterTranLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	MasterSplits = createCollection(AMDisassembleBatchSplit);
}

export class AMDisassembleBatchSplit extends LineSplittingDetails { }
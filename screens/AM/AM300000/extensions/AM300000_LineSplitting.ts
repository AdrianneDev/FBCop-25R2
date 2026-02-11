import {
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	columnConfig,
} from "client-controls";

import { AM300000 } from "../AM300000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM300000_LineSplitting extends AM300000, LineSplittingBase { }
export class AM300000_LineSplitting extends LineSplittingBase {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(AMMTranSplit);
}

export class AMMTranSplit extends LineSplittingDetails {
	@columnConfig({ hideViewLink: true })
	ParentLotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}
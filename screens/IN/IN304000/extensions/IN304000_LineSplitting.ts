import {
	PXFieldState,
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
	columnConfig,
	GridColumnShowHideMode,
} from "client-controls";
import { IN304000 } from "../IN304000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface IN304000_LineSplitting extends IN304000, LineSplittingBase { }
export class IN304000_LineSplitting extends LineSplittingBase {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(LineSplittingDetails);
}

export interface IN303000_LineSplittingDetails extends LineSplittingDetails { }
export class IN303000_LineSplittingDetails {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	ExpireDate: PXFieldState;
}

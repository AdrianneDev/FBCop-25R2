import {
	PXFieldState,
	PXActionState,

	createSingle,
	createCollection,

	viewInfo,
	columnConfig,
	GridColumnShowHideMode,
} from "client-controls";

import { IN307000 } from "../IN307000";
import { LineSplittingTabBase } from "../../../IN/common/line-splitting/tab-line-splitting/tab-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface IN307000_LineSplittingTab extends IN307000, LineSplittingTabBase { }
export class IN307000_LineSplittingTab extends LineSplittingTabBase {
	INKitLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Kit Line Details Header" })
	INKitLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Kit Line Details" })
	MasterSplits = createCollection(LineSplittingDetails);
}

export interface IN307000_LineSplittingDetails extends LineSplittingDetails { }
export class IN307000_LineSplittingDetails {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	InventoryID: PXFieldState;
}

import {
	PXActionState,
	PXFieldState,

	createSingle,
	createCollection,

	viewInfo,
	columnConfig,
	GridColumnShowHideMode,
	placeBeforeProperty,
} from "client-controls";

import { AM201500 } from "../AM201500";
import { LineSplittingTabBase } from "../../../IN/common/line-splitting/tab-line-splitting/tab-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM201500_LineSplittingTab extends AM201500, LineSplittingTabBase { }
export class AM201500_LineSplittingTab extends LineSplittingTabBase {
	ItemLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	ItemLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(LineSplittingDetails);
}

export interface AM201500_LineSplittingDetails extends LineSplittingDetails { }
export class AM201500_LineSplittingDetails {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	InventoryID: PXFieldState;

	@placeBeforeProperty("ExpireDate")
	QtyComplete: PXFieldState;

	@placeBeforeProperty("ExpireDate")
	QtyScrapped: PXFieldState;

	@placeBeforeProperty("ExpireDate")
	QtyRemaining: PXFieldState;
}

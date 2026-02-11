import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	gridConfig,
	columnConfig,
	GridPreset,

	createCollection,
	viewInfo,
} from "client-controls";
import { LineSplittingBase } from "../panel-line-splitting/panel-line-splitting";

export abstract class SplitLotSerialAttributesBase extends LineSplittingBase {
	@viewInfo({ containerName: "Lot/Serial Attributes" })
	lotSerialAttributes = createCollection(LotSerialAttribute);
}

@gridConfig({
	preset: GridPreset.ShortList,
	syncPosition: true,
})
export class LotSerialAttribute extends PXView {
	@columnConfig({ hideViewLink: true })
	AttributeID: PXFieldState<PXFieldOptions.Disabled>;

	Required: PXFieldState<PXFieldOptions.Disabled>;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}

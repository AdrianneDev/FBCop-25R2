import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createCollection,
	viewInfo,
	gridConfig,
	GridPreset,
	columnConfig
} from "client-controls";
import { IN202500 } from "../IN202500";

export interface IN202500_Subitems extends IN202500 { }
export class IN202500_Subitems {
	@viewInfo({ containerName: "Subitem Segment 1" })
	SubItem_1 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 2" })
	SubItem_2 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 3" })
	SubItem_3 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 4" })
	SubItem_4 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 5" })
	SubItem_5 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 6" })
	SubItem_6 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 7" })
	SubItem_7 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 8" })
	SubItem_8 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 9" })
	SubItem_9 = createCollection(SubitemSegment);

	@viewInfo({ containerName: "Subitem Segment 10" })
	SubItem_10 = createCollection(SubitemSegment);
}

@gridConfig({
	preset: GridPreset.Details,
})
export class SubitemSegment extends PXView {
	@columnConfig({ allowCheckAll: true })
	Active: PXFieldState<PXFieldOptions.CommitChanges>;

	Value: PXFieldState;
	Descr: PXFieldState;
}


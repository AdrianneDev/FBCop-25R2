import {
	createSingle,
	createCollection,
	viewInfo,
	gridConfig,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset,
	GridFilterBarVisibility,
	GridPagerMode,
	columnConfig,
	GridAutoGrowMode,
} from "client-controls";

export abstract class MergeEntitiesBase {
	@viewInfo({ containerName: "Dialog: Merge Conflicts (Summary)" })
	Merge_Filter = createSingle(MergeEntitiesFilter);

	@viewInfo({ containerName: "Dialog: Merge Conflicts" })
	Merge_VisibleComparisonRows = createCollection(MergeComparisonRow);
}

export class MergeEntitiesFilter extends PXView {
	TargetRecord: PXFieldState<PXFieldOptions.CommitChanges>;
	Caption: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	showFilterBar: GridFilterBarVisibility.False,
	fastFilterByAllFields: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoAdjustColumns: true,
	showTopBar: false,
	repaintColumns: true
})
export class MergeComparisonRow extends PXView {
	@columnConfig({ allowUpdate: false })
	FieldDisplayName: PXFieldState;
	@columnConfig({ allowCheckAll: true, width: 35 })
	LeftValueSelected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false, fullState: true, allowFilter: false, allowSort: false })
	LeftValue: PXFieldState;
	@columnConfig({ allowCheckAll: true, width: 35 })
	RightValueSelected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false, fullState: true, allowFilter: false, allowSort: false})
	RightValue: PXFieldState;
}

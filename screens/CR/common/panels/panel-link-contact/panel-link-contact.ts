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

export abstract class LinkContactBase {
	@viewInfo({ containerName: "Dialog: Associate Contact with Lead (Summary)" })
	Link_Filter = createSingle(EntityForLinkFilter);

	@viewInfo({ containerName: "Dialog: Associate Contact with Lead" })
	Link_VisibleComparisonRows = createCollection(EntityForLink);
}

export class EntityForLinkFilter extends PXView {
	Caption: PXFieldState;
	ProcessLink: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showFilterBar: GridFilterBarVisibility.False,
	fastFilterByAllFields: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pagerMode: GridPagerMode.InfiniteScroll,
	showTopBar: false,
	autoAdjustColumns: true,
	repaintColumns: true,
})
export class EntityForLink extends PXView {
	@columnConfig({ allowUpdate: false })
	FieldDisplayName: PXFieldState;
	@columnConfig({ allowCheckAll: true, width: 35 })
	LeftValueSelected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false, fullState: true, allowFilter: false, allowSort: false })
	LeftValue: PXFieldState;
	@columnConfig({ allowCheckAll: true, width: 35 })
	RightValueSelected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false, fullState: true, allowFilter: false, allowSort: false })
	RightValue: PXFieldState;
}

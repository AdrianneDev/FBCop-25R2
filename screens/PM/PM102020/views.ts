import {
	columnConfig,
	gridConfig,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPagerMode,
	GridFastFilterVisibility,
} from "client-controls";

export class ProjectGroup extends PXView {
	ProjectGroupID: PXFieldState;
	Description: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	showFastFilter: GridFastFilterVisibility.False,
	fastFilterByAllFields: false,
})
export class Groups extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 35,
	})
	Included: PXFieldState<PXFieldOptions.NoLabel>;
	GroupName: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState<PXFieldOptions.NoLabel>;
	GroupType: PXFieldState<PXFieldOptions.Disabled>;
}

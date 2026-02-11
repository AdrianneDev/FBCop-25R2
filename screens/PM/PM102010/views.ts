import {
	columnConfig,
	gridConfig,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridPagerMode,
	GridFastFilterVisibility,
} from "client-controls";

export class Project extends PXView {
	ContractCD: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled>;
	CustomerID: PXFieldState<PXFieldOptions.Disabled>;
	TemplateID: PXFieldState<PXFieldOptions.Disabled>;
	ProjectGroupID: PXFieldState<PXFieldOptions.Disabled>;
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

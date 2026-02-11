import {
	columnConfig,
	gridConfig,
	GridPagerMode,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
} from "client-controls";

export class AccountGroup extends PXView {
	GroupCD: PXFieldState;
	Description: PXFieldState<PXFieldOptions.Disabled>;
	Type: PXFieldState<PXFieldOptions.Disabled>;
	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	fastFilterByAllFields: false,
})
export class Groups extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35 })
	Included: PXFieldState<PXFieldOptions.NoLabel>;
	GroupName: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState<PXFieldOptions.NoLabel>;
	GroupType: PXFieldState<PXFieldOptions.Disabled>;
}

import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	GridAutoGrowMode,
	GridPagerMode,
	GridNoteFilesShowMode,
} from "client-controls";

@gridConfig({
	preset: GridPreset.Details,
	autoRepaint: ["ProjectTaskSources", "LaborItemSources", "CostCodeRanges"],
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pagerMode: GridPagerMode.InfiniteScroll,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class Items extends PXView {
	IsActive: PXFieldState;
	WorkCodeID: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class ProjectTaskSources extends PXView {
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class LaborItemSources extends PXView {
	@columnConfig({ hideViewLink: true })
	LaborItemID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class CostCodeRanges extends PXView {
	@columnConfig({ hideViewLink: true })
	CostCodeFrom: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeTo: PXFieldState;
}

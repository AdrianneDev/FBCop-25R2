import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnShowHideMode,
	PXFieldState,
	PXView,
	GridPreset,
} from "client-controls";

@gridConfig({
	preset: GridPreset.Processing,
})
export class ProjectIssues extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False,
		width: 35,
	})
	Selected: PXFieldState;
	@linkCommand("ProjectIssues_ViewDetails")
	ProjectIssueCd: PXFieldState;
	Summary: PXFieldState;
	Status: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 100,
	})
	PriorityId: PXFieldState;
	DueDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ClassId: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 150,
	})
	OwnerID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	WorkgroupID: PXFieldState;
	CreationDate: PXFieldState;
}

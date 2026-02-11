import {
	columnConfig,
	GridColumnShowHideMode,
	gridConfig,
	GridPreset,
	linkCommand,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Filter extends PXView {
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
	allowUpdate: false,
	autoRepaint: ["MainPhoto"]
})
export class PhotoLogs extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False,
		width: 35
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("editPhotoLog")
	PhotoLogCd: PXFieldState;
	Description: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 140
	})
	StatusId: PXFieldState;
	Date: PXFieldState;
	@linkCommand("ViewEntity")
	ProjectId: PXFieldState;
	@linkCommand("ViewEntity")
	ProjectTaskId: PXFieldState;
	@columnConfig({
		hideViewLink: true,
	})
	CreatedById: PXFieldState;
	@columnConfig({
		visible: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Photo__FileId: PXFieldState;
}

export class MainPhoto extends PXView {
	ImageUrl: PXFieldState;
}


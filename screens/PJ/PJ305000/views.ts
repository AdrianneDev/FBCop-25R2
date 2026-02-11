import {
	columnConfig,
	gridConfig,
	headerDescription,
	linkCommand,
	GridColumnShowHideMode,
	GridColumnGeneration,
	GridPreset,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	PXView
} from "client-controls";

export class PhotoLog extends PXView {
	PhotoLogCd: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState;
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	StatusId: PXFieldState<PXFieldOptions.CommitChanges>;
	CreatedById: PXFieldState;
	PhotoLogId: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Hidden>;
	@headerDescription
	FormCaptionDescription: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowInsert: false,
	autoRepaint: ["PhotoImage"],
	generateColumns: GridColumnGeneration.Append
})
export class Photos extends PXView {
	@linkCommand("viewPhoto")
	PhotoCd: PXFieldState<PXFieldOptions.CommitChanges>;
	Name: PXFieldState;
	@columnConfig({ width: 100 })
	Description: PXFieldState;
	@columnConfig({
		editorConfig: {
			multiSelect: true,
			valueSeparator: ";"
		},
		width: 200,
		hideViewLink: true
	})
	Tags: PXFieldState<PXFieldOptions.CommitChanges>;
	IsMainPhoto: PXFieldState;
	UploadedDate: PXFieldState;
	@linkCommand("ViewEntity")
	UploadedById: PXFieldState;
	PhotoLogId: PXFieldState<PXFieldOptions.Hidden>;
	ImageUrl: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		visible: false
	})
	FileId: PXFieldState<PXFieldOptions.Hidden>;
}

export class PhotoImage extends PXView {
	ImageUrl: PXFieldState;
}

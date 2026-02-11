import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridNoteFilesShowMode,
    controlConfig
} from "client-controls";

export class ProjectIssue extends PXView {
	Summary: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	ProjectIssueCd: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassId: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNoteIDType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	RefNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ProjectIssue$ConvertedTo$Link")
	ConvertedTo: PXFieldState<PXFieldOptions.Disabled>;
	DueDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PriorityId: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CreationDate_Date: PXFieldState;
	CreationDate_Time: PXFieldState;
	CreatedById: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	ResolvedOn: PXFieldState;
	ProjectIssueTypeId: PXFieldState;
	IsScheduleImpact: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduleImpact: PXFieldState;
	IsCostImpact: PXFieldState<PXFieldOptions.CommitChanges>;
	CostImpact: PXFieldState;
}

export class CurrentProjectIssue extends PXView {
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false,
})
export class Attributes extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		textField: "AttributeID_description",
		hideViewLink: true,
		width: 300,
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({
		allowSort: false,
		allowShowHide: GridColumnShowHideMode.False,
		width: 300,
	})
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	actionsConfig: {
		UnlinkDrawing: { images: { normal: "main@RecordDel" } }
	}
})
export class LinkedDrawingLogs extends PXView {
	UnlinkDrawing: PXActionState;
	AddDrawing: PXActionState;
	ViewAttachments: PXActionState;

	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState;
	@linkCommand("ViewEntity")
	DrawingLogCd: PXFieldState;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState;
	@linkCommand("ViewEntity")
	ProjectId: PXFieldState;
	@linkCommand("ViewEntity")
	ProjectTaskId: PXFieldState;
	Title: PXFieldState;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	DisciplineId: PXFieldState;
	Revision: PXFieldState;
	Sketch: PXFieldState;
	@columnConfig({hideViewLink: true})
	StatusId: PXFieldState;
	DrawingDate: PXFieldState;
	ReceivedDate: PXFieldState;
	@linkCommand("DrawingLog$OriginalDrawingId$Link")
	OriginalDrawingId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
		width: 140})
	OwnerId: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class DrawingLogs extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState;
	@linkCommand("ViewEntity")
	DrawingLogCd: PXFieldState;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState;
	@linkCommand("ViewEntity")
	ProjectId: PXFieldState;
	@linkCommand("ViewEntity")
	ProjectTaskId: PXFieldState;
	Title: PXFieldState;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	DisciplineId: PXFieldState;
	Revision: PXFieldState;
	Sketch: PXFieldState;
	@columnConfig({hideViewLink: true})
	StatusId: PXFieldState;
	DrawingDate: PXFieldState;
	ReceivedDate: PXFieldState;
	@linkCommand("DrawingLog$OriginalDrawingId$Link")
	OriginalDrawingId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	OwnerId: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true
})
export class DrawingLogsAttachments extends PXView {
	@linkCommand("ViewAttachment")
	ShortName: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewEntity")
	DrawingLog__DrawingLogCd: PXFieldState;
	UploadFileRevision__Comment: PXFieldState;
}

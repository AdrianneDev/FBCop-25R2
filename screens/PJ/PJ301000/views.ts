import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnShowHideMode,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridColumnDisplayMode,
	GridPreset,
	controlConfig,
	GridNoteFilesShowMode,
} from "client-controls";

export class RequestForInformation extends PXView {
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	BusinessAccountId: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactId: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassId: PXFieldState<PXFieldOptions.CommitChanges>;
	Summary: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	Incoming: PXFieldState<PXFieldOptions.CommitChanges>;
	IncomingRequestForInformationId: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	Reason: PXFieldState<PXFieldOptions.CommitChanges>;
	PriorityId: PXFieldState<PXFieldOptions.CommitChanges>;
	DocumentationLink: PXFieldState;
	SpecSection: PXFieldState;
	RequestForInformationCd: PXFieldState<PXFieldOptions.CommitChanges>;
	CreationDate: PXFieldState;
	CreatedById: PXFieldState;
	OwnerId: PXFieldState;
	DueResponseDate: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsScheduleImpact: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduleImpact: PXFieldState;
	IsCostImpact: PXFieldState<PXFieldOptions.CommitChanges>;
	CostImpact: PXFieldState;
	DesignChange: PXFieldState;
	@controlConfig({ linkCommand: "RequestForInformation$ConvertedFrom$Link" })
	ConvertedFrom: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({ linkCommand: "RequestForInformation$ConvertedTo$Link" })
	ConvertedTo: PXFieldState<PXFieldOptions.Disabled>;
}

export class CurrentRequestForInformation extends PXView {
	RequestDetails: PXFieldState;
	LastModifiedRequestAnswer: PXFieldState;
	RequestAnswer: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Attributes })
export class Attributes extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({
		allowSort: false,
		allowShowHide: GridColumnShowHideMode.False
	})
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class Relations extends PXView {
	Role: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPrimary: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("Relations_TargetDetails")
	@columnConfig({ width: 200 })
	DocumentNoteId: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("Relations_EntityDetails")
	BusinessAccountId: PXFieldState<PXFieldOptions.CommitChanges>;
	BusinessAccountName: PXFieldState;
	@linkCommand("Relations_ContactDetails")
	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactEmail: PXFieldState;
	AddToCC: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
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
		allowShowHide: GridColumnShowHideMode.False,
		width: 35
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
	@columnConfig({ hideViewLink: true })
	DisciplineId: PXFieldState;
	Revision: PXFieldState;
	Sketch: PXFieldState;
	@columnConfig({ hideViewLink: true })
	StatusId: PXFieldState;
	DrawingDate: PXFieldState;
	ReceivedDate: PXFieldState;
	@linkCommand("DrawingLog$OriginalDrawingId$Link")
	OriginalDrawingId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	OwnerId: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
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
	@columnConfig({ hideViewLink: true })
	DisciplineId: PXFieldState;
	Revision: PXFieldState;
	Sketch: PXFieldState;
	@columnConfig({ hideViewLink: true })
	StatusId: PXFieldState;
	DrawingDate: PXFieldState;
	ReceivedDate: PXFieldState;
	@linkCommand("DrawingLog$OriginalDrawingId$Link")
	OriginalDrawingId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		hideViewLink: true,
		width: 200
	})
	OwnerId: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class DrawingLogsAttachments extends PXView {
	@linkCommand("ViewAttachment")
	@columnConfig({ width: 300 })
	ShortName: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewEntity")
	DrawingLog__DrawingLogCd: PXFieldState;
	UploadFileRevision__Comment: PXFieldState;
}

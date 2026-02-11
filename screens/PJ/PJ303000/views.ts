import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridNoteFilesShowMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class DrawingLog extends PXView {
	DrawingLogCd: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	DisciplineId: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerId: PXFieldState<PXFieldOptions.CommitChanges>;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState<PXFieldOptions.CommitChanges>;
	Revision: PXFieldState<PXFieldOptions.CommitChanges>;
	DrawingDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceivedDate: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusId: PXFieldState<PXFieldOptions.CommitChanges>;
	IsCurrent: PXFieldState<PXFieldOptions.CommitChanges>;
	Title: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	Description: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	Sketch: PXFieldState<PXFieldOptions.CommitChanges>;
	OriginalDrawingId: PXFieldState<PXFieldOptions.Disabled>;
}

export const UploadFilesButtonCssClass: string = "custom-upload-files-toolbar-button";

@gridConfig({
	preset: GridPreset.ReadOnly,
	fastFilterByAllFields: false,
	syncPosition: true,
	topBarItems: {
		UploadFiles: {
			index: 2,
			config: {
				cssClass: UploadFilesButtonCssClass,
				images: { normal: "svg:main@files" }
			}
		}
	},
	wrapToolbar: true
})
export class Drawings extends PXView {
	UploadFiles: PXActionState;

	@linkCommand("ViewAttachment")
	@columnConfig({ width: 400 })
	UploadFile__ShortName: PXFieldState;
	@columnConfig({ width: 200 })
	Comment: PXFieldState;
	@columnConfig({
		editorConfig: {
			multiSelect: true,
			valueSeparator: ";"
		},
		width: 200,
		hideViewLink: true
	})
	Tags: PXFieldState;
	IsDrawingLogCurrentFile: PXFieldState;
	CreatedByID_Creator_Username: PXFieldState;
	CreatedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false
})
export class Attributes extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		width: 300
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		allowSort: false,
		width: 300
	})
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class Revisions extends PXView {
	@linkCommand("ViewEntity")
	DrawingLogCd: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectId: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	ProjectTaskId: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	DisciplineId: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		hideViewLink: true,
		width: 150
	})
	OwnerId: PXFieldState<PXFieldOptions.Hidden>;
	Title: PXFieldState<PXFieldOptions.Hidden>;
	Description: PXFieldState<PXFieldOptions.Hidden>;
	Revision: PXFieldState;
	Sketch: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("DrawingLog$OriginalDrawingId$Link")
	OriginalDrawingId: PXFieldState<PXFieldOptions.Hidden>;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	StatusId: PXFieldState<PXFieldOptions.Hidden>;
	DrawingDate: PXFieldState;
	ReceivedDate: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	fastFilterByAllFields: false
})
export class LinkedDrawingLogRelations extends PXView {
	Link: PXActionState;
	UnLink: PXActionState;

	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState;
	@linkCommand("LinkedDrawingLogRelation$DocumentId$Link")
	DocumentCd: PXFieldState;
	DocumentType: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectId: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskId: PXFieldState;
	Status: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 100
	})
	PriorityId: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ width: 400 })
	Summary: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CreatedById: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		hideViewLink: true,
		width: 150
	})
	OwnerId: PXFieldState<PXFieldOptions.Hidden>;
	DueDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	fastFilterByAllFields: false
})
export class UnlinkedDrawingLogRelations extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState;
	DocumentCd: PXFieldState;
	DocumentType: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectId: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskId: PXFieldState;
	Status: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 100
	})
	PriorityId: PXFieldState<PXFieldOptions.Hidden>;
	Summary: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CreatedById: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		hideViewLink: true,
		width: 150
	})
	OwnerId: PXFieldState<PXFieldOptions.Hidden>;
	DueDate: PXFieldState;
}

import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

// Views

export class SynchronizationFilter extends PXView {
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class UploadFile extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	Name: PXFieldState;
	SourceType: PXFieldState;
	SourceUri: PXFieldState;
	SourceIsFolder: PXFieldState;
	//CreatedDateTime: PXFieldState<PXFieldOptions.Disabled>;
	SourceLastImportDate: PXFieldState;
	LastExportDate: PXFieldState;
	@columnConfig({hideViewLink: true})
	CreatedByID: PXFieldState;
}
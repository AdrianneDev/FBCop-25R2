import {
	gridConfig,
	GridNoteFilesShowMode,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

@gridConfig({
	preset: GridPreset.Primary,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class ProjectGroups extends PXView {
	ProjectGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	IsActive: PXFieldState;
}

import {
	PXView,
	PXFieldState,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode
} from "client-controls";

@gridConfig({
	preset: GridPreset.Primary,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class Items extends PXView {
	IsActive: PXFieldState;
	UnionID: PXFieldState;
	Description: PXFieldState;
}


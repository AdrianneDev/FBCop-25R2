import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode
} from "client-controls";

@gridConfig({
	preset: GridPreset.Primary,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class Items extends PXView {
	@columnConfig({ hideViewLink: true })
	CostCodeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	IsDefault: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
}

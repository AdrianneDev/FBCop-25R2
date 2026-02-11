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
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class Items extends PXView {
	ClassID: PXFieldState;
	Description: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

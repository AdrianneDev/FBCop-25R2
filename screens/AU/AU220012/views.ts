import { PXView, PXFieldState, gridConfig, linkCommand, columnConfig, GridColumnType, GridPreset, GridNoteFilesShowMode } from "client-controls";

// Views

@gridConfig({
	preset: GridPreset.Primary,
	keepPosition: true,
	autoAdjustColumns: false,
	initNewRow: false,
	allowUpdate: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	allowInsert: false
})
export class MobileSiteMapWorkspaces extends PXView {
	@linkCommand("openWorkspace")
	@columnConfig({width: 250})	Name: PXFieldState;
	@columnConfig({width: 108})	DisplayName: PXFieldState;
	@columnConfig({width: 108, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
}

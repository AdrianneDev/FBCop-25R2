import {
	columnConfig,
	gridConfig,
	GridNoteFilesShowMode,
	GridPagerMode,
	GridPreset,
	PXFieldState,
	PXView
} from "client-controls";

export class Group extends PXView {
	GroupName: PXFieldState;
	Description: PXFieldState;
	GroupType: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	showBottomBar: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class Users extends PXView {
	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Username: PXFieldState;
	FullName: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true,
	adjustPageSize: true,
	showBottomBar: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class AccountGroup extends PXView {
	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;
	GroupCD: PXFieldState;
	Description: PXFieldState;
}

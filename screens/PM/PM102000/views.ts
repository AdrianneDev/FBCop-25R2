import {
	columnConfig,
	gridConfig,
	PXFieldState,
	PXFieldOptions,
	PXView,
	GridPreset,
	GridNoteFilesShowMode
} from "client-controls";

export class Group extends PXView {
	GroupName: PXFieldState;
	Description: PXFieldState;
	GroupType: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress
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
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class ProjectGroup extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35 })
	Included: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectGroupID: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class Project extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35 })
	Included: PXFieldState;
	ContractCD: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TemplateID: PXFieldState;
	Status: PXFieldState;
}

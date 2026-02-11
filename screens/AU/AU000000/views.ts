import {
	PXView, PXFieldState, gridConfig, columnConfig, GridColumnType, GridPreset, treeConfig,
	PXFieldOptions, PXActionState, fieldConfig, actionConfig, PXSpecialButtonType
} from "client-controls";

// Views

export class RowFilter extends PXView  {
	ScreenID: PXFieldState;
	ProjectID: PXFieldState;
	ClientID: PXFieldState;
	TableName: PXFieldState;
	FieldName: PXFieldState;
	CodeFile: PXFieldState;
	WorkflowID: PXFieldState;
	InnerScreenNodeID: PXFieldState;
	InnerScreenID: PXFieldState;
	InnerScreenUIType: PXFieldState;
	InnerScreenUrl: PXFieldState;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "NodeID",
	textField: "Title",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	syncPosition: true,
	renderHTML: true,
})
export class SiteMapTree extends PXView  {
	NodeID: PXFieldState;
	Title: PXFieldState;
	SelectedUI: PXFieldState<PXFieldOptions.Hidden>;
	Url: PXFieldState<PXFieldOptions.Hidden>;
	ScreenID: PXFieldState<PXFieldOptions.Hidden>;
	Graphtype: PXFieldState<PXFieldOptions.Hidden>;
	PrimaryView: PXFieldState<PXFieldOptions.Hidden>;
}

export class RowSolutionConfig extends PXView  {
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "FileKey",
				parentIdField: "FileKey",
				valueField: "FilePath",
				dataMember: "FilesTree",
				textField: "FilePath",
				mode: "single",
				hideRootNode: true,
				keySeparatorChar: "!",
			},
			allowEditValue: true
		}
	})
	ParentFolder: PXFieldState;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "FileKey",
				parentIdField: "FileKey",
				valueField: "FilePath",
				dataMember: "FilesTree",
				textField: "FilePath",
				mode: "single",
				hideRootNode: true,
				keySeparatorChar: "!",
			},
			allowEditValue: true
		}
	})
	ContainingFolder: PXFieldState;
	ProjectName: PXFieldState;
}

export class RowFilesTree extends PXView  {
	FileKey: PXFieldState;
	FilePath: PXFieldState;
	FileName: PXFieldState;
}

export class RowValidate extends PXView  {
	Messages: PXFieldState<PXFieldOptions.Multiline>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	showTopBar: false
})
export class RowCheckinFile extends PXView  {
	ActionFileCheckIn: PXActionState;
	ActionRemoveConflicts: PXActionState;

	@columnConfig({type: GridColumnType.CheckBox})	Selected: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox})	Conflict: PXFieldState;
	@columnConfig({width: 400})	Path: PXFieldState;
}

export class RowISVInitials extends PXView {
	@actionConfig({
		specialType: PXSpecialButtonType.SaveNotClose
	})
	ActionISVInitialsSave: PXActionState;
	@actionConfig({
		specialType: PXSpecialButtonType.Save
	})
	ActionISVInitialsSaveClose: PXActionState;
	ActionISVInitialsCancel: PXActionState;
	ActionValidateInitials: PXActionState;

	Initials: PXFieldState;
	Messages: PXFieldState<PXFieldOptions.Multiline>;
}

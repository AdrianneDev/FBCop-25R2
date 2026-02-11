import { PXView, PXFieldState, controlConfig, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnType, PXActionState, TextAlign, GridPreset, GridNoteFilesShowMode, localizable } from "client-controls";

@localizable
export class Tooltips {
	static WorkflowActionField_fieldMoveUp = "Move Up";
	static WorkflowActionField_fieldMoveDown = "Move Down";
	static WorkflowActionSequenceNext_actionSequenceMoveUp = "Move Up";
	static WorkflowActionSequenceNext_actionSequenceMoveDown = "Move Down";
}

@localizable
export class Captions {
	static ActionAddCategory = "Add Category";
}

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

export class SelectedActionSequence extends PXView {
	SelectedTabIndex: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: false,
	allowUpdate: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	actionsConfig: { adjust: { hidden: true }, exportToExcel: { hidden: true }}
})
export class RowWorkflowAction extends PXView  {
	@linkCommand("actionEdit")
	ActionName: PXFieldState;
	DisplayName: PXFieldState;
	ActionType: PXFieldState;
	DisableCondition: PXFieldState;
	HideCondition: PXFieldState;
	Form: PXFieldState;
	MassProcessingScreen: PXFieldState;
	Category: PXFieldState;
	Status: PXFieldState;

	@columnConfig({type: GridColumnType.CheckBox})
	ViewChangesAvailable: PXFieldState;
}

export class RowWorkflowActionEdit extends PXView  {
	ActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	GraphActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState;
	DisableCondition: PXFieldState;
	HideCondition: PXFieldState;
	Form: PXFieldState<PXFieldOptions.CommitChanges>;
	Icon: PXFieldState;
	@controlConfig({displayMode: "both" })
	MassProcessingScreen: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchMode: PXFieldState;
	ActionType: PXFieldState<PXFieldOptions.CommitChanges>;
	MenuFolderType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({displayMode: "both" })
	DestinationScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	WindowMode: PXFieldState;
	MapEnableRights: PXFieldState;
	MapViewRights: PXFieldState;
	ExposedToMobile: PXFieldState;
	DisplayOnToolbar: PXFieldState<PXFieldOptions.CommitChanges>;
	Connotation: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	actionsConfig: { adjust: { hidden: true }, exportToExcel: { hidden: true }}
})
export class RowWorkflowActionNavigationParam extends PXView  {
	@columnConfig({type: GridColumnType.CheckBox})
	IsActive: PXFieldState;

	Name: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({allowSort: false, fullState: true, editorConfig: { comboBox: true }})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({type: GridColumnType.CheckBox})
	FromSchema: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	initNewRow: true,
	topBarItems: {
		fieldMoveUp: {index: 0, config: {commandName: "fieldMoveUp", toolTip: Tooltips.WorkflowActionField_fieldMoveUp, images: {normal: "main@ArrowUp"}}},
		fieldMoveDown: {index: 1, config: {commandName: "fieldMoveDown", toolTip: Tooltips.WorkflowActionField_fieldMoveDown, images: {normal: "main@ArrowDown"}}},
	}
})
export class WorkflowActionField extends PXView  {
	fieldMoveUp: PXActionState;
	fieldMoveDown: PXActionState;

	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({allowSort: false, fullState: true, editorConfig: { comboBox: true }})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class WorkflowActionParam extends PXView  {
	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	Parameter: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({allowSort: false, fullState: true, editorConfig: { comboBox: true }})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	keepPosition: true,
	topBarItems: {
		actionSequenceMoveUp: {index: 0, config: {commandName: "actionSequenceMoveUp", toolTip: Tooltips.WorkflowActionSequenceNext_actionSequenceMoveUp, images: {normal: "main@ArrowUp"}}},
		actionSequenceMoveDown: {index: 1, config: {commandName: "actionSequenceMoveDown", toolTip: Tooltips.WorkflowActionSequenceNext_actionSequenceMoveDown, images: {normal: "main@ArrowDown"}}},
	}
})
export class WorkflowActionSequenceNext extends PXView  {
	actionSequenceMoveUp: PXActionState;
	actionSequenceMoveDown: PXActionState;

	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	NextActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionType: PXFieldState;
	Condition: PXFieldState;

	@linkCommand("editActionSequenceFormFieldValues")
	UpdateFormFields: PXFieldState;

	@columnConfig({type: GridColumnType.CheckBox})
	StopOnError: PXFieldState;
	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true
})
export class WorkflowActionSequencePrevious extends PXView  {
	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	PrevActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionType: PXFieldState;
	Condition: PXFieldState;

	@linkCommand("editActionSequenceFormFieldValues")
	UpdateFormFields: PXFieldState;

	@columnConfig({type: GridColumnType.CheckBox})
	StopOnError: PXFieldState;
	Status: PXFieldState;
}

export class RowActionsFolder extends PXView  {
	MenuFolderType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	topBarItems: {
		actionMoveUp: {index: 0, config: {commandName: "actionMoveUp", toolTip: Tooltips.WorkflowActionField_fieldMoveUp, images: { normal: "main@ArrowUp" }}},
		actionMoveDown: {index: 1, config: {commandName: "actionMoveDown", toolTip: Tooltips.WorkflowActionField_fieldMoveDown, images: { normal: "main@ArrowDown" }}},
	},
	actionsConfig: { adjust: { hidden: true }, exportToExcel: { hidden: true }}
})
export class RowActionOrder extends PXView  {
	actionMoveUp: PXActionState;
	actionMoveDown: PXActionState;
	ActionName: PXFieldState;
	DisplayName: PXFieldState;
	ActionType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	allowInsert: false,
	topBarItems: {
		addCategory: {index: 0, config: {commandName: "addCategory", toolTip: Captions.ActionAddCategory}},
		categoryMoveUp: {index: 1, config: {commandName: "categoryMoveUp", toolTip: Tooltips.WorkflowActionSequenceNext_actionSequenceMoveUp, images: { normal: "main@ArrowUp" }}},
		categoryMoveDown: {index: 2, config: {commandName: "categoryMoveDown", toolTip: Tooltips.WorkflowActionSequenceNext_actionSequenceMoveDown, images: { normal: "main@ArrowDown" }}},
	}
})
export class RowWorkflowCategoryOrder extends PXView  {
	addCategory: PXActionState;
	categoryMoveUp: PXActionState;
	categoryMoveDown: PXActionState;
	CategoryName: PXFieldState;
	DisplayName: PXFieldState;
}

export class AddRowWorkflowCategory extends PXView  {
	CategoryName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class WorkflowActionSequenceFormFieldValue extends PXView  {
	@columnConfig({type: GridColumnType.CheckBox})
	IsActive: PXFieldState;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({allowSort: false, fullState: true, editorConfig: { comboBox: true }})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
}

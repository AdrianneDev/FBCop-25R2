import {
	PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo, disabled, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode,
	GridColumnType, PXActionState, treeConfig, TextAlign, GridPreset, localizable, GridFastFilterVisibility, ScreenUpdateParams, controlConfig
} from "client-controls";

@localizable
export class Labels {
	static ComboBoxValues = "Combo Box Values";
	static MoveUp = "Move Up";
	static MoveDown = "Move Down";
	static CreateAction = "Create Action";
}

// Views
export class AUMaintBaseParams extends PXView {
	EditScreenID: PXFieldState;
	ObjID: PXFieldState;
	CodeFile: PXFieldState;
	TableName: PXFieldState;
	EditMobileScreenID: PXFieldState;
	WorkflowID: PXFieldState;
}

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "NodeId",
	textField: "DisplayName",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	openedLayers: 1,
	keepPosition: true,
	autoRepaint: ["CurrentStateProperties", "StateActionsPerState", "StateEventHandlersPerState", "CurrentTransition", "CurrentTreeNode", "StatePropertiesPerState", "OnEnterStateFieldsPerState", "OnLeaveStateFieldsPerState"],
	autoRepaintCommand: "RefreshAll",
	hideToolbarSearch: true,
	topBarItems: {
		RemoveNode: { index: 0, config: { commandName: "RemoveNode", images: { normal: "main@Remove" } } },
		moveUp: { index: 1, config: { commandName: "MoveUp", images: { normal: "main@ArrowUp" } } },
		moveDown: { index: 2, config: { commandName: "MoveDown", images: { normal: "main@ArrowDown" } } },
	},
	renderHTML: true,
})
export class WorkflowStateNode extends PXView  {
	RemoveNode: PXActionState;
	moveUp: PXActionState;
	moveDown: PXActionState;
	NodeId: PXFieldState;
	DisplayName: PXFieldState;
	IsState: PXFieldState;
	IsTransition: PXFieldState;
}

export class WorkflowStateProperties extends PXView  {
	Identifier: PXFieldState;
	DisplayName: PXFieldState;
	SkipConditionID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	IsInitial: PXFieldState;
	DisplayNextState: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	showFastFilter: GridFastFilterVisibility.False,
	actionsConfig: { exportToExcel: { hidden: true } },
	syncPosition: true,
	autoRepaint: new ScreenUpdateParams({ views: ["WorkflowStateProperty"] }),
	topBarItems: {
		comboBoxValues: {index: 0, config: {commandName: "comboBoxValues", text: Labels.ComboBoxValues}},
	}
})
export class WorkflowStateProperty extends PXView  {
	comboBoxValues: PXActionState;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200, fullState: true})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsDisabled: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsHide: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsRequired: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	DefaultValue: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
	actionsConfig: { exportToExcel: { hidden: true } },
	keepPosition: true,
	topBarItems: {
		onEnterFieldMoveUp: {index: 0, config: {commandName: "onEnterFieldMoveUp", toolTip: Labels.MoveUp, images: {normal: "main@ArrowUp"}}},
		onEnterFieldMoveDown: {index: 1, config: {commandName: "onEnterFieldMoveDown", toolTip: Labels.MoveDown, images: {normal: "main@ArrowDown"}}},
	},
	initNewRow: true
})
export class WorkflowOnEnterStateField extends PXView  {
	onEnterFieldMoveUp: PXActionState;
	onEnterFieldMoveDown: PXActionState;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowSort: false, width: 200, fullState: true,
		editorConfig: { comboBox: true }})	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
	actionsConfig: { exportToExcel: { hidden: true } },
	topBarItems: {
		onLeaveFieldMoveUp: {index: 0, config: {commandName: "onLeaveFieldMoveUp", toolTip: Labels.MoveUp, images: {normal: "main@ArrowUp"}}},
		onLeaveFieldMoveDown: {index: 1, config: {commandName: "onLeaveFieldMoveDown", toolTip: Labels.MoveDown, images: {normal: "main@ArrowDown"}}},
	},
	initNewRow: true
})
export class WorkflowOnLeaveStateField extends PXView  {
	onLeaveFieldMoveUp: PXActionState;
	onLeaveFieldMoveDown: PXActionState;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowSort: false, width: 200, fullState: true,
		editorConfig: { comboBox: true }})	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
	actionsConfig: { exportToExcel: { hidden: true } },
	topBarItems: {
		createActionForState: {index: 0, config: {commandName: "createActionForState", text: Labels.CreateAction}},
	}
})
export class WorkflowStateAction extends PXView  {
	createActionForState: PXActionState;
	@columnConfig({width: 50, textAlign: TextAlign.Center})	AutoRunEnabled: PXFieldState;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	ActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsTopLevel: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	AutoRun: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	Connotation: PXFieldState;
	@columnConfig({width: 50})	Status: PXFieldState;
	@columnConfig({width: 200})	FormName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
	actionsConfig: { exportToExcel: { hidden: true } }
})
export class WorkflowStateEventHandler extends PXView  {
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 300})	HandlerName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 150})	Status: PXFieldState;
}

export class WorkflowTransition extends PXView  {
	FromStateName: PXFieldState;
	TriggeredBy: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionName: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text", })
	ConditionID: PXFieldState<PXFieldOptions.CommitChanges>;

	TargetStateName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayNextState: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
	actionsConfig: { exportToExcel: { hidden: true } },
	keepPosition: true,
	topBarItems: {
		fieldMoveUp: {index: 0, config: {commandName: "fieldMoveUp", toolTip: Labels.MoveUp, images: {normal: "main@ArrowUp"}}},
		fieldMoveDown: {index: 1, config: {commandName: "fieldMoveDown", toolTip: Labels.MoveDown, images: {normal: "main@ArrowDown"}}},
	}
})
export class WorkflowTransitionField extends PXView  {
	fieldMoveUp: PXActionState;
	fieldMoveDown: PXActionState;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowSort: false, width: 200, fullState: true,
		editorConfig: { comboBox: true }})	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	Status: PXFieldState;
}

export class AddPredefinedWorkflowState extends PXView  {
	StateID: PXFieldState;
	ParentStateID: PXFieldState;
	Layout: PXFieldState;
}

export class AddWorkflowState extends PXView  {
	Identifier: PXFieldState;
	DisplayName: PXFieldState;
	ParentStateID: PXFieldState;
	Layout: PXFieldState;
}

export class ChangeWorkflowStateParent extends PXView  {
	CurrentState: PXFieldState;
	ParentStateID: PXFieldState;
}

export class AddWorkflowTransition extends PXView  {
	FromStateName: PXFieldState<PXFieldOptions.Disabled>;
	TriggeredBy: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	ConditionID: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetStateName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class WorkflowPropertyCombo extends PXView  {
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsExplicit: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	Description: PXFieldState;
}

export class AddWorkflowAction extends PXView  {
	ActionType: PXFieldState<PXFieldOptions.Disabled>;
	ActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState;
	FormName: PXFieldState;
	ActionFolder: PXFieldState;
	IsTopLevel: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AddWorkflowEventHandler extends PXView  {
	HandlerName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState;
}

export class WorkflowState extends PXView  {
	Identifier: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
	IsInitial: PXFieldState;
}

export class Workflow extends PXView {
	LayoutClient: PXFieldState<PXFieldOptions.Multiline>;
}

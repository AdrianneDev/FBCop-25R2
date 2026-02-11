import { PXView, GridAutoGrowMode, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnType, localizable, PXActionState, TextAlign, GridPreset } from "client-controls";


@localizable
class CommandName {
	static Up = "Move Up";
	static Down = "Move Down";
	static ComboBoxValues = "Combo Box Values";
	static AddRow = "Add Row";
}

// Views

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	syncPosition: true,
	autoAdjustColumns: true,
	autoRepaint: ["ViewForm", "ViewFieldsPerForm"],
	topBarItems: {
		addForm: {index: 0, config: {commandName: "addForm",  text: CommandName.AddRow, images: { normal: "svg:main@plus" } }},
	},
	actionsConfig: {insert: {hidden: true}}
})
export class WorkflowRecordBase extends PXView  {
	addForm: PXActionState; // have to use camelCase for the action name to match the action name in the toolbar
	@columnConfig({width: 150})	FormName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class WorkflowRecordFields extends PXView  {
	DisplayName: PXFieldState<PXFieldOptions.CommitChanges>;
	FormName: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Columns: PXFieldState<PXFieldOptions.CommitChanges>;
	Actions: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	syncPosition: true,
	keepPosition: true,
	initNewRow: true,
	topBarItems: {
		moveUp: {index: 0, config: {commandName: "moveUp", text: CommandName.Up, images: { normal: "main@ArrowUp" }}},
		moveDown: {index: 1, config: {commandName: "moveDown", text: CommandName.Down, images: { normal: "main@ArrowDown" }}},
		comboBoxValues: {index: 2, config: {commandName: "comboBoxValues", text: CommandName.ComboBoxValues}},
	},
	actionsConfig: {viewAction: {hidden: true}, refreshFields: {hidden: true}}
})
export class DialogBoxElementFields extends PXView  {
	viewAction: PXActionState;
	refreshFields: PXActionState;
	comboBoxValues: PXActionState;
	moveUp: PXActionState;
	moveDown: PXActionState;
	@columnConfig({width: 60, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
	@columnConfig({width: 200, hideViewLink: true})	SchemaField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	DisplayName: PXFieldState;
	@columnConfig({width: 60, type: GridColumnType.CheckBox})	FromScheme: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowSort: false, width: 200, fullState: true}) DefaultValue: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 120})	RequiredCondition: PXFieldState;
	@columnConfig({width: 200})	HideCondition: PXFieldState;
	@columnConfig({width: 100})	ColumnSpan: PXFieldState;
	@columnConfig({width: 100})	ControlSize: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 100})	Status: PXFieldState;
}

export class RowWorkflowFormNew extends PXView  {
	FormName: PXFieldState;
}

export class RowWorkflowFormFieldEdit extends PXView  {
	ComboBoxValuesSource: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	actionsConfig: {
		refresh: {hidden: true},
	},
	allowFilter: true
})
export class WorkflowPropertyCombo extends PXView  {
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsExplicit: PXFieldState;
	Value: PXFieldState;
	@columnConfig({width: 200})	Description: PXFieldState;
}

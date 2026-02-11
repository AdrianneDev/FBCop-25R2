import { PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo, disabled, PXFieldOptions, ScreenUpdateParams, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, TextAlign, GridPreset, GridFilterBarVisibility } from "client-controls";


// Views

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Primary,
	keepPosition: true,
	autoRepaint: new ScreenUpdateParams()
})
export class WorkflowRecordBase extends PXView  {
	@columnConfig({width: 200})	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	DisableCondition: PXFieldState;
	@columnConfig({width: 200})	HideCondition: PXFieldState;
	@columnConfig({width: 200})	RequiredCondition: PXFieldState;
	@columnConfig({width: 200})	DisplayName: PXFieldState;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsFromSchema: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200, fullState: true, editorConfig: { comboBox: true }})	DefaultValue: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	actionsConfig: {
		refresh: { hidden: true },
		exportToExcel: { hidden: true },
		adjust: { hidden: true }
	}
})
export class WorkflowPropertyCombo extends PXView  {
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsExplicit: PXFieldState;
	Value: PXFieldState;
	@columnConfig({width: 200})	Description: PXFieldState;
}

export class RowNewWorkflowFilter extends PXView  {
	Container: PXFieldState<PXFieldOptions.CommitChanges>;
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	showTopBar: false
})
export class RowNewWorkflowField extends PXView  {
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	Container: PXFieldState;
	ObjectName: PXFieldState;
	FieldName: PXFieldState;
	DisplayName: PXFieldState;
}

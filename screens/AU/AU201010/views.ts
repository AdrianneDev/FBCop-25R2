import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnType, TextAlign, GridPreset } from "client-controls";


// Views

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: false,
	allowUpdate: false
})
export class AUScreenConditionState extends PXView  {
	@linkCommand("actionEditCondition")
	@columnConfig({width: 200})	ConditionName: PXFieldState;
	@columnConfig({width: 400})	Expression: PXFieldState;
	@columnConfig({width: 150})	CalcStatus: PXFieldState;
}

export class AUScreenConditionState2 extends PXView  {
	ConditionName: PXFieldState<PXFieldOptions.CommitChanges>;
	AppendSystemCondition: PXFieldState<PXFieldOptions.CommitChanges>;
	InvertCondition: PXFieldState;
	ParentCondition: PXFieldState;
	JoinMethod: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class AUScreenConditionLineState extends PXView  {
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
	@columnConfig({width: 50})	OpenBrackets: PXFieldState;
	@columnConfig({width: 200})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false})	Condition: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowSort: false, width: 200, fullState: true,
		editorConfig: {
			comboBox: true,
		}
	})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowSort: false, width: 200, fullState: true,
		editorConfig: {
			comboBox: true,
		}
	})
	Value2: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	CloseBrackets: PXFieldState;
	@columnConfig({width: 50})	Operator: PXFieldState;
}

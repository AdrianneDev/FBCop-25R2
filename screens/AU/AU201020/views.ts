import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnType, PXActionState, TextAlign, GridPreset, GridNoteFilesShowMode } from "client-controls";

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

export class WorkflowDefinition extends PXView  {
	StateField: PXFieldState<PXFieldOptions.CommitChanges>;
	FlowTypeField: PXFieldState<PXFieldOptions.CommitChanges>;
	EnableWorkflowIDField: PXFieldState;
	FlowSubTypeField: PXFieldState<PXFieldOptions.CommitChanges>;
	EnableWorkflowSubTypeField: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	syncPosition: true,
	autoRepaint: ["Definition"],
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	actionsConfig: { adjust: { hidden: true }, exportToExcel: { hidden: true } }
})
export class WorkflowRecordBase extends PXView  {
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsSystem: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsCustomized: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({nullText: "DEFAULT", width: 50})	WorkflowID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({nullText: "DEFAULT", width: 50})	WorkflowSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("navigateWorkflow")
	@columnConfig({width: 200})	Description: PXFieldState;
	@columnConfig({width: 200})	SysWorkflowID: PXFieldState;
	@columnConfig({width: 50})	CalcStatus: PXFieldState;
}

export class RowExtendWorkflow extends PXView  {
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
	SysWorkflowID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkflowToCopy: PXFieldState;
	WorkflowID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkflowSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	actionsConfig: { adjust: { hidden: true }, exportToExcel: { hidden: true } }
})
export class WorkflowConflict extends PXView  {
	@columnConfig({width: 300})	ObjectName: PXFieldState;
	@columnConfig({width: 100})	Property: PXFieldState;
	@columnConfig({width: 100})	SystemValue: PXFieldState;
	@columnConfig({width: 100})	CustomizationValue: PXFieldState;
	@columnConfig({width: 50})	SystemAction: PXFieldState;
	@columnConfig({width: 50})	CustomizationAction: PXFieldState;
	@columnConfig({width: 200})	Action: PXFieldState;
}

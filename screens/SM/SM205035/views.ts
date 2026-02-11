import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnType, GridColumnGeneration, TextAlign, GridPreset } from "client-controls";

// Views

export class ExecFilter extends PXView {
	ScheduleID: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing, allowUpdate: false })
export class AUScheduleExecution extends PXView {
	@columnConfig({ allowCheckAll: true, width: 40 }) Selected: PXFieldState;
	@columnConfig({ type: GridColumnType.Icon, width: 80, textAlign: TextAlign.Center }) Status: PXFieldState;
	@linkCommand("ViewSchedule") ScheduleID: PXFieldState;
	ScreenID: PXFieldState;
	ExecutionDate: PXFieldState;
	ExecutionDateToDisplay: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	@linkCommand("ViewTotal")
	TotalCount: PXFieldState;
	ProcessedCount: PXFieldState;
	WarningsCount: PXFieldState;
	ErrorsCount: PXFieldState;
	Result: PXFieldState;
}

@gridConfig({ preset: GridPreset.Processing, generateColumns: GridColumnGeneration.AppendDynamic, allowUpdate: false })
export class AUScheduleHistory extends PXView {
	@columnConfig({ type: GridColumnType.Icon, width: 80, textAlign: TextAlign.Center }) ExecutionStatus: PXFieldState;
	@columnConfig({ width: 300 }) ExecutionResult: PXFieldState;
	@linkCommand("ViewEntity") _EntityLink_: PXFieldState;
}

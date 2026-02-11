import { PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo, disabled, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, TextAlign, GridPreset, GridFilterBarVisibility, localizable } from "client-controls";

@localizable
class CommandName {
	static Up = "Move Up";
	static Down = "Move Down";
}

// Views

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: false,
	allowUpdate: false,
	autoAdjustColumns: true
})
export class WorkflowRecordBase extends PXView  {
	@linkCommand("actionEdit")
	@columnConfig({width: 100})	HandlerName: PXFieldState;
	@columnConfig({width: 100})	DisplayName: PXFieldState;
	@columnConfig({width: 100})	EventType: PXFieldState;
	@columnConfig({width: 100})	EventContainerName: PXFieldState;
	@columnConfig({width: 100})	EventOrFieldNamesCaption: PXFieldState;
	@columnConfig({width: 100})	Status: PXFieldState;
}

export class WorkflowRecordBase2 extends PXView  {
	HandlerName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState;
	EventType: PXFieldState<PXFieldOptions.CommitChanges>;
	EventContainerName: PXFieldState<PXFieldOptions.CommitChanges>;
	EventName: PXFieldState<PXFieldOptions.CommitChanges>;
	TriggeredByChangeOfFieldNames: PXFieldState<PXFieldOptions.CommitChanges>;
	UseTargetAsPrimarySource: PXFieldState<PXFieldOptions.CommitChanges>;
	UseParameterAsPrimarySource: PXFieldState<PXFieldOptions.CommitChanges>;
	UseViewAsPrimarySource: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowMultipleSelect: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	keepPosition: true,
	initNewRow: true,
	topBarItems: {
		fieldMoveUp: {index: 0, config: {commandName: "fieldMoveUp", toolTip: CommandName.Up, images: {normal: "main@ArrowUp"}}},
		fieldMoveDown: {index: 1, config: {commandName: "fieldMoveDown", toolTip: CommandName.Down, images: {normal: "main@ArrowDown"}}},
	}
})
export class WorkflowRecordBase3 extends PXView  {
	fieldMoveUp: PXActionState;
	fieldMoveDown: PXActionState;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsFromScheme: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		allowSort: false,
		width: 200,
		fullState: true,
		editorConfig: {
			comboBox: true
		}
	})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	Status: PXFieldState;
}

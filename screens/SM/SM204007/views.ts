import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnType,
	commitChanges,
	TextAlign,
	PXActionState,
	GridPreset,
	controlConfig,
} from "client-controls";
import { NullTextValues } from "../../common/messages";

export class ActionExecution extends PXView {
	@controlConfig({ nullText: NullTextValues.New, displayMode: "text" })
	@commitChanges ExecutionID: PXFieldState;
	Name: PXFieldState;
	@controlConfig({displayMode: "both"})
	ActionScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionName: PXFieldState;
	@controlConfig({displayMode: "both"})
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowCreatedByEventsTabExpr: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, fastFilterByAllFields: false })
export class ActionExecutionMapping extends PXView {
	DisplayFieldName: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox, textAlign: TextAlign.Center, allowNull: false })
	FromSchema: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({key: "valueMapping", allowSort: false, editorConfig: {allowCustomItems: true}})
	Value: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true, fastFilterByAllFields: false })
export class ActionExecutionParameter extends PXView {
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({fullState: true})
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	FromSchema: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({key: "valueParameter", allowSort: false, editorConfig: {allowCustomItems: true}, fullState: true})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details, fastFilterByAllFields: false })
export class BPEvent extends PXView {
	createBusinessEvent: PXActionState;

	@linkCommand("ViewBusinessEvent")
	Name: PXFieldState;
	Description: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox})
	Active: PXFieldState;
	Type: PXFieldState;
}

export class BPEventData extends PXView {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
}

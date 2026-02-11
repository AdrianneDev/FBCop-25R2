import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	PXActionState,
	columnConfig,
	GridColumnDisplayMode,
	GridPreset,
	localizable,
	controlConfig,
	fieldConfig,
	TextAlign,
	actionConfig
} from "client-controls";

@localizable
export class EventConsts {
	static MoveRowUp = "Move Row Up";
	static MoveRowDown = "Move Row Down";
	static CreateSubscriber = "Create Subscriber";
	static ImportScenario = "Import Scenario";
}

// Views

export class BPEvent extends PXView  {
	viewSchedule: PXActionState;
	viewInquiryParams: PXActionState;
	Name: PXFieldState;
	Active: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionName: PXFieldState;
	ActionName2: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowMassAction: PXFieldState;
	RowProcessingType: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "Key",
				valueField: "Path",
				dataMember: "EntityItems",
				textField: "Name",
				iconField: "Icon",
				mode: "single"
			},
			allowEditValue: true
		}
	})
	GroupBy: PXFieldState<PXFieldOptions.CommitChanges>;
	IsGroupByOldValue: PXFieldState;
	RunSynchronously: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@columnConfig({displayMode: GridColumnDisplayMode.Text})
	@controlConfig({displayMode: "text"})
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScreenIdValue: PXFieldState;
	FilterID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsTriggerConditionsVisible: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CacheEntityItem extends PXView  {
	Path: PXFieldState;
	Name: PXFieldState;
	Key: PXFieldState;
	Icon: PXFieldState;
}

export class BPEvent2 extends PXView  {
	TrackAllFields: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	keepPositionFields: ["Operation", "TableName", "FieldName"]
})
export class BPEventTriggerCondition extends PXView  {
	conditionUp: PXActionState;
	conditionDown: PXActionState;

	Active: PXFieldState;
	OpenBrackets: PXFieldState;
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ fullState: true, editorConfig: { comboBox: true } })
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorType: "qp-drop-down", fullState: true, textAlign: TextAlign.Left })
	Condition: PXFieldState<PXFieldOptions.CommitChanges>;
	IsFromSchema: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorConfig: { comboBox: true }, fullState: true, })
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { comboBox: true }, fullState: true,  })
	Value2: PXFieldState<PXFieldOptions.CommitChanges>;
	CloseBrackets: PXFieldState;
	Operator: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details, initNewRow: true, autoAdjustColumns: false, topBarItems: {
		subscriberUp: {
			index: 3,
			config: {
				commandName: "subscriberUp",
				images: {normal: "main@ArrowUp"},
				toolTip: EventConsts.MoveRowUp
			}
		},
		subscriberDown: {
			index: 4,
			config: {
				commandName: "subscriberDown",
				images: {normal: "main@ArrowDown"},
				toolTip: EventConsts.MoveRowDown
			}
		},
		createSubscriber: {
			type: "menu-options",
			index: 5,
			config: {
				commandName: "createSubscriber",
				text: EventConsts.CreateSubscriber,
				options: {
					first: {
						text: EventConsts.ImportScenario,
						commandName: "newScriptScenario"
					}
				}
			}
		}
	}
})
export class BPEventSubscriber extends PXView  {
	subscriberUp: PXActionState;
	subscriberDown: PXActionState;
	viewSubscriber: PXActionState;
	createSubscriber: PXActionState;
	@actionConfig({ popupCommand: "Refresh" })
	newScriptScenario: PXActionState;

	Active: PXFieldState;

	@linkCommand("viewSubscriber")
	Type: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("viewSubscriber")
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text
	})
	HandlerID: PXFieldState<PXFieldOptions.CommitChanges>;

	StopOnError: PXFieldState;

	OpenAfterProcessing: PXFieldState;
}

@gridConfig({preset: GridPreset.Details, autoAdjustColumns: true})
export class BPEventTrackingField extends PXView  {
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorType: "qp-drop-down" })
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({preset: GridPreset.Details, autoAdjustColumns: true})
export class BPEventSchedule extends PXView  {
	viewScheduleHistory: PXActionState;
	createSchedule: PXActionState;

	@linkCommand("viewSchedule")
	@columnConfig({ displayMode: GridColumnDisplayMode.Text, textAlign: TextAlign.Left })
	ScheduleID: PXFieldState<PXFieldOptions.CommitChanges>;
	Active: PXFieldState;
	AUSchedule__TimeZoneID: PXFieldState;
	AUSchedule__LastRunDate: PXFieldState;
	AUSchedule__NextRunDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	allowInsert: false,
	allowDelete: false,
	allowSort: false,
})
export class BPInquiryParameter extends PXView  {
	resetToDefaults: PXActionState;

	DisplayName: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({preset: GridPreset.Inquiry})
export class BPEvent3 extends PXView  {
	@columnConfig({ displayMode: GridColumnDisplayMode.Text, textAlign: TextAlign.Left, hideViewLink: true })
	AUScheduleHistory__ScheduleID: PXFieldState;
	AUScheduleHistory__ExecutionDate: PXFieldState;
	AUScheduleHistory__ExecutionResult: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Name: PXFieldState;
	Description: PXFieldState;
	ScreenIdValue: PXFieldState;
}

export class CreateScriptPanel extends PXView  {
	ScenarioName: PXFieldState<PXFieldOptions.CommitChanges>;
}

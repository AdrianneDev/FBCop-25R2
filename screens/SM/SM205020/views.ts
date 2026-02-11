import {
	columnConfig,
	commitChanges,
	GridColumnType,
	gridConfig,
	GridPreset,
	linkCommand,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign,
	controlConfig,
	GridColumnDisplayMode,
} from "client-controls";
import { NullTextValues } from "../../common/messages";

export class AUSchedule extends PXView  {
	@controlConfig({allowNull: false})
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState;
	@controlConfig({type: GridColumnType.CheckBox})
	NoEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	RunLimit: PXFieldState;
	@controlConfig({type: GridColumnType.CheckBox})
	NoRunLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	HistoryRetainCount: PXFieldState;
	@controlConfig({type: GridColumnType.CheckBox})
	KeepFullHistory: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxAbortCount: PXFieldState<PXFieldOptions.CommitChanges>;
	DoNotDeactivate: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({allowNull: false})
	RunCntr: PXFieldState<PXFieldOptions.Disabled>;
	LastRunDate: PXFieldState<PXFieldOptions.Disabled>;
	NextRunDateTime: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({allowNull: false})
	TimeZoneID: PXFieldState;

	@controlConfig({allowNull: false})
	ScheduleType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({allowNull: false})
	NextRunDate: PXFieldState;
	PeriodFrequency: PXFieldState;
	PeriodLabel: PXFieldState<PXFieldOptions.Disabled>;

	PeriodDateSel: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodFixedDay: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyFrequency: PXFieldState;
	MonthlyLabel: PXFieldState<PXFieldOptions.Disabled>;
	MonthlyDaySel: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDay: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnWeek: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDayOfWeek: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyFrequency: PXFieldState;
	WeeklyLabel: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({type: GridColumnType.CheckBox})
	WeeklyOnDay1: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	WeeklyOnDay2: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	WeeklyOnDay3: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	WeeklyOnDay4: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	WeeklyOnDay5: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	WeeklyOnDay6: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	WeeklyOnDay7: PXFieldState<PXFieldOptions.CommitChanges>;
	DailyFrequency: PXFieldState;
	DailyLabel: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({timeMode: true})
	StartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({timeMode: true})
	EndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({allowNull: false})
	Interval: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({timeMode: true, allowNull: false})
	NextRunTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	ExactTime: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class AUScheduleHeader extends PXView  {
	@controlConfig({nullText: NullTextValues.New, displayMode: "text"})
	@commitChanges
	ScheduleID: PXFieldState;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@controlConfig({allowFilter: true, displayMode: "text"})
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({type: GridColumnType.CheckBox})
	IsActive: PXFieldState;
	ActionName: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowEventsTabExpr: PXFieldState;
	ShowConditionsTabExpr: PXFieldState;
	ShowEmailNotificationsTabExpr: PXFieldState;

	PeriodLabel: PXFieldState<PXFieldOptions.Disabled>;

	MonthlyLabel: PXFieldState<PXFieldOptions.Disabled>;
	WeeklyLabel: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({type: GridColumnType.CheckBox})
	DailyLabel: PXFieldState<PXFieldOptions.Disabled>;
	FilterVisible: PXFieldState;
}

@gridConfig({preset: GridPreset.Details, initNewRow: true, fastFilterByAllFields: false })
export class AUScheduleFilter extends PXView  {
	@columnConfig({type: GridColumnType.CheckBox, textAlign: TextAlign.Center})
	IsActive: PXFieldState;
	OpenBrackets: PXFieldState;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	Condition: PXFieldState;
	Value: PXFieldState;
	Value2: PXFieldState;
	CloseBrackets: PXFieldState;
	Operator: PXFieldState;
}

@gridConfig({preset: GridPreset.Details, initNewRow: true, fastFilterByAllFields: false })
export class AUScheduleFill extends PXView  {
	@columnConfig({type: GridColumnType.CheckBox, textAlign: TextAlign.Center})
	IsActive: PXFieldState;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	Value: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox, textAlign: TextAlign.Center})
	IgnoreError: PXFieldState;
}

@gridConfig({preset: GridPreset.ReadOnly, autoAdjustColumns: true, fastFilterByAllFields: false, syncPosition: true})
export class BPEvent extends PXView  {
	@linkCommand("ViewBusinessEvent")
	Name: PXFieldState;
	Description: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox})
	Active: PXFieldState;
	Type: PXFieldState;
}

@gridConfig({preset: GridPreset.ReadOnly, autoAdjustColumns: true, syncPosition: true})
export class NotificationSchedule extends PXView {
	@linkCommand("ViewNotification")
	@columnConfig({textField: "Notification__Name", displayMode: GridColumnDisplayMode.Text, textAlign: TextAlign.Left, width: 300})
	NotificationID: PXFieldState;
	Notification__Subject: PXFieldState;
	Notification__ScreenID_Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	Notification__ScreenID: PXFieldState;
}

import {
	PXScreen, createCollection, graphInfo, PXView, createSingle, PXFieldState, PXFieldOptions, linkCommand, PXActionState,
	gridConfig, GridPreset, columnConfig, controlConfig, GridAutoGrowMode
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.ScheduleMaint", primaryView: "Schedule_Header",
	showUDFIndicator: true, showActivitiesIndicator: true,
})
export class GL203500 extends PXScreen {
	ViewBatchD: PXActionState;
	viewBatch: PXActionState;

	Schedule_Header = createSingle(Schedule_Header);
	Batch_Detail = createCollection(Batch_Detail);
	Batch_History = createCollection(Batch_History);

}

export class Schedule_Header extends PXView {

	ScheduleID: PXFieldState;
	Active: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	NoEndDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ minValue: 1 })
	RunLimit: PXFieldState<PXFieldOptions.CommitChanges>;

	NoRunLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	FormScheduleType: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduleName: PXFieldState;
	LastRunDate: PXFieldState;
	NextRunDate: PXFieldState;
	RunCntr: PXFieldState;
	PeriodDateSel: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodFrequency: PXFieldState;
	Periods: PXFieldState;
	PeriodFixedDay: PXFieldState;
	MonthlyDaySel: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyFrequency: PXFieldState;
	Months: PXFieldState;
	MonthlyOnDay: PXFieldState;
	MonthlyOnWeek: PXFieldState;
	MonthlyOnDayOfWeek: PXFieldState;

	WeeklyFrequency: PXFieldState;
	Weeks: PXFieldState;
	WeeklyOnDay1: PXFieldState;
	WeeklyOnDay2: PXFieldState;
	WeeklyOnDay3: PXFieldState;
	WeeklyOnDay4: PXFieldState;
	WeeklyOnDay5: PXFieldState;
	WeeklyOnDay6: PXFieldState;
	WeeklyOnDay7: PXFieldState;
	DailyFrequency: PXFieldState;

	Days: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class Batch_Detail extends PXView {

	Module: PXFieldState;

	@linkCommand("ViewBatchD")
	BatchNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;

	DateEntered: PXFieldState;
	FinPeriodID: PXFieldState;
	CuryControlTotal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class Batch_History extends PXView {

	Module: PXFieldState;
	BatchNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;

	DateEntered: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	Status: PXFieldState;
	CuryControlTotal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

}

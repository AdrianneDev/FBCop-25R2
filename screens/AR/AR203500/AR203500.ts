import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, columnConfig, gridConfig, GridPreset,
	PXFieldState, PXFieldOptions, PXActionState, controlConfig, GridAutoGrowMode
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARScheduleMaint", primaryView: "Schedule_Header",
	showUDFIndicator: true, showActivitiesIndicator: true,
})
export class AR203500 extends PXScreen {

	ViewDocument: PXActionState;
	ViewGenDocument: PXActionState;


	@viewInfo({ containerName: "Schedule Summary" })
	Schedule_Header = createSingle(Schedule);

	@viewInfo({ containerName: "Document List" })
	Document_Detail = createCollection(ARRegister);

	@viewInfo({ containerName: "Generated Documents" })
	Document_History = createCollection(ARRegister2);

}

export class Schedule extends PXView {

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
	LastRunDate: PXFieldState<PXFieldOptions.Disabled>;
	NextRunDate: PXFieldState<PXFieldOptions.Disabled>;
	RunCntr: PXFieldState<PXFieldOptions.Disabled>;
	PeriodDateSel: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodFrequency: PXFieldState;
	Periods: PXFieldState<PXFieldOptions.Disabled>;
	PeriodFixedDay: PXFieldState;
	MonthlyDaySel: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyFrequency: PXFieldState;
	Months: PXFieldState<PXFieldOptions.Disabled>;
	MonthlyOnDay: PXFieldState;
	MonthlyOnWeek: PXFieldState;
	MonthlyOnDayOfWeek: PXFieldState;
	WeeklyFrequency: PXFieldState;
	Weeks: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	WeeklyOnDay1: PXFieldState;
	WeeklyOnDay2: PXFieldState;
	WeeklyOnDay3: PXFieldState;
	WeeklyOnDay4: PXFieldState;
	WeeklyOnDay5: PXFieldState;
	WeeklyOnDay6: PXFieldState;
	WeeklyOnDay7: PXFieldState;
	DailyFrequency: PXFieldState;
	Days: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill, syncPosition: false })
export class ARRegister extends PXView {

	DocType: PXFieldState;

	@columnConfig({
		editorConfig: {
			parameters: (screen: AR203500) => ({ "ARRegister.docType": screen.Document_Detail.activeRow.DocType.value })
		}
	})
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	CustomerID: PXFieldState;
	CustomerID_BAccountR_acctName: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DocDesc: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class ARRegister2 extends PXView {

	DocType: PXFieldState;

	RefNbr: PXFieldState;

	CustomerID: PXFieldState;
	CustomerID_BAccountR_acctName: PXFieldState;
	Status: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DocDesc: PXFieldState;

}

import {
	PXView, PXFieldState, PXFieldOptions, gridConfig, GridPreset, linkCommand, columnConfig, fieldConfig,
	controlConfig, GridAutoGrowMode
} from "client-controls";
import { AP203500 } from "./AP203500";

// Views

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
	Weeks: PXFieldState<PXFieldOptions.CommitChanges>;
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

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class APRegister extends PXView {
	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	@columnConfig({
		editorConfig: {
			parameters: (screen: AP203500) => ({ "APRegister.docType": screen.Document_Detail.activeRow.DocType.value })
		}
	})
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorID: PXFieldState;

	VendorID_Vendor_acctName: PXFieldState;

	DocDate: PXFieldState;
	@columnConfig({ hideViewLink: true })

	FinPeriodID: PXFieldState;
	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DocDesc: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class APRegister2 extends PXView {
	DocType: PXFieldState;

	@linkCommand("ViewGenDocument")
	@columnConfig({
		editorConfig: {
			parameters: (screen: AP203500) => ({ "APRegister.docType": screen.Document_History.activeRow.DocType.value })
		}
	})
	RefNbr: PXFieldState;

	VendorID: PXFieldState;

	VendorID_Vendor_acctName: PXFieldState;
	Status: PXFieldState;

	DocDate: PXFieldState;
	@columnConfig({ hideViewLink: true })

	FinPeriodID: PXFieldState;
	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DocDesc: PXFieldState;
}

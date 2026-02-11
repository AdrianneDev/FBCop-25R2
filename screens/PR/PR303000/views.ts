import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	columnConfig
} from "client-controls";

export class Document extends PXView {
	RefNbr: PXFieldState;
	Status: PXFieldState;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Amendment: PXFieldState<PXFieldOptions.CommitChanges>;
	AmendedRefNbr: PXFieldState;
	ReasonForROE: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodType: PXFieldState;
	Comments: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDesc: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CurrentDocument extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	CRAPayrollAccountNumber: PXFieldState;
	FirstDayWorked: PXFieldState<PXFieldOptions.CommitChanges>;
	LastDayForWhichPaid: PXFieldState<PXFieldOptions.CommitChanges>;
	FinalPayPeriodEndingDate: PXFieldState<PXFieldOptions.CommitChanges>;
	VacationPay: PXFieldState;
	TotalInsurableHours: PXFieldState;
	TotalInsurableEarnings: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class StatutoryHolidays extends PXView {
	Date: PXFieldState;
	Amount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class OtherMonies extends PXView {
	@columnConfig({ hideViewLink: true })
	TypeCD: PXFieldState;

	TypeCD_Description: PXFieldState;
	Amount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class InsurableEarnings extends PXView {
	PayPeriodID: PXFieldState;
	InsurableEarnings: PXFieldState;
	InsurableHours: PXFieldState;
}

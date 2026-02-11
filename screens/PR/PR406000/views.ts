import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, GridPreset, columnConfig } from "client-controls";

export class PTOBalanceFilter extends PXView {
	PeriodStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	BankID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	syncPosition: true,
	preset: GridPreset.ReadOnly,
	mergeToolbarWith: "ScreenToolbar"
})
export class PRPTOBalance extends PXView {
	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;

	EmployeeID_Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BankID: PXFieldState;

	BankID_Description: PXFieldState;
	EffectiveStartDate: PXFieldState;

	@linkCommand("ViewEmployeePTODetailsReport")
	TotalHoursAccumulated: PXFieldState;

	@linkCommand("ViewEmployeePTODetailsReport")
	TotalHoursUsed: PXFieldState;

	@linkCommand("ViewEmployeePTODetailsReport")
	TotalHoursAvailable: PXFieldState;

	@linkCommand("ViewEmployeePTODetailsReport")
	AccumulatedAmount: PXFieldState;

	@linkCommand("ViewEmployeePTODetailsReport")
	UsedAmount: PXFieldState;

	@linkCommand("ViewEmployeePTODetailsReport")
	AvailableAmount: PXFieldState;
}

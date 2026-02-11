import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridPreset } from "client-controls";

export class PRGovernmentReportingFilter extends PXView {
	TaxRegistrationID: PXFieldState<PXFieldOptions.CommitChanges>;
	FederalOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState<PXFieldOptions.CommitChanges>;
	ReportingPeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	AatrixVendorID: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class PRGovernmentReport extends PXView {
	@linkCommand("RunReport")
	@columnConfig({ width: 250 })
	FormDisplayName: PXFieldState;

	@columnConfig({ width: 400 })
	Description: PXFieldState;

	@columnConfig({ width: 80 })
	State: PXFieldState;

	@columnConfig({ width: 120 })
	ReportingPeriod: PXFieldState;
}

export class PRGovernmentReport2 extends PXView {
	FormName: PXFieldState<PXFieldOptions.Disabled>;
	FormDisplayName: PXFieldState<PXFieldOptions.Disabled>;
	Year: PXFieldState<PXFieldOptions.CommitChanges>;
	Quarter: PXFieldState<PXFieldOptions.CommitChanges>;
	Month: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
	ReportingPeriod: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
}

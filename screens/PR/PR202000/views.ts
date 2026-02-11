import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPagerMode,
	GridPreset,
	columnConfig
} from "client-controls";

export class EmployeeClass extends PXView {
	EmployeeClassID: PXFieldState;
	Descr: PXFieldState;
}

export class CurEmployeeClassRecord extends PXView {
	EmpType: PXFieldState<PXFieldOptions.CommitChanges>;
	PayGroupID: PXFieldState;
	CalendarID: PXFieldState<PXFieldOptions.CommitChanges>;
	HoursPerWeek: PXFieldState;
	StdWeeksPerYear: PXFieldState<PXFieldOptions.CommitChanges>;
	HoursPerYear: PXFieldState;
	OverrideHoursPerYearForCertified: PXFieldState<PXFieldOptions.CommitChanges>;
	HoursPerYearForCertified: PXFieldState;
	ExemptFromOvertimeRules: PXFieldState;
	NetPayMin: PXFieldState;
	GrnMaxPctNet: PXFieldState;
	WorkCodeID: PXFieldState;
	UnionID: PXFieldState;
	ExemptFromCertifiedReporting: PXFieldState;
	UsePayrollProjectWorkLocation: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	wrapToolbar: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	initNewRow: true
})
export class WorkLocations extends PXView {
	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	PRLocation__Description: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}

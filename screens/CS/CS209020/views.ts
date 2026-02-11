import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridPreset, controlConfig, GridFastFilterVisibility, GridFilterBarVisibility } from "client-controls";

export class DaylightShiftFilter extends PXView  {
	Year: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	fastFilterByAllFields: false
})
export class DaylightShift extends PXView  {
	TimeZoneDescription: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate_Date: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }})
	FromDate_Time: PXFieldState;
	ToDate_Date: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }})
	ToDate_Time: PXFieldState;

	Shift: PXFieldState;
}

import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnShowHideMode,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign
} from "client-controls";

export class Filter extends PXView {
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: [
		"ProjectId",
		"Status"
	]
})
export class DailyFieldReports extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewEntity")
	DailyFieldReportCd: PXFieldState;
	Status: PXFieldState;
	Date: PXFieldState;
	@linkCommand("ViewEntity")
	ProjectId: PXFieldState;
	@linkCommand("ViewEntity")
	@columnConfig({
		textAlign: TextAlign.Left,
		width: 150
	})
	ProjectManagerId: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CreatedById: PXFieldState;
}

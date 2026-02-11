import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode
} from "client-controls";

export class Filter extends PXView {
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	WeatherApiService: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestDateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestDateTo: PXFieldState<PXFieldOptions.CommitChanges>;
	IsShowErrorsOnly: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class WeatherProcessingLogs extends PXView {
	@linkCommand("ViewEntity")
	DailyFieldReport__DailyFieldReportCd: PXFieldState;
	DailyFieldReport__Status: PXFieldState;
	DailyFieldReport__Date: PXFieldState;
	@linkCommand("ViewEntity")
	DailyFieldReport__ProjectId: PXFieldState;
	@linkCommand("ViewEntity")
	@columnConfig({ width: 150 })
	DailyFieldReport__ProjectManagerId: PXFieldState;
	@linkCommand("ViewEntity")
	@columnConfig({ width: 150 })
	DailyFieldReport__CreatedById: PXFieldState;
	WeatherService: PXFieldState;
	@columnConfig({ format: "g" })
	RequestTime: PXFieldState;
	RequestBody: PXFieldState;
	RequestStatusIcon: PXFieldState;
	@columnConfig({ format: "g" })
	ResponseTime: PXFieldState;
	ResponseBody: PXFieldState;
}


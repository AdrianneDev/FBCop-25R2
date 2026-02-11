import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnShowHideMode,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

@gridConfig({ preset: GridPreset.Processing })
export class WeatherProcessingLogs extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewEntity")
	DailyFieldReport__DailyFieldReportCd: PXFieldState;
	DailyFieldReport__Status: PXFieldState;
	DailyFieldReport__Date: PXFieldState;
	@linkCommand("ViewEntity")
	DailyFieldReport__ProjectId: PXFieldState;
	@columnConfig({ width: 150 })
	@linkCommand("ViewEntity")
	DailyFieldReport__ProjectManagerId: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 150
	})
	@columnConfig({ hideViewLink: true })
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


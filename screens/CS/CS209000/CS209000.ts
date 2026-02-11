import {
	PXView,
	PXFieldState,
	createSingle,
	PXScreen,
	graphInfo,
	PXFieldOptions,
	GridPagerMode,
	GridPreset,
	gridConfig,
	createCollection,
	columnConfig,
	GridAutoGrowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CS.CSCalendarMaint",
	primaryView: "Calendar",
})
export class CS209000 extends PXScreen {
	Calendar = createSingle(Calendar);
	CalendarBreakTimes = createCollection(CalendarBreakTimes);
}

export class Calendar extends PXView {
	CalendarID: PXFieldState;
	Description: PXFieldState;
	TimeZone: PXFieldState;
	WorkdayTime: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkdayTimeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class CalendarBreakTimes extends PXView {
	DayOfWeek: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }})
	StartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }})
	EndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	BreakTime: PXFieldState;
	Description: PXFieldState;
}

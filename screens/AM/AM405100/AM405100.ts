import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	linkCommand,
	columnConfig,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.WorkCenterCrewScheduleInq", primaryView: "Filter" })
export class AM405100 extends PXScreen {
	// to remove the button from the screen toolbar
	ViewSchedule: PXActionState;

	Filter = createSingle(Filter);
	ScheduleDetail = createCollection(ScheduleDetail);
}

export class Filter extends PXView {
	WcID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShiftCD: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ToDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAll: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	autoAdjustColumns: true,
})
export class ScheduleDetail extends PXView {
	WcID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ShiftCD: PXFieldState;
	SchdBlocks: PXFieldState;
	@linkCommand("ViewSchedule") SchdDate: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t" }) StartTime: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t" }) EndTime: PXFieldState;
	CrewSize: PXFieldState;
	ShiftCrewSize: PXFieldState;
	CrewSizeShortage: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	@columnConfig({ hideViewLink: true }) ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
}

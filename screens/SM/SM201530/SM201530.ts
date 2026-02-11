import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection, PXPageLoadBehavior } from "client-controls";
import { TaskManagerRunningProcessFilter, RowTaskInfo, RowActiveUserInfo, SystemEvent, SystemEvent2, SMPerformanceInfo, SMPerformanceFilterRow, SMPerformanceInfoSQL, SMPerformanceInfoTraceEvents, SMPerformanceInfoTraceEvents2, RowMemoryDumpOptions, MemoryDumpOptions, SMPerformanceInfoSQLWithStackTrace, SMPerformanceInfoTraceEventMessage } from "./views";

@graphInfo({graphType: "PX.SM.TaskManager", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues, hideScreenToolbar: true})
export class SM201530 extends PXScreen {
	MemoryDumpMode = MemoryDumpOptions;

	@viewInfo({containerName: "RUNNING PROCESSES"})
	Filter = createSingle(TaskManagerRunningProcessFilter);
	@viewInfo({containerName: "Operations"})
	Items = createCollection(RowTaskInfo);
	@viewInfo({containerName: "Active Users"})
	ActiveUsers = createCollection(RowActiveUserInfo);
	@viewInfo({containerName: "SYSTEM EVENTS"})
	SystemEvents = createCollection(SystemEvent);
	@viewInfo({containerName: "SYSTEM EVENTS"})
	CurrentSystemEvent = createSingle(SystemEvent2);
	@viewInfo({containerName: "REQUESTS IN PROGRESS"})
	Samples = createCollection(SMPerformanceInfo);
	@viewInfo({containerName: "Active Threads"})
	CurrentThreadsPanel = createSingle(SMPerformanceFilterRow);
	@viewInfo({containerName: "View SQL"})
	Sql = createCollection(SMPerformanceInfoSQL);
	SqlSummaryRowsPreview = createSingle(SMPerformanceInfoSQLWithStackTrace);
	@viewInfo({containerName: "Exception Profiler"})
	TraceExceptions = createCollection(SMPerformanceInfoTraceEvents);
	@viewInfo({containerName: "View Event Log"})
	TraceEvents = createCollection(SMPerformanceInfoTraceEvents2);
	TraceEventWithMessage = createSingle(SMPerformanceInfoTraceEventMessage);
	@viewInfo({containerName: "Create Memory Dump"})
	ViewMemoryDumpOptions = createSingle(RowMemoryDumpOptions);

	@handleEvent(CustomEventType.RowSelected, { view: "Items" })
	onRowTaskInfoChanged(args: RowSelectedHandlerArgs<PXViewCollection<RowTaskInfo>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.actionStop) model.actionStop.enabled = !!ar;
		if (model.actionShow) model.actionShow.enabled = !!ar;
	}
}

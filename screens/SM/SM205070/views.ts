import { PXView,
	PXFieldState,
	gridConfig,
	headerDescription,
	ICurrencyInfo,
	disabled,
	GridPreset,
	GridPagerMode,

	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	PXActionState,
	GridColumnGeneration,
	GridNoteFilesShowMode,
	fieldConfig} from "client-controls";

// Views

export class SMPerformanceFilterRow extends PXView {
	@fieldConfig({pinned: true})
	ProfilerEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({pinned: true})
	TimeLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	SqlCounterLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	ScreenId: PXFieldState<PXFieldOptions.CommitChanges>;
	UserId: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({pinned: true})
	SqlProfiler: PXFieldState<PXFieldOptions.CommitChanges>;
	SqlRowCounterLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	SqlTimeLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	SqlMethodFilter: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({pinned: true})
	SqlProfilerIncludeQueryCache: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({pinned: true})
	TraceExceptionsEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({pinned: true})
	TraceEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	LogLevelFilter: PXFieldState<PXFieldOptions.CommitChanges>;
	LogCategoryFilter: PXFieldState<PXFieldOptions.CommitChanges>;
	SqlProfilerShowStackTrace: PXFieldState;
}

@gridConfig({adjustPageSize: true, syncPosition: true, generateColumns: GridColumnGeneration.Append, showNoteFiles: GridNoteFilesShowMode.Suppress})
export class SMPerformanceInfo extends PXView {
	actionViewSql: PXActionState;
	actionViewTrace: PXActionState;
	actionViewScreen: PXActionState;
	actionPinRows: PXActionState;

	@columnConfig({allowFilter: false, width: 35})
	IsPinned: PXFieldState;
	@columnConfig({format: "dd MMM HH:mm:ss", width: 130})
	RequestStartTime: PXFieldState;
	UserId: PXFieldState;
	ScreenId: PXFieldState;
	@linkCommand("actionViewScreen")
	@columnConfig({width: 120})
	InternalScreenId: PXFieldState;
	RequestType: PXFieldState;
	Status: PXFieldState;
	CommandTarget: PXFieldState;
	CommandName: PXFieldState;
	ScriptTimeMs: PXFieldState;
	RequestTimeMs: PXFieldState;
	SelectTimeMs: PXFieldState<PXFieldOptions.Hidden>;
	SqlTimeMs: PXFieldState;
	RequestCpuTimeMs: PXFieldState;
	SqlCounter: PXFieldState;
	@linkCommand("actionViewSql")
	LoggedSqlCounter: PXFieldState;
	SqlRows: PXFieldState;
	SelectCounter: PXFieldState<PXFieldOptions.Hidden>;
	ExceptionCounter: PXFieldState;
	@linkCommand("actionViewExceptions")
	LoggedExceptionCounter: PXFieldState;
	EventCounter: PXFieldState;
	@linkCommand("actionViewTrace")
	LoggedEventCounter: PXFieldState;
	MemBeforeMb: PXFieldState;
	MemDeltaMb: PXFieldState<PXFieldOptions.Hidden>;
	MemoryWorkingSet: PXFieldState<PXFieldOptions.Hidden>;
	ProcessingItems: PXFieldState<PXFieldOptions.Hidden>;
	SessionLoadTimeMs: PXFieldState<PXFieldOptions.Hidden>;
	SessionSaveTimeMs: PXFieldState<PXFieldOptions.Hidden>;
	Headers: PXFieldState<PXFieldOptions.Hidden>;
	TenantId: PXFieldState<PXFieldOptions.Hidden>;
	InstallationId: PXFieldState<PXFieldOptions.Hidden>;
	SqlDigest: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({adjustPageSize: true, autoAdjustColumns: true, syncPosition: true})
export class SMPerformanceInfoSQLSummary extends PXView {
	@linkCommand("actionViewSqlSummaryRows")
	RecordId: PXFieldState;
	TableList: PXFieldState;
	SqlText: PXFieldState;
	QueryHash: PXFieldState;
	TotalSQLTime: PXFieldState;
	TotalExecutions: PXFieldState;
	TotalRows: PXFieldState;
}

@gridConfig({adjustPageSize: true, autoAdjustColumns: true, syncPosition: true})
export class SMPerformanceInfoExceptionSummary extends PXView {
	ActionViewExceptionDetails: PXActionState;

	Tenant: PXFieldState;
	ExceptionType: PXFieldState;
	ExceptionMessage: PXFieldState;
	Count: PXFieldState;
	@columnConfig({format: "dd MMM HH:mm:ss"})
	LastOccured: PXFieldState;
	LastUrl: PXFieldState;
	LastCommandTarget: PXFieldState;
	LastCommandName: PXFieldState;
	LastStackTrace: PXFieldState;
}

@gridConfig({adjustPageSize: true, autoAdjustColumns: true, syncPosition: true})
export class SMPerformanceInfoTraceEvents extends PXView {
	ActionViewEventDetails: PXActionState;

	@columnConfig({format: "dd MMM HH:mm:ss", width: 130})
	EventDateTime: PXFieldState;
	TraceType: PXFieldState;
	SMPerformanceInfo__UserId: PXFieldState;
	SMPerformanceInfo__TenantId: PXFieldState;
	Source: PXFieldState;
	SMPerformanceInfo__InternalScreenId: PXFieldState;
	ShortMessage: PXFieldState;
	StackTrace: PXFieldState;
	@linkCommand("actionOpenUrl")
	SMPerformanceInfo__ScreenId: PXFieldState;
	SMPerformanceInfo__CommandTarget: PXFieldState;
	SMPerformanceInfo__CommandName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoRepaint: ["SqlSummaryRowsPreview"]
})
export class SMPerformanceInfoSQL extends PXView {
	TableList: PXFieldState;
	QueryOrderID: PXFieldState<PXFieldOptions.Hidden>;
	SqlId: PXFieldState<PXFieldOptions.Hidden>;
	SQLHash: PXFieldState;
	NRows: PXFieldState;
	RequestStartTime: PXFieldState;
	SqlTimeMs: PXFieldState;
	ShortParams: PXFieldState;
	QueryCache: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoRepaint: ["TraceEventWithMessage"]
})
export class SMPerformanceInfoTraceEvents2 extends PXView {
	RequestStartTime: PXFieldState;
	Source: PXFieldState;
	ExceptionType: PXFieldState;
	MessageText: PXFieldState;
}

export class SMPerformanceInfoTraceEventMessage extends PXView {
	MessageWithStackTrace: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoRepaint: ["TraceEventWithMessage"]
})
export class SMPerformanceInfoTraceEvents3 extends PXView {
	RequestStartTime: PXFieldState;
	Source: PXFieldState;
	TraceType: PXFieldState;
	ShortMessage: PXFieldState;
}

export class SMPerformanceInfoSQLSummary2 extends PXView {
	RecordId: PXFieldState<PXFieldOptions.Disabled>;
	TotalSQLTime: PXFieldState;
	TotalExecutions: PXFieldState;
	TotalRows: PXFieldState;
}

@gridConfig({allowInsert: false, allowDelete: false, adjustPageSize: true, autoAdjustColumns: true, syncPosition: true,
	autoRepaint: ["SqlSummaryRowsPreview"]})
export class SMPerformanceInfoSQL2 extends PXView {
	TableList: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({format: "dd MMM HH:mm:ss"})
	RequestDateTime: PXFieldState;
	SQLParams: PXFieldState;
	SqlTimeMs: PXFieldState;
	NRows: PXFieldState;
	SMPerformanceInfo__ScreenId: PXFieldState;
	SMPerformanceInfo__CommandTarget: PXFieldState;
	SMPerformanceInfo__CommandName: PXFieldState;
	StackTrace: PXFieldState;
}

export class SMPerformanceInfoSQL3 extends PXView {
	SQLWithStackTrace: PXFieldState;
}

export class SMPerformanceInfoTraceEvents4 extends PXView {
	EventDateTime: PXFieldState<PXFieldOptions.Disabled>;
	TraceType: PXFieldState<PXFieldOptions.Disabled>;
	EventDetails: PXFieldState<PXFieldOptions.Disabled>;
	StackTrace: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoRepaint: ["TraceEventWithMessage"]
})
export class SMPerformanceInfoTraceEvents5 extends PXView {
	@columnConfig({format: "dd MMM HH:mm:ss"})
	EventDateTime: PXFieldState;
	SMPerformanceInfo__InternalScreenId: PXFieldState;
	SMPerformanceInfo__ScreenId: PXFieldState;
	SMPerformanceInfo__CommandTarget: PXFieldState;
	SMPerformanceInfo__CommandName: PXFieldState;
	StackTrace: PXFieldState;
}

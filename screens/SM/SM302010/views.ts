import {
	columnConfig,
	controlConfig,
	GridAutoGrowMode,
	gridConfig,
	GridPagerMode,
	GridPreset,
	linkCommand,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

// Views

@gridConfig({
	preset: GridPreset.Inquiry,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	fastFilterByAllFields: false,
	autoRepaint: ["DispatcherStatisticsPerHour", "DispatcherStatistics", "SlowLogs", "CurrentDispatcherSettings"],
	autoAdjustColumns: true
})
export class DispatchersStatus extends PXView  {
	@columnConfig({width: 500})
	QueueName: PXFieldState;
	IsCurrentNode: PXFieldState;
	QueueType: PXFieldState;
	Status: PXFieldState;
	QueueCount: PXFieldState;
	QueueSize: PXFieldState;
	@columnConfig({ format: "g" }) LastReportDateTime: PXFieldState;
	WebsiteID: PXFieldState;
}

export class DispatcherSettingsFilter extends PXView  {
	QueueType: PXFieldState<PXFieldOptions.CommitChanges>;
	LongProcessingThreshold: PXFieldState<PXFieldOptions.CommitChanges>;
	LogMaxLength: PXFieldState<PXFieldOptions.CommitChanges>;
	KeepStatisticsForPeriod: PXFieldState;
	LogDetails: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: true,
	autoAdjustColumns: true,
	fastFilterByAllFields: false,
	autoRepaint: ["DispatcherStatisticsPerHour"]
})
export class DispatcherStatisticsPerMinut extends PXView  {
	clearStatistics: PXActionState;

	@linkCommand("viewPerMinuteStatisticDetails")
	@columnConfig({format: "g"})
	CreatedDateTime: PXFieldState;
	Queued: PXFieldState;
	Processed: PXFieldState;
	QueueSize: PXFieldState;
	AverageProcessingTime: PXFieldState;
	MaxProcessingTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: true,
	autoAdjustColumns: true,
	fastFilterByAllFields: false,
	autoRepaint: ["DispatcherStatisticsPerMinut"]
})
export class DispatcherStatisticsPerHour extends PXView  {
	clearStatistics: PXActionState;

	@linkCommand("viewPerHourStatisticDetails")
	@columnConfig({format: "g"})
	CreatedDateTime: PXFieldState;
	Queued: PXFieldState;
	Processed: PXFieldState;
	QueueSize: PXFieldState;
	AverageProcessingTime: PXFieldState;
	MaxProcessingTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	fastFilterByAllFields: false,
	adjustPageSize: true,
})
export class DispatcherSlowLog extends PXView  {
	clearLog: PXActionState;

	@linkCommand("viewLog")
	@columnConfig({format: "g"})
	CreatedDateTime: PXFieldState;
	ProcessingTime: PXFieldState;
	Queries: PXFieldState;
}

export class QueueDispatcherLogBase extends PXView  {
	ProcessingTime: PXFieldState;
	Log: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled | PXFieldOptions.Multiline>;
}

export class StatisticDetailsFilter extends PXView  {
	From_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({timeMode: true})
	From_Time: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	To_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({timeMode: true})
	To_Time: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	QueueType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class PushNotificationsErrors extends PXView  {
	clearErrors: PXActionState;
	showSourceData: PXActionState;

	HookId: PXFieldState;
	@columnConfig({width: 150})	Source: PXFieldState;
	SourceEvent: PXFieldState;
	ErrorMessage: PXFieldState;
	TimeStamp: PXFieldState;
}

export class CurrentPushNotificationsError extends PXView  {
	SourceData: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Multiline>;
}

export class QueueNotificationSettingsSwitch extends PXView  {
	QueueType: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class QueueNotificationSettings extends PXView  {
	FillThreshold: PXFieldState<PXFieldOptions.CommitChanges>;
	IsEmailActive: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsMobileSmsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	MobileSmsNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsMobilePushActive: PXFieldState<PXFieldOptions.CommitChanges>;
	MobilePushNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class DispatcherStatisticQueryDetail extends PXView  {
	Query: PXFieldState;
	Field: PXFieldState;
	Count: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class DispatcherStatisticSourceDetail extends PXView  {
	ScreenID: PXFieldState;
	TableName: PXFieldState;
	Count: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class DispatcherStatisticEventDetail extends PXView  {
	BusinessEventName: PXFieldState;
	Count: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class DispatcherStatisticCommerceDetail extends PXView  {
	Connector: PXFieldState;
	Direction: PXFieldState;
	Count: PXFieldState;
}

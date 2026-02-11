import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo} from "client-controls";
import { DispatchersStatus, QueueDispatcherLogBase, StatisticDetailsFilter, DispatcherStatisticQueryDetail, DispatcherStatisticSourceDetail,
	DispatcherStatisticEventDetail, DispatcherStatisticCommerceDetail, PushNotificationsErrors, CurrentPushNotificationsError, QueueNotificationSettings,
	DispatcherSettingsFilter, DispatcherStatisticsPerMinut, DispatcherStatisticsPerHour, DispatcherSlowLog, QueueNotificationSettingsSwitch } from "./views";

@graphInfo({graphType: "PX.BusinessProcess.UI.QueueDispatchersMonitor", primaryView: "Status" })
export class SM302010 extends PXScreen {
	clearErrors: PXActionState;
	showSourceData: PXActionState;
	setNotificationSettingsOk: PXActionState;
	setNotificationSettingsCancel: PXActionState;
	clearStatistics: PXActionState;
	clearLog: PXActionState;
	ViewLog: PXActionState;
	viewPerHourStatisticDetails: PXActionState;
	viewPerMinuteStatisticDetails: PXActionState;

	Status = createCollection(DispatchersStatus);
	@viewInfo({containerName: "Statistics"})
	DispatcherSettings = createSingle(DispatcherSettingsFilter);
	@viewInfo({containerName: "Grouped by Hour"})
	DispatcherStatisticsPerHour = createCollection(DispatcherStatisticsPerHour);
   	@viewInfo({containerName: "Grouped by Minute"})
	DispatcherStatistics = createCollection(DispatcherStatisticsPerMinut);
	@viewInfo({containerName: "Performance Issues"})
	SlowLogs = createCollection(DispatcherSlowLog);
   	@viewInfo({containerName: "Queue Processing Log"})
	DispatcherLogDetail = createSingle(QueueDispatcherLogBase);
   	@viewInfo({containerName: "Trigger Details"})
	DetailsFilter = createSingle(StatisticDetailsFilter);
   	@viewInfo({containerName: "Trigger Details"})
	TriggeredByFields = createCollection(DispatcherStatisticQueryDetail);
   	@viewInfo({containerName: "Trigger Details"})
	TriggeredBySources = createCollection(DispatcherStatisticSourceDetail);
   	@viewInfo({containerName: "Trigger Details"})
	TriggeredByEvent = createCollection(DispatcherStatisticEventDetail);
   	@viewInfo({containerName: "Trigger Details"})
	StatisticCommerceDetail = createCollection(DispatcherStatisticCommerceDetail);
   	@viewInfo({containerName: "Errors"})
	Errors = createCollection(PushNotificationsErrors);
   	@viewInfo({containerName: "Source Data"})
	CurrentError = createSingle(CurrentPushNotificationsError);
   	@viewInfo({containerName: "Notification Settings"})
	CurrentNotificationSettings = createSingle(QueueNotificationSettings);
	@viewInfo({containerName: "Notification Settings Switch"})
	NotificationSettingsSwitch = createSingle(QueueNotificationSettingsSwitch);
}
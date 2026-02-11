import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
} from "client-controls";
import { Notification, Notification2, NotificationReport, NotificationReportParameter, BPEvent, BPEventData, CurrentNotificationReport, SendGridDesignImportParameters, NotificationSchedule, Notification3 } from "./views";

@graphInfo({graphType: "PX.SM.SMNotificationMaint", primaryView: "Notifications", })
export class SM204003 extends PXScreen {
	ViewBusinessEvent: PXActionState;
	RedirectToScreen: PXActionState;

	Notifications = createSingle(Notification);
	CurrentNotification = createSingle(Notification2);
   	@viewInfo({containerName: "Reports Attached by Report ID"})
	NotificationReports = createCollection(NotificationReport);
   	CurrentNotificationReport = createSingle(CurrentNotificationReport);
   	@viewInfo({containerName: "Report Parameters"})
	NotificationReportParameters = createCollection(NotificationReportParameter);
   	@viewInfo({containerName: "Send by Events"})
	BusinessEvents = createCollection(BPEvent);
   	@viewInfo({containerName: "Create Business Event"})
	NewEventData = createSingle(BPEventData);

	SendGridDesignImportParametersView = createSingle(SendGridDesignImportParameters);

	@viewInfo({containerName: "Send by Schedules"})
	Schedules = createCollection(NotificationSchedule);
	@viewInfo({containerName: "View Schedule History"})
	ScheduleHistory = createCollection(Notification3);

	@handleEvent(CustomEventType.RowSelected, { view: "Notifications" })
	onNotificationRowSelected(args: RowSelectedHandlerArgs<Notification>) {
		const activeRow = args.viewModel;

		if (activeRow) {
			activeRow.ScreenID.unpinned = true;
		}
	}
}

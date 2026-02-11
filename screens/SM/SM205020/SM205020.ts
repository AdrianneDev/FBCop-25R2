import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	PXDatetimeFieldState,
	CustomEventType,
	handleEvent,
	RowSelectedHandlerArgs,
	PXViewCollection,
} from "client-controls";
import { AUSchedule, AUScheduleFilter, AUScheduleFill, BPEvent, AUScheduleHeader, NotificationSchedule } from "./views";

@graphInfo({graphType: "PX.SM.AUScheduleMaint", primaryView: "Schedule", })
export class SM205020 extends PXScreen {
	viewBusinessEvent: PXActionState;

	@viewInfo({containerName: "Automation Schedule"})
	Schedule = createSingle(AUScheduleHeader);

	@viewInfo({containerName: ""})
	CurrentSchedule = createSingle(AUSchedule);

	@viewInfo({containerName: "Conditions"})
	Filters = createCollection(AUScheduleFilter);

	@viewInfo({containerName: "Filter Values"})
	Fills = createCollection(AUScheduleFill);

	@viewInfo({containerName: "Events"})
	BPEvents = createCollection(BPEvent);

	@viewInfo({containerName: "Email Notifications"})
	EmailNotifications = createCollection(NotificationSchedule);

	@handleEvent(CustomEventType.RowSelected, {view: "Filters"})
	onAUScheduleFilterRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<AUScheduleFilter>>) {
		const activeRow = args.viewModel.activeRow;

		if (activeRow) {
			activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
			activeRow.Value2?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}

	@handleEvent(CustomEventType.RowSelected, {view: "Fills"})
	onAUScheduleFillRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<AUScheduleFill>>) {
		const activeRow = args.viewModel.activeRow;

		if (activeRow) {
			activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}
}

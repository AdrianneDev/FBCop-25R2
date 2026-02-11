import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	handleEvent,
	CustomEventType,
	PXViewCollection,
	RowSelectedHandlerArgs,
	PXDatetimeFieldState
} from "client-controls";
import { BPEvent, BPEvent2, BPEventTriggerCondition, BPEventSubscriber, BPEventTrackingField, BPEventSchedule, BPInquiryParameter, BPEvent3, CreateScriptPanel } from "./views";

@graphInfo({graphType: "PX.BusinessProcess.UI.BusinessProcessEventMaint", primaryView: "Events" })
export class SM302050 extends PXScreen {

	Events = createSingle(BPEvent);
	CurrentEvent = createSingle(BPEvent2);
	@viewInfo({containerName: "Trigger Conditions"})
	TriggerConditions = createCollection(BPEventTriggerCondition);


	@viewInfo({containerName: "Subscribers"})
	Subscribers = createCollection(BPEventSubscriber);


	@viewInfo({containerName: "Fields to Track"})
	TrackingFields = createCollection(BPEventTrackingField);


	@viewInfo({containerName: "Schedules"})
	Schedules = createCollection(BPEventSchedule);


	@viewInfo({containerName: "Inquiry Parameters"})
	InquiryParameters = createCollection(BPInquiryParameter);


	@viewInfo({containerName: "View Schedule History"})
	ScheduleHistory = createCollection(BPEvent3);


	@viewInfo({containerName: "Create Import Scenario"})
	CreateScriptPanelView = createSingle(CreateScriptPanel);

	@handleEvent(CustomEventType.RowSelected, {view: "TriggerConditions"})
	onBPEventTriggerConditionChanged(args: RowSelectedHandlerArgs<PXViewCollection<BPEventTriggerCondition>>) {
		const viewModel = args.viewModel;
		const ar = args.viewModel.activeRow;
		if (viewModel.conditionUp) {
			viewModel.conditionUp.imageSet = "main";
			viewModel.conditionUp.imageKey = "ArrowUp";
			viewModel.conditionUp.enabled = ar != null;
		}
		if (viewModel.conditionDown) {
			viewModel.conditionDown.imageSet = "main";
			viewModel.conditionDown.imageKey = "ArrowDown";
			viewModel.conditionDown.enabled = ar != null;
		}

		if (ar) {
			ar.Value?.to(PXDatetimeFieldState).showRelativeDates();
			ar.Value2?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}

	@handleEvent(CustomEventType.RowSelected, {view: "Subscribers"})
	onBPEventSubscriberChanged(args: RowSelectedHandlerArgs<PXViewCollection<BPEventSubscriber>>) {
		const viewModel = args.viewModel;
		const ar = args.viewModel.activeRow;
		if (viewModel.subscriberUp) viewModel.subscriberUp.enabled = ar != null;
		if (viewModel.subscriberDown) viewModel.subscriberDown.enabled = ar != null;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "InquiryParameters" })
	onInquiryParametersSelected(args: RowSelectedHandlerArgs<PXViewCollection<BPInquiryParameter>>) {
		const activeRow = args.viewModel.activeRow;

		if (activeRow) {
			activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}
}
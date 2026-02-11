import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	handleEvent,
	CustomEventType,
	PXViewCollection,
	RowSelectedHandlerArgs,
	PXDatetimeFieldState
} from "client-controls";
import { TaskTemplate, TaskTemplateSetting, BPEvent, BPEventData, CurrentTaskTemplate } from "./views";

@graphInfo({graphType: "PX.SM.TaskTemplateMaint", primaryView: "TaskTemplates", })
export class SM204005 extends PXScreen {
	ViewBusinessEvent: PXActionState;

	TaskTemplates = createSingle(TaskTemplate);
	CurrentTaskTemplate = createSingle(CurrentTaskTemplate);

	@viewInfo({containerName: "Task Settings"})
	TaskTemplateSettings = createCollection(TaskTemplateSetting);
	@viewInfo({containerName: "Created by Events"})
	BusinessEvents = createCollection(BPEvent);
	@viewInfo({containerName: "Create Business Event"})
	NewEventData = createSingle(BPEventData);

	@handleEvent(CustomEventType.RowSelected, { view: "TaskTemplates" })
	onTaskTemplateRowSelected(args: RowSelectedHandlerArgs<TaskTemplate>) {
		const activeRow = args.viewModel;

		if (activeRow) {
			activeRow.Summary.unpinned = true;
		}
	}

	@handleEvent(CustomEventType.RowSelected, { view: "TaskTemplateSettings" })
	onFieldValueRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<TaskTemplateSetting>>) {
		const activeRow = args.viewModel.activeRow;

		if (activeRow) {
			activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}
}
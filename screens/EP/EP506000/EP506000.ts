import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { DeferFilter, ReminderList } from "./views";

@graphInfo({graphType: "PX.Objects.EP.TasksAndEventsReminder", primaryView: "ReminderList", hideFilesIndicator: true, hideNotesIndicator: true, hideScreenToolbar: true, disableReminder: true })
export class EP506000 extends PXScreen {
	ReminderList = createCollection(ReminderList);

	@viewInfo({ containerName: "Snooze" })
		DeferFilter = createSingle(DeferFilter);
}

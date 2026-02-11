import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	createSingle,
} from "client-controls";

export abstract class SelectNotificationTemplateBase {

	@viewInfo({ containerName: "Dialog: Select Template" })
	NotificationInfo = createSingle(NotificationFilter);
}

export class NotificationFilter extends PXView {
	NotificationName: PXFieldState<PXFieldOptions.CommitChanges>;
	InsertTemplateText: PXFieldState<PXFieldOptions.CommitChanges>;
}

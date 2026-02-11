import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, TextAlign, GridPreset } from "client-controls";

export class NotificationEvent extends PXView  {
	NotificationBody: PXFieldState<PXFieldOptions.Multiline>;
}

@gridConfig({
	preset: GridPreset.Processing,
	fastFilterByAllFields: false,
	allowUpdate: false
})
export class PushNotificationsFailedToSend extends PXView  {
	@columnConfig({allowResize: false, width: 60, textAlign: TextAlign.Center, allowCheckAll: true})
	Selected: PXFieldState;

	@columnConfig({hideViewLink: true})
	HookId: PXFieldState;
	TimeStamp: PXFieldState;
	Source: PXFieldState;

	@columnConfig({width: 600})
	ErrorMessage: PXFieldState;

	@columnConfig({width: 100, textAlign: TextAlign.Center})
	Truncated: PXFieldState;
}
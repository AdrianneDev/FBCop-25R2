import {
	graphInfo,
	PXScreen,
	PXView,
	PXFieldState,
	gridConfig,
	createSingle,
	createCollection,
	PXFieldOptions,
	PXActionState,
	GridPreset,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
} from "client-controls";
@graphInfo({ graphType: "PX.Api.Webhooks.Graph.WebhookMaint", primaryView: "Webhook", bpEventsIndicator: false })
export class SM304000 extends PXScreen {
	Webhook = createSingle(Webhook);
	WebhookRequest = createCollection(WebhookRequest);
	WebhookRequestCurrent = createSingle(WebhookRequestCurrent);

	@handleEvent(CustomEventType.RowSelected, { view: "WebhookRequest" })
	onWebhookRequestSelected(args: RowSelectedHandlerArgs<PXViewCollection<WebhookRequest>>) {
		const model = args.viewModel;
		const row = args.viewModel.activeRow;

		model.ShowRequestDetails.enabled = !!row;
		model.ClearRequestsLog.enabled = !!row;
	}
}

export class Webhook extends PXView {
	Name: PXFieldState;
	Handler: PXFieldState;
	Url: PXFieldState<PXFieldOptions.Disabled>;
	IsActive: PXFieldState;
	IsSystem: PXFieldState<PXFieldOptions.Disabled>;
	RequestLogLevel: PXFieldState;
	RequestRetainCount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	allowUpdate: false,
	syncPosition: true,
})
export class WebhookRequest extends PXView {
	ShowRequestDetails: PXActionState;
	ClearRequestsLog: PXActionState;

	Type: PXFieldState;
	ReceivedFrom: PXFieldState;
	ReceiveDate: PXFieldState;
	ResponseStatus: PXFieldState;
}

export class WebhookRequestCurrent extends PXView {
	Type: PXFieldState<PXFieldOptions.Disabled>;
	Request: PXFieldState<PXFieldOptions.Disabled>;
	ResponseStatus: PXFieldState<PXFieldOptions.Disabled>;
	ProcessingTime: PXFieldState<PXFieldOptions.Disabled>;
	Response: PXFieldState<PXFieldOptions.Disabled>;
	Error: PXFieldState<PXFieldOptions.Disabled>;
}


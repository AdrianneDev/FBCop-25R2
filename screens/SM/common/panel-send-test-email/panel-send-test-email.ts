import {
	PXView,
	PXFieldState,
	createSingle,
} from "client-controls";

export abstract class SendTestEmailBase {
	SendTestEmailFilter = createSingle(SendTestEmailFilter);
}

export class SendTestEmailFilter extends PXView {
	EmailAddress: PXFieldState;
}

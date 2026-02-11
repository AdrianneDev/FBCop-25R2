import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createSingle,
	PXFieldOptions,
	viewInfo,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CR.CRSMEmailMaint", primaryView: "Email" })
export class CR306035 extends PXScreen {

	@viewInfo({ containerName: "Email" })
	Email = createSingle(Email);
}

export class Email extends PXView {
	NoteID: PXFieldState<PXFieldOptions.Hidden>;
	MailFrom: PXFieldState<PXFieldOptions.Disabled>;
	MailTo: PXFieldState<PXFieldOptions.Disabled>;
	mailCc: PXFieldState<PXFieldOptions.Disabled>;
	mailBcc: PXFieldState<PXFieldOptions.Disabled>;
	Subject: PXFieldState<PXFieldOptions.Disabled>;
	MPStatus: PXFieldState<PXFieldOptions.Disabled>;
	Exception: PXFieldState<PXFieldOptions.Disabled>;
	Body: PXFieldState<PXFieldOptions.Disabled>;
}

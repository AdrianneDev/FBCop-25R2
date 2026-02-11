import { CR306015 } from "../CR306015";

import {
	PXView,
	createCollection,
	PXFieldState,
	gridConfig,
	featureInstalled,
	GridPreset,
	viewInfo,
} from "client-controls";

export interface CR306015_SendGrid extends CR306015 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+SendGridIntegration")
export class CR306015_SendGrid {

	@viewInfo({ containerName: "Tracking" })
	SendGridRecipients = createCollection(SMSendGridRecipient);
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	allowUpdate: false,
	autoAdjustColumns: true,
})
export class SMSendGridRecipient extends PXView {
	Address: PXFieldState;
	Name: PXFieldState;
	Status: PXFieldState;
	OpenedCount: PXFieldState;
	ClickedCount: PXFieldState;
	ReportedAsSpamCount: PXFieldState;
	OptedOutCount: PXFieldState;
	MailServiceReply: PXFieldState;
}

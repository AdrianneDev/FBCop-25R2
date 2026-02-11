import { CR306015 } from "../CR306015";

import {
	PXView,
	PXFieldState,
	featureInstalled,
	PXFieldOptions,
	viewInfo,
	createSingle,
	controlConfig,
	IDatetimeEditControlConfig
} from "client-controls";

export interface CR306015_SendGridSendAt extends CR306015 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+SendGridIntegration")
export class CR306015_SendGridSendAt {

	@viewInfo({ containerName: "Dialog: Send At" })
	SendAtInfo = createSingle(SendAtFilter);
}

export class SendAtFilter extends PXView {
	SendAt_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SendAt_Time: PXFieldState<PXFieldOptions.CommitChanges>;
}

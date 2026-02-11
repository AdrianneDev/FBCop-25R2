import { CR301000 } from "../CR301000";
import {
	createSingle,
	PXView,
	viewInfo,
	PXFieldState,
	PXFieldOptions,
} from "client-controls";

export interface CR301000_LinkAccount extends CR301000 {}
export class CR301000_LinkAccount {

	@viewInfo({ containerName: "Dialog: Associate Entities", syncAlways: true })
	LinkAccount = createSingle(LinkAccountFilter);
}

export class LinkAccountFilter extends PXView {
	LinkAccountOption: PXFieldState<PXFieldOptions.CommitChanges>;
	IsWizardOpen: PXFieldState;
}

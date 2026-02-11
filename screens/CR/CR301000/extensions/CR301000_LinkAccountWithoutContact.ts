import { CR301000 } from "../CR301000";
import {
	createSingle,
	PXView,
	viewInfo,
	PXFieldState,
	PXFieldOptions,
} from "client-controls";

export interface CR301000_LinkAccountWithoutContact extends CR301000 {}
export class CR301000_LinkAccountWithoutContact {

	@viewInfo({ containerName: "Dialog: Associate Account with Lead" })
	LinkAccountWithoutContact = createSingle(LinkAccountFilter2);
}

export class LinkAccountFilter2 extends PXView {
	WithoutContactOption: PXFieldState<PXFieldOptions.CommitChanges>;
}

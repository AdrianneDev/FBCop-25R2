import {
	createSingle,
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo
} from "client-controls";
import { CR308000 } from "../CR308000";

export interface CR308000_SendMassMail extends CR308000 {}
export class CR308000_SendMassMail {

	@viewInfo({ containerName: "Dialog: Preview Message" })
	MassMailPrepare = createSingle(CRMassMailPrepare);
}

export class CRMassMailPrepare extends PXView {
	CampaignUpdateListMembers: PXFieldState<PXFieldOptions.CommitChanges>;
}

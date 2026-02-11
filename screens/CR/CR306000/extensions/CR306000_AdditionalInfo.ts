import { CR306000 } from "../CR306000";
import {
	PXView,
	PXFieldState,
	createSingle,
	viewInfo,
} from "client-controls";

export interface CR306000_AdditionalInfo extends CR306000 {}
export class CR306000_AdditionalInfo {

	@viewInfo({ containerName: "Activity Statistics" })
	CaseActivityStatistics = createSingle(CaseActivityStatistics);
}

export class CaseActivityStatistics extends PXView {
	InitialOutgoingActivityCompletedAtDate: PXFieldState;
	LastIncomingActivityDate: PXFieldState;
	LastOutgoingActivityDate: PXFieldState;
}

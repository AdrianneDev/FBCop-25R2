import { CR306000 } from "../CR306000";
import { PXFieldState, PXView, featureInstalled, createSingle } from "client-controls";

export interface CR306000_CaseCommitments extends CR306000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+CaseCommitmentsTracking")
export class CR306000_CaseCommitments {
	CaseCommitments = createSingle(CaseCommitments);
}

@featureInstalled("PX.Objects.CS.FeaturesSet+CaseCommitmentsTracking")
export class CaseCommitments extends PXView {
	InitialResponseDueDateTime: PXFieldState;
	HeaderInitialResponseDueDateTime: PXFieldState;
	ResponseDueDateTime: PXFieldState;
	HeaderResponseDueDateTime: PXFieldState;
	ResolutionDueDateTime: PXFieldState;
	HeaderResolutionDueDateTime: PXFieldState;
}

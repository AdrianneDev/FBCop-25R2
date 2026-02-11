import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnDisplayMode,
	featureInstalled,
	FeaturesSet,
} from "client-controls";
import { RQ101000 } from "../RQ101000";

export interface RQ101000_Approvals extends RQ101000 { }
@featureInstalled(FeaturesSet.ApprovalWorkflow)
export class RQ101000_Approvals {
	@viewInfo({ containerName: "Approval" })
	SetupApproval = createCollection(SetupApproval);
}

@gridConfig({
	preset: GridPreset.Details,
})
export class SetupApproval extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;

	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({displayMode: GridColumnDisplayMode.Text })
	AssignmentNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

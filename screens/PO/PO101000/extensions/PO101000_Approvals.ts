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
import { PO101000 } from "../PO101000";

export interface PO101000_Approvals extends PO101000 { }
@featureInstalled(FeaturesSet.ApprovalWorkflow)
export class PO101000_Approvals {
	@viewInfo({ containerName: "Approval" })
	SetupApproval = createCollection(POSetupApproval);
}

@gridConfig({
	preset: GridPreset.Details,
})
export class POSetupApproval extends PXView {
	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;

	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AssignmentNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
}
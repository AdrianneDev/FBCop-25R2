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
import { SO101000 } from "../SO101000";

export interface SO101000_Approvals extends SO101000 { }
@featureInstalled(FeaturesSet.ApprovalWorkflow)
export class SO101000_Approvals {
	@viewInfo({ containerName: "Approval" })
	SetupApproval = createCollection(SetupApproval);

	@viewInfo({ containerName: "Invoice Approval" })
	SetupInvoiceApproval = createCollection(SetupInvoiceApproval);
}

@gridConfig({
	preset: GridPreset.Details,
})
export class SetupApproval extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;

	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AssignmentNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class SetupInvoiceApproval extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	DocType: PXFieldState<PXFieldOptions.CommitChanges>;

	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AssignmentNotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

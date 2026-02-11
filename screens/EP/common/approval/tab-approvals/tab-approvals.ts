import {
	PXView,
	PXFieldState,
	createCollection,
	gridConfig,
	GridPreset,
	columnConfig,
	createSingle,
	viewInfo,
	PXFieldOptions, GridColumnShowHideMode
} from "client-controls";
import { ReasonApproveRejectParams } from "../panel-approval-reason/panel-approval-reason";
import { ReassignApprovalFilter } from "../panel-reassign-approvals/panel-reassign-approvals";

export abstract class ApprovalsBase {

	@viewInfo({ containerName: "Approvals" })
	Approval = createCollection(EPApproval);

	@viewInfo({ containerName: "Dialog: Reassign Approval" })
	ReassignApprovalFilter = createSingle(ReassignApprovalFilter);

	@viewInfo({ containerName: "Enter Reason" })
	ReasonApproveRejectParams = createSingle(ReasonApproveRejectParams);
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowUpdate: false,
	allowInsert: false,
	fastFilterByAllFields: false,
})
export class EPApproval extends PXView {
	ApproverEmployee__AcctCD: PXFieldState;
	ApproverEmployee__AcctName: PXFieldState;
	@columnConfig({ hideViewLink: true }) WorkgroupID: PXFieldState;
	ApprovedByEmployee__AcctCD: PXFieldState;
	ApprovedByEmployee__AcctName: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrigOwnerID: PXFieldState<PXFieldOptions.Hidden>;
	ApproveDate: PXFieldState;
	Status: PXFieldState;
	Reason: PXFieldState<PXFieldOptions.Multiline>;
	AssignmentMapID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true }) RuleID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true }) StepID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
}

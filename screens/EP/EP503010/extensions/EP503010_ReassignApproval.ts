import { ReassignApprovalFilter } from "src/screens/EP/common/approval/panel-reassign-approvals/panel-reassign-approvals";
import { EP503010 } from "../EP503010";
import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createCollection,
	createSingle,
} from "client-controls";

export interface EP503010_ReassignApproval extends EP503010 { }
export class EP503010_ReassignApproval {
	ReassignApprovalFilter = createSingle(ReassignApprovalFilter);
}

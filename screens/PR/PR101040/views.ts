import {
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Locations extends PXView {
	LocationCD: PXFieldState;
	Description: PXFieldState;
	IsActive: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
}
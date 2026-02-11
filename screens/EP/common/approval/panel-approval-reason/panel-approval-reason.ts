import {
	PXFieldState,
	PXView,
	PXFieldOptions,
	controlConfig,
} from "client-controls";

export class ReasonApproveRejectParams extends PXView {
	@controlConfig({type: 1, rows: 5, enterKeyAddsNewLine: true})
	Reason: PXFieldState<PXFieldOptions.CommitChanges>;
}

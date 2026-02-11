import {
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class MasterView extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	Mode: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ToDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ProFormaRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeNonBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeLineAttachments: PXFieldState<PXFieldOptions.CommitChanges>;
}

import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";

export abstract class DuplicateReferenceBase {
	@viewInfo({ containerName: "Duplicate Reference Nbr." })
	duplicatefilter = createSingle(DuplicateFilter);
}

export class DuplicateFilter extends PXView {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Label: PXFieldState;
}

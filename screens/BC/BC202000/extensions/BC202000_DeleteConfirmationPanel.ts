import {
	BC202000
} from "../BC202000";

import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	createSingle,
} from "client-controls";

export interface BC202000_DeleteConfirmationPanel extends BC202000 { }
export class BC202000_DeleteConfirmationPanel {
	DeleteConfirmationPanel = createSingle(DeleteConfirmationPanel);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class DeleteConfirmationPanel extends PXView {
	EntityName: PXFieldState<PXFieldOptions.CommitChanges>;
}

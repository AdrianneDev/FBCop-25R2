import {
	BC301000
} from "../BC301000";

import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
} from "client-controls";

export interface BC301000_StatusEditPanel extends BC301000 { }
export class BC301000_StatusEditPanel {
	StatusEditPanel = createSingle(StatusEditPanel);
}

export class StatusEditPanel extends PXView {
	ConnectorType: PXFieldState<PXFieldOptions.CommitChanges>;
	BindingID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityType: PXFieldState<PXFieldOptions.CommitChanges>;
	LocalID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternID: PXFieldState<PXFieldOptions.CommitChanges>;
	NeedSync: PXFieldState<PXFieldOptions.CommitChanges>;
}

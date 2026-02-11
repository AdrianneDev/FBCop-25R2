import {
	gridConfig,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset
} from "client-controls";

export class Setup extends PXView {
	SubcontractNumberingID: PXFieldState;
	RequireSubcontractControlTotal: PXFieldState;
	SubcontractRequestApproval: PXFieldState;
}

export class SetupApproval extends PXView {
	AssignmentMapID: PXFieldState;
	AssignmentNotificationID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class Attributes extends PXView {
	IsActive: PXFieldState;
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	SortOrder: PXFieldState;
	Required: PXFieldState;
	CSAttribute__IsInternal: PXFieldState;
	ControlType: PXFieldState;
	DefaultValue: PXFieldState;
	Type: PXFieldState;
}

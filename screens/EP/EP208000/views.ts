import {
	columnConfig,
	gridConfig,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	headerDescription,
} from "client-controls";

export class Equipment extends PXView {
	@headerDescription
	EquipmentCD: PXFieldState;
	@headerDescription
	Description: PXFieldState;
	IsActive: PXFieldState;
}

export class EquipmentProperties extends PXView {
	FixedAssetID: PXFieldState;
	RunRateItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	SetupRateItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	SuspendRateItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	RunRate: PXFieldState;
	SetupRate: PXFieldState;
	SuspendRate: PXFieldState;
	DefaultAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultSubID: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class Rates extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	PMProject__Description: PXFieldState;
	RunRate: PXFieldState;
	SetupRate: PXFieldState;
	SuspendRate: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	EquipmentID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({ preset: GridPreset.Attributes })
export class Answers extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	Value: PXFieldState;
}

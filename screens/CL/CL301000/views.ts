import {
	PXView,
	PXFieldState,
	gridConfig,

	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	TextAlign,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

export class LienWaiverSetup extends PXView {
	ShouldWarnOnBillEntry: PXFieldState<PXFieldOptions.CommitChanges>;
	ShouldWarnOnPayment: PXFieldState<PXFieldOptions.CommitChanges>;
	ShouldStopPayments: PXFieldState<PXFieldOptions.CommitChanges>;
	ShouldGenerateConditional: PXFieldState<PXFieldOptions.CommitChanges>;
	GenerateWithoutCommitmentConditional: PXFieldState<PXFieldOptions.CommitChanges>;
	GenerationEventConditional: PXFieldState;
	ThroughDateSourceConditional: PXFieldState;
	GroupByConditional: PXFieldState;
	ShouldGenerateUnconditional: PXFieldState<PXFieldOptions.CommitChanges>;
	GenerateWithoutCommitmentUnconditional: PXFieldState<PXFieldOptions.CommitChanges>;
	GenerationEventUnconditional: PXFieldState;
	ThroughDateSourceUnconditional: PXFieldState;
	GroupByUnconditional: PXFieldState;
}

export class ComplianceAttributeFilter extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class ComplianceAttribute extends PXView {
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class CSAttributeGroup extends PXView {
	IsActive: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox
	})
	Required: PXFieldState;
	CSAttribute__IsInternal: PXFieldState;
	ControlType: PXFieldState;
	@columnConfig({ fullState: true })
	DefaultValue: PXFieldState;
}

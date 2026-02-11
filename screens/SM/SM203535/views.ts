import { PXView, PXFieldState, gridConfig, PXFieldOptions, GridPreset } from "client-controls";

// Views

export class SendTestMessageDialog extends PXView {
	TO: PXFieldState<PXFieldOptions.CommitChanges>;
	Body: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SmsPlugin extends PXView {
	Name: PXFieldState;
	PluginTypeName: PXFieldState<PXFieldOptions.CommitChanges>;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	fastFilterByAllFields: false,
})
export class SmsPluginParameter extends PXView {
	Name: PXFieldState;
	Description: PXFieldState;
	Value: PXFieldState;
}
import {
	PXView,
	PXFieldState,
	gridConfig,
	columnConfig,
	createCollection,
	createSingle,
	GridPagerMode,
	GridPreset,
	PXFieldOptions,
	localizable,
	IWizardConfig,
	Messages,
} from "client-controls";

export abstract class UpdateParamsBase {
	abstract getUpdateCaption();
	Fields = createCollection(FieldValue);
	Attributes = createCollection(Attributes);
	WizardSummary = createSingle(UpdateSummary);
	WizardConfig: IWizardConfig = {
		caption: this.getUpdateCaption(),
		nextCommand: "wizardNext",
		buttons: {
			done: Messages.Finish,
		},
	};
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	fastFilterByAllFields: false,
	showTopBar: false,
})
export class FieldValue extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35, allowResize: false })
	Selected: PXFieldState;
	DisplayName: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}
@gridConfig({
	preset: GridPreset.ReadOnly,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	fastFilterByAllFields: false,
	showTopBar: false,
})
export class Attributes extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35, allowResize: false })
	Selected: PXFieldState;
	DisplayName: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Required: PXFieldState;
}

export class UpdateSummary extends PXView {
	Summary: PXFieldState;
}

import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnType,
	TextAlign,
	GridPreset,
	controlConfig,
	PXActionState,
} from "client-controls";

// Views

export class GetLinkFilterType extends PXView  {
	WikiLink: PXFieldState;
}

export class SYProviderField extends PXView  {
	Command: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SYProvider extends PXView  {
	Name: PXFieldState;
	@controlConfig({displayMode: "text"})
	ProviderType: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	actionsConfig: {exportToExcel: {hidden: true}},
})
export class SYProviderParameter extends PXView  {
	reloadParameters: PXActionState;

	@columnConfig({width: 108})
	Name: PXFieldState;
	@columnConfig({width: 208})
	DisplayName: PXFieldState;
	@columnConfig({width: 408})
	Value: PXFieldState;
}

export class SYProviderObject extends PXView  {
	Command: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	actionsConfig: {exportToExcel: {hidden: true}},
	autoRepaint: ["Fields"],
})
export class SYProviderObjectDetail extends PXView {
	fillSchemaObjects: PXActionState;
	showObjectCommand: PXActionState;

	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState;
	@columnConfig({width: 200})
	Name: PXFieldState;
	@columnConfig({width: 150})
	Command: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	initNewRow: true,
})
export class SYProviderFieldDetail extends PXView  {
	fillSchemaFields: PXActionState;
	showFieldCommand: PXActionState;
	toggleFieldsActivation: PXActionState;

	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState;
	@columnConfig({width: 100})
	Name: PXFieldState;
	@columnConfig({allowNull: false, width: 50, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsKey: PXFieldState;
	@columnConfig({allowUpdate: false, width: 200})
	DisplayName: PXFieldState;
	@columnConfig({allowUpdate: false})
	DataType: PXFieldState;
	@columnConfig({width: 54, textAlign: TextAlign.Right})
	DataLength: PXFieldState;
	@columnConfig({width: 150})
	Command: PXFieldState;
}

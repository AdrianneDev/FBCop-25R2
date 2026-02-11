import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, PXActionState, GridPreset, treeConfig, controlConfig, localizable } from "client-controls";

export class EntityEndpoint extends PXView {
	InterfaceName: PXFieldState<PXFieldOptions.CommitChanges>;
	GateVersion: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SelectedEntityEndpoint extends PXView {
	InterfaceName: PXFieldState<PXFieldOptions.Disabled>;
	GateVersion: PXFieldState<PXFieldOptions.Disabled>;
	SystemContractVersion: PXFieldState<PXFieldOptions.Disabled>;
	ExtendsName: PXFieldState<PXFieldOptions.Disabled>;
	ExtendsVersion: PXFieldState<PXFieldOptions.Disabled>;
}

@localizable
class Messages {
	static Insert = "Insert";
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "Key",
	textField: "Title",
	iconField: "Icon",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	hideToolbarSearch: true,
	openedLayers: 1,
	autoRepaint: ["SelectedEndpoint", "SelectedEntity", "SelectedAction", "Fields", "Parameters"],
	autoRepaintCommand: "EnablePopulate",
	topBarItems: {
		InsertNew: { config: { commandName: "InsertNew", text: Messages.Insert, images: { normal: "main@AddNew" }}},
		DeleteNode: { config: { commandName: "DeleteNode", images: { normal: "main@Remove" }}}
	},
})
export class EntityTreeNode extends PXView {
	InsertNew: PXActionState;
	DeleteNode: PXActionState;

	Title: PXFieldState;
	Key: PXFieldState;
	Icon: PXFieldState;
}

export class EntityDescription extends PXView {
	@controlConfig({displayMode: "id"})
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	ObjectType: PXFieldState;
	@controlConfig({ displayMode: "text" })
	ScreenID: PXFieldState;
	ScreenIDValue: PXFieldState<PXFieldOptions.Disabled>;
	DefaultActionId: PXFieldState;
}

export class EntityActionDescription extends PXView {
	ActionName: PXFieldState;
	MappedAction: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false
})
export class EntityFieldDescription extends PXView {
	PopulateFields: PXActionState;
	ExtendEntity: PXActionState;
	ValidateEntity: PXActionState;

	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	MappedObject: PXFieldState<PXFieldOptions.CommitChanges>;
	MappedField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	FieldType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false
})
export class EntityActionParameterDescription extends PXView {
	PopulateParameters: PXActionState;
	validateAction: PXActionState;

	ParameterName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	MappedObject: PXFieldState<PXFieldOptions.CommitChanges>;
	MappedField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ParameterType: PXFieldState<PXFieldOptions.CommitChanges>;
	MappingKey: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class EntityDescriptionInsertModel extends PXView {
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	ParameterName: PXFieldState<PXFieldOptions.CommitChanges>;
	UseExisting: PXFieldState<PXFieldOptions.CommitChanges>;
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	ObjectType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ displayMode: "text" })
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScreenIDValue: PXFieldState<PXFieldOptions.Disabled>;
	EntityType: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class EntityEndpointInsertModel extends PXView {
	ExtendedEndpointName: PXFieldState<PXFieldOptions.Disabled>;
	ExtendedEndpointVersion: PXFieldState<PXFieldOptions.Disabled>;
	EndpointName: PXFieldState;
	EndpointVersion: PXFieldState;
}

export class ActionDescriptionInsertModel extends PXView {
	MappedAction: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class PopulateFilter extends PXView {
	Container: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowSelectorFields: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class PopulatingField extends PXView {
	SelectAll: PXActionState;
	ClearAll: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Populate: PXFieldState;
	Field: PXFieldState<PXFieldOptions.CommitChanges>;
}

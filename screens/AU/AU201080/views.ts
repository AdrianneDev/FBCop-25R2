import { PXView, PXFieldState, columnConfig, gridConfig, PXFieldOptions, GridColumnType, TextAlign, GridPreset, GridFastFilterVisibility, GridColumnShowHideMode } from "client-controls";

// Views
export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

export class CustObject extends PXView {
	Name: PXFieldState;
	ScreenId: PXFieldState;
	Description: PXFieldState;

	@columnConfig({ allowUpdate: false, })
	LastModifiedByID_Modifier_Username: PXFieldState;

	@columnConfig({ allowUpdate: false, })
	LastModifiedDateTime: PXFieldState;
}

export class RowExtensionInfo extends PXView {
	HtmlContent: PXFieldState;
	ExtensionName: PXFieldState;
}

export class RowScreenHtmlEdit extends PXView {
	ScreenId: PXFieldState;
	HtmlContent: PXFieldState;
	HtmlError: PXFieldState;
}

export class NewTsDataFieldFilter extends PXView {
	DataView: PXFieldState<PXFieldOptions.CommitChanges>;
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	Search: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class NewTsDataViewFilter extends PXView {
	DataView: PXFieldState<PXFieldOptions.CommitChanges>;
	ViewType: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState<PXFieldOptions.CommitChanges>;
	DacName: PXFieldState<PXFieldOptions.CommitChanges>;
	Preset: PXFieldState;
}

export class NewFieldPropsFilter extends PXView {
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	IsReadOnly: PXFieldState;
	Hidden: PXFieldState;
	NoLabel: PXFieldState;
	Multiline: PXFieldState;
	CommitChanges: PXFieldState;
	Disabled: PXFieldState;
}

export class NewFilterNewBaseViewPropsFilter extends PXView {
	BaseView: PXFieldState;
}

export class NewFilterNewViewPropsFilter extends PXView {
	ViewName: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassName: PXFieldState;
	ContainerName: PXFieldState;
}


export class EditTsFilter extends PXView {
	ExtensionName: PXFieldState<PXFieldOptions.CommitChanges>;
	ValidationError: PXFieldState;
	TsContent: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
	showTopBar: false
})
export class RowNewFieldToTs extends PXView {
	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox, allowCheckAll: true }) Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowFastFilter: false })
	Container: PXFieldState;
	@columnConfig({ allowFastFilter: false })
	ObjectName: PXFieldState;
	@columnConfig({ allowFastFilter: true })
	FieldName: PXFieldState;
	@columnConfig({ allowFastFilter: true })
	DisplayName: PXFieldState;
}
export class RowScreenTsEdit extends PXView {
	TsContent: PXFieldState;
}

export class RowAttributesEditor extends PXView {
	ViewName: PXFieldState;
	FieldName: PXFieldState;
	CustomProperties: PXFieldState;
	CustomPropertiesModified: PXFieldState;
	OriginalProperties: PXFieldState;
}

export class RowFilterAddAttributes extends PXView {}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoAdjustColumns: true,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showTopBar: true,
	syncPosition: true,
	autoRepaint: ["AddDecoratorProperties"],
})
export class RowAddDecorators extends PXView {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Decorator: PXFieldState;

	@columnConfig({ allowFastFilter: false, width: 60 })
	Selected: PXFieldState;
	@columnConfig({ allowFastFilter: true, width: 200 })
	DisplayName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoAdjustColumns: true,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showTopBar: true,
	syncPosition: true,
})
export class RowAddDecoratorProperties extends PXView {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Decorator: PXFieldState;
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Position: PXFieldState;
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Path: PXFieldState;

	@columnConfig({ allowFastFilter: false, width: 60 })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowFastFilter: true, width: 200 })
	DisplayName: PXFieldState;
	@columnConfig({ allowFastFilter: false, width: 300, fullState: true, editorConfig: { comboBox: true } })
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}

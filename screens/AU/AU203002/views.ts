import { PXView, PXFieldState, localizable, gridConfig, controlConfig, ScreenUpdateParams, headerDescription, ICurrencyInfo, disabled, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, TextAlign, GridPreset, GridFilterBarVisibility, GridFastFilterVisibility, GridPagerMode, fieldConfig } from "client-controls";

@localizable
export class TopBarItem {
	static AddColumns = "Add Columns";
	static Up = "Up";
	static Down = "Down";
}

// Views

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

export class RowFilter extends PXView  {
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
})
export class RowDacField extends PXView  {
	@columnConfig({width: 200})	FieldName: PXFieldState;
}

export class RowFieldAttributes extends PXView  {
	Method: PXFieldState<PXFieldOptions.CommitChanges>;
	StorageType: PXFieldState;
	BqlFieldName: PXFieldState<PXFieldOptions.Disabled>;
	@fieldConfig({
		controlType: "qp-code-editor"
	})
	DacAttrEdit: PXFieldState;
	@fieldConfig({
		controlType: "qp-code-editor",
		controlConfig: {
			readOnly: true
		}
	})
	DacAttrReadonly: PXFieldState;
	FieldTitle: PXFieldState<PXFieldOptions.Disabled>;
}

export class RowAddField extends PXView  {
	NewFieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState;
	StorageType: PXFieldState<PXFieldOptions.CommitChanges>;
	DataType: PXFieldState<PXFieldOptions.CommitChanges>;
	Length: PXFieldState;
	Precision: PXFieldState;
}

export class WZAddField extends PXView  {
	baseFieldName: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	autoAdjustColumns: true,
	keepPosition: true,
	topBarItems: {
		actionAddColumns: {index: 0, config: {commandName: "actionAddColumns", text: TopBarItem.AddColumns }},
		actionColumnUp: {index: 1, config: {commandName: "actionColumnUp", text: TopBarItem.Up }},
		actionColumnDown: {index: 2, config: {commandName: "actionColumnDown", text: TopBarItem.Down }},
	}
})
export class RowSelectorColumn extends PXView  {
	actionAddColumns: PXActionState;
	actionColumnUp: PXActionState;
	actionColumnDown: PXActionState;
	@columnConfig({width: 200})	DisplayName: PXFieldState;
	@columnConfig({width: 200})	Name: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoAdjustColumns: true,
	allowSort: true
})
export class RowAddSelectorColumn extends PXView  {
	@columnConfig({type: GridColumnType.CheckBox, allowSort: false}) Selected: PXFieldState;
	DisplayName: PXFieldState;
	Name: PXFieldState;
	@columnConfig({allowSort: false}) FieldType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	autoRepaint: new ScreenUpdateParams ({
		views: ["ViewListProps"],
		commitChanges: true
	})
})
export class RowFieldAttr extends PXView  {
	@columnConfig({width: 200})	DisplayName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	autoAdjustColumns: true
})
export class RowFieldProp extends PXView  {
	@columnConfig({width: 200})	Name: PXFieldState;
	@columnConfig({width: 200})	PropValue: PXFieldState;
}

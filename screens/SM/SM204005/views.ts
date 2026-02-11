import {
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	gridConfig,
	GridPreset,
	linkCommand,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign,
	controlConfig,
	fieldConfig,
} from "client-controls";
import { NullTextValues } from "../../common/messages";

// Views

export class TaskTemplate extends PXView  {
	@controlConfig({
		nullText: NullTextValues.New,
		displayMode: "text"
	})
	TaskTemplateID: PXFieldState;
	Name: PXFieldState;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "Key",
				valueField: "Path",
				dataMember: "EntityItemsWithPrevious",
				textField: "Name",
				iconField: "Icon",
				mode: "multi",
			},
			allowEditValue: true,
			multiSelect: true,
			valueTemplate: "{1} <{0}>",
		}
	})
	Summary: PXFieldState;
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			selectorTabTitle: "Employees",
			treeConfig: {
				idField: "Key",
				dataMember: "ScreenOwnerEntityItems",
				textField: "Name",
				valueField: "Path",
				iconField: "Icon",
				mode: "single",
				openedLayers: 1,
			},
			selectorConfig: {
				view: "ScreenOwnerUserItems",
				key: "Path",
				description: "Name",
				hideKeyField: "true",
			},
		}
	})
	OwnerName: PXFieldState;
	LocaleName: PXFieldState;
	attachActivity: PXFieldState;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			allowEditValue: true,
			treeConfig: {
				idField: "Key",
				valueField: "Path",
				dataMember: "EntityItems",
				textField: "Name",
				iconField: "Icon",
				mode: "single",
			},
		}
	})
	RefNoteID: PXFieldState;
	ShowCreatedByEventsTabExpr: PXFieldState;
}

export class CurrentTaskTemplate extends PXView  {
	Body: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class TaskTemplateSetting extends PXView  {
	@columnConfig({allowNull: false, width: 50, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState;
	@columnConfig({width: 175})
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false, width: 75, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	FromSchema: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowSort: false, width: 150, editorConfig: { comboBox: true }})
	Value: PXFieldState;
	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class BPEvent extends PXView  {
	createBusinessEvent: PXActionState;

	@linkCommand("ViewBusinessEvent")
	Name: PXFieldState;
	Description: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox})
	Active: PXFieldState;
	@columnConfig({width: 200})
	Type: PXFieldState;
}

export class BPEventData extends PXView  {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
}
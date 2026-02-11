import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	controlConfig,
	columnConfig,
	GridColumnShowHideMode,
	PXActionState,
	commitChanges,
	linkCommand,
	GridColumnType,
	GridPreset,
	localizable,
	GridNoteFilesShowMode,
	GridFilterBarVisibility, TextAlign
} from "client-controls";

@localizable
class Messages {
	static Insert = "Insert";
	static InsertFrom = "Insert From...";
	static SubstitutionLists = "Substitution Lists";
	static ShowAllCommandsFilterHeader = "Show All Commands";
}

export class SYInsertFrom extends PXView {
	MappingID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class BPEventData extends PXView {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SYMapping extends PXView {
	@commitChanges Name: PXFieldState;
	@controlConfig({ displayMode: "text" })
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({allowEdit: true })
	ProviderID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({displayMode: "id"})
	ProviderObject: PXFieldState<PXFieldOptions.CommitChanges>;
	SyncType: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	Visible: PXFieldState<PXFieldOptions.CommitChanges>;
	IsSimpleMapping: PXFieldState;
	SitemapTitle: PXFieldState;
	WorkspaceID: PXFieldState;
	SubcategoryID: PXFieldState;
	@controlConfig({displayMode: "text"})
	FormatLocale: PXFieldState;
	ProcessInParallel: PXFieldState<PXFieldOptions.CommitChanges>;
	BreakOnError: PXFieldState;
	BreakOnTarget: PXFieldState;
	DiscardResult: PXFieldState;
	ShowCreatedByEventsTabExpr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	initNewRow: true,
	actionsConfig: {exportToExcel: {hidden: true}, import: {hidden: true}},
	topBarItems: {
		rowInsert: { config: {commandName: "rowInsert", text: Messages.Insert} },
		rowUp: { config: {commandName: "rowUp", isSystem: true, images: { normal: "main@ArrowUp" } } },
		rowDown: { config: {commandName: "rowDown", isSystem: true, images: { normal: "main@ArrowDown" } } },
		insertFrom: { config: {commandName: "insertFrom", text: Messages.InsertFrom} },
		viewSubstitutions: { config: {commandName: "viewSubstitutions", text: Messages.SubstitutionLists} },
	},
	autoAdjustColumns: true,
	blankFilterHeader: Messages.ShowAllCommandsFilterHeader,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class SYMappingField extends PXView {
	rowInsert: PXActionState;
	rowUp: PXActionState;
	rowDown: PXActionState;
	insertFrom: PXActionState;
	viewSubstitutions: PXActionState;

	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	FullFieldNameHidden: PXFieldState;
	@columnConfig({
		editorType: "qp-tree-selector",
		editorConfig: {
			treeConfig: {
				dataMember: "MappingFieldTree",
				idField: "Key",
				valueField: "Value",
				textField: "Text",
				iconField: "Icon",
				toolTipField: "Value",
				mode: "single",
				hideRootNode: true,
				openedLayers: 0
			},
			allowEditValue: true
		}
	})
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	NeedCommit: PXFieldState<PXFieldOptions.CommitChanges>;
	NeedSearch: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: {
			comboBox: true,
			applicationFunctions: false,
			programFunctions: [
				"IIf( expr, truePart, falsePart )",
				"IsNull( value, nullValue )",
				"NullIf( value1, value2 )",
				"SubstituteAll( sourceField, substitutionList )",
				"SubstituteListed( sourceField, substitutionList )",
				"Switch( expr1, value1, expr2, value2, ...)"
			]
		},
		width: 350
	})
	Value: PXFieldState;
	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	IgnoreError: PXFieldState;
	ExecuteActionBehavior: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false})
	LineNbr: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false})
	OrderNumber: PXFieldState;
	IsVisible: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false})
	ParentLineNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class SYImportCondition extends PXView {
	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	IsActive: PXFieldState;
	@columnConfig({allowNull: false})
	OpenBrackets: PXFieldState;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false})
	Condition: PXFieldState;
	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	IsRelative: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Value2: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false})
	CloseBrackets: PXFieldState;
	@columnConfig({allowNull: false})
	Operator: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class SYMappingCondition extends PXView {
	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	IsActive: PXFieldState;
	@columnConfig({allowNull: false})
	OpenBrackets: PXFieldState;
	FieldNameHidden: PXFieldState;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false})
	Condition: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Value2: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false})
	CloseBrackets: PXFieldState;
	@columnConfig({allowNull: false})
	Operator: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowUpdate: false,
	fastFilterByAllFields: false,
})
export class BPEvent extends PXView {
	createBusinessEvent: PXActionState;

	@linkCommand("ViewBusinessEvent")
	Name: PXFieldState;
	Description: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox})
	Active: PXFieldState;
	Type: PXFieldState;
}

import {
	columnConfig,
	commitChanges,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	gridConfig,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign,
	localizable,
	controlConfig,
	GridFilterBarVisibility,
	GridNoteFilesShowMode,
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

export class SYMapping extends PXView {
	@commitChanges Name: PXFieldState;
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({allowEdit: true })
	ProviderID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ displayMode: GridColumnDisplayMode.Value })
	ProviderObject: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false})
	SyncType: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	Visible: PXFieldState<PXFieldOptions.CommitChanges>;
	SitemapTitle: PXFieldState;
	WorkspaceID: PXFieldState;
	SubcategoryID: PXFieldState;
	FormatLocale: PXFieldState;
	@columnConfig({allowNull: false})
	RepeatingData: PXFieldState;
	IsExportOnlyMappingFields: PXFieldState;
	DiscardResult: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	actionsConfig: {exportToExcel: {hidden: true}, import: {hidden: true}},
	topBarItems: {
		rowInsert: { config: {commandName: "rowInsert", text: Messages.Insert} },
		rowUp: { config: {commandName: "rowUp", isSystem: true, images: { normal: "main@ArrowUp" } } },
		rowDown: { config: {commandName: "rowDown", isSystem: true, images: { normal: "main@ArrowDown" } } },
		insertFrom: { config: {commandName: "insertFrom", text: Messages.InsertFrom} },
		viewSubstitutions: { config: {commandName: "viewSubstitutions", text: Messages.SubstitutionLists} },
	},
	initNewRow: true,
	blankFilterHeader: Messages.ShowAllCommandsFilterHeader,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class SYMappingField extends PXView {
	rowInsert: PXActionState;
	rowUp: PXActionState;
	rowDown: PXActionState;
	insertFrom: PXActionState;
	viewSubstitutions: PXActionState;

	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	ObjectNameHidden: PXFieldState;
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldNameHidden: PXFieldState;
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
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	NeedCommit: PXFieldState<PXFieldOptions.CommitChanges>;
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
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, suppressExport: false})
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	IsVisible: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, suppressExport: false})
	ParentLineNbr: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	initNewRow: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class SYMappingCondition extends PXView {
	@columnConfig({allowNull: false, textAlign: TextAlign.Center})
	IsActive: PXFieldState;
	@columnConfig({allowNull: false})
	OpenBrackets: PXFieldState;
	ObjectNameHidden: PXFieldState;
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
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

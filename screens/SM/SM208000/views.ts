import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	controlConfig,
	fieldConfig,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridColumnType,
	GridNoteFilesShowMode,
	PXActionState,
	TextAlign,
	GridPreset,
	localizable,
	GridAutoGrowMode,
	GridFastFilterVisibility,
	PXSelectorMode
} from "client-controls";

@localizable
class ActionCaption {
	static AddRelatedTableRelations = "Add Related Table";
	static BrowseForRelation = "Add Relations";
	static ShowAvailableValues = "Combo Box Values";
}

@localizable
class ActionToolTip {
	static AddRelatedTableRelationsToolTip = "Add a related table for the selected table";
	static BrowseForRelationToolTip = "Add a relation between tables";
	static ShowAvailableValuesToolTip = "Display the list of combo box values";
}

// Views

@gridConfig({
	preset: GridPreset.ShortList,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
})
export class ComboValues extends PXView {
	@columnConfig({ width: 108 }) Value: PXFieldState;
	@columnConfig({ width: 108 }) Label: PXFieldState;
}

export class RelatedTable extends PXView {
	ParentTable: PXFieldState<PXFieldOptions.CommitChanges>;
	ChildTable: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeHidden: PXFieldState<PXFieldOptions.CommitChanges>;
	Relation: PXFieldState<PXFieldOptions.Multiline>;
	ParentAlias: PXFieldState;
	ChildAlias: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	quickFilterFields: ["Name", "DisplayName", "FullName"]
})
export class SingleTable extends PXView {
	selectParentTable: PXActionState;
	selectChildTable: PXActionState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server }) Name: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server }) DisplayName: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server }) LinkedToFields: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server }) FullName: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server }) LinkedFrom: PXFieldState;
}

export class ChangeIDParam extends PXView {
	CD: PXFieldState;
}

export class GIDesign extends PXView {
	@controlConfig({
		spellcheck: false,
		fastFilterFields: ["name"]
	})
	Name: PXFieldState;
	SitemapTitle: PXFieldState;
	WorkspaceID: PXFieldState;
	SubcategoryID: PXFieldState;
	SitemapScreenID: PXFieldState;
	ShowDeletedRecords: PXFieldState;
	ShowArchivedRecords: PXFieldState;
	ExposeViaOData: PXFieldState;
	ExposeViaMobile: PXFieldState;
	FilterColCount: PXFieldState;
	SelectTop: PXFieldState;
	PageSize: PXFieldState;
	ExportTop: PXFieldState;
	NotesAndFilesTable: PXFieldState;
	MLDetectionEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	DesignID: PXFieldState;
}

export class GIDesign2 extends PXView {
	toLowCodeMode: PXActionState;
	toAdvancedMode: PXActionState;
	revertDraft: PXActionState;

	DefaultSortOrder: PXFieldState;
	@fieldConfig({
		controlType: "qp-formula-editor",
		controlConfig: { comboBox: true }
	})
	RowStyleFormula: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ displayMode: "text" })
	PrimaryScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplacePrimaryScreen: PXFieldState<PXFieldOptions.CommitChanges>;
	MassActionsOnRecordsEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	MassDeleteEnabled: PXFieldState;
	AutoConfirmDelete: PXFieldState;
	MassRecordsUpdateEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	NewRecordCreationEnabled: PXFieldState<PXFieldOptions.CommitChanges>;

	MLDetectionEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	MLTargetColumn: PXFieldState<PXFieldOptions.CommitChanges>;
	MLTimeAxis: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipEmptyGroups: PXFieldState;
	MLReCalcIntervalType: PXFieldState;

	@fieldConfig({
		controlType: "qp-radio",
	})
	DesignerMode: PXFieldState;

	@fieldConfig({
		controlType: "qp-code-editor",
	})
	Query: PXFieldState;

	DesignID: PXFieldState<PXFieldOptions.Hidden>;
	IsDraft: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	initNewRow: true,
	showFastFilter: GridFastFilterVisibility.False,
	autoGrowInHeight: GridAutoGrowMode.Fit,
})
export class GIMLGroups extends PXView {
	@columnConfig({allowNull: false, allowShowHide: GridColumnShowHideMode.False})
	DataFieldName: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoRepaint: ["RelatedTables", "TablesInformation"]
})
export class GITable extends PXView {
	addRelatedTable: PXActionState;
	@linkCommand("NavigateToDataSource")
	@columnConfig({ width: 250, displayMode: GridColumnDisplayMode.Text, editorConfig: { selectorMode: PXSelectorMode.TextModeEditable} })
	Name: PXFieldState;
	@columnConfig({ width: 250 }) Description: PXFieldState;
	@columnConfig({ width: 250 }) Alias: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox }) IsAddRelatedTableAllowed: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	keepPositionFields: ["ParentTable", "JoinType", "ChildTable"],
	initNewRow: true,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	autoRepaint: ["JoinConditions", "RelatedTables", "TablesInformation"],
	topBarItems: {
		moveUpRelations: {
			index: 3,
			config: {
				commandName: "moveUpRelations",
				images: { normal: "main@ArrowUp" }
			}
		},
		moveDownRelations: {
			index: 4,
			config: {
				commandName: "moveDownRelations",
				images: { normal: "main@ArrowDown" }
			}
		},
		addRelatedTableRelations: {
			index: 5,
			config: {
				commandName: "addRelatedTableRelations",
				text: ActionCaption.AddRelatedTableRelations,
				toolTip: ActionToolTip.AddRelatedTableRelationsToolTip
			}
		}
	}
})
export class GIRelation extends PXView {
	moveUpRelations: PXActionState;
	moveDownRelations: PXActionState;
	addRelatedTableRelations: PXActionState;
	@columnConfig({ allowNull: false, width: 80, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ width: 200 }) ParentTable: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false, width: 120 }) JoinType: PXFieldState;
	@columnConfig({ width: 200 }) ChildTable: PXFieldState<PXFieldOptions.CommitChanges>;
	LineNbr: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox }) IsAddRelatedTableAllowed: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	keepPositionFields: ["ParentField", "Condition", "ChildField"],
	initNewRow: "forceUpdate",
	autoGrowInHeight: GridAutoGrowMode.Fill,
	topBarItems: {
		moveUpOn: {
			index: 3,
			config: {
				commandName: "moveUpOn",
				images: { normal: "main@ArrowUp" }
			}
		},
		moveDownOn: {
			index: 4,
			config: {
				commandName: "moveDownOn",
				images: { normal: "main@ArrowDown" }
			}
		},
		browseForRelation: {
			index: 5,
			config: {
				commandName: "browseForRelation",
				text: ActionCaption.BrowseForRelation,
				toolTip: ActionToolTip.BrowseForRelationToolTip
			}
		}
	}
})
export class GIOn extends PXView {
	moveUpOn: PXActionState;
	moveDownOn: PXActionState;
	browseForRelation: PXActionState;
	@columnConfig({ width: 85 }) OpenBrackets: PXFieldState;
	@columnConfig({
		width: 200,
		editorConfig: { comboBox: true }, fullState: true
	}) ParentField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false, width: 130 }) Condition: PXFieldState;
	@columnConfig({
		width: 150,
		editorConfig: { comboBox: true }, fullState: true
	}) ChildField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 85 }) CloseBrackets: PXFieldState;
	@columnConfig({ allowNull: false, width: 85 }) Operation: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 0,
	keepPosition: true,
	keepPositionFields: ["Name"],
	initNewRow: true,
	topBarItems: {
		moveUpFilter: {
			index: 3,
			config: {
				commandName: "moveUpFilter",
				images: { normal: "main@ArrowUp" }
			}
		},
		moveDownFilter: {
			index: 4,
			config: {
				commandName: "moveDownFilter",
				images: { normal: "main@ArrowDown" }
			}
		},
		showAvailableValues: {
			index: 5,
			config: {
				commandName: "showAvailableValues",
				text: ActionCaption.ShowAvailableValues,
				toolTip: ActionToolTip.ShowAvailableValuesToolTip
			}
		}
	}
})
export class GIFilter extends PXView {
	moveUpFilter: PXActionState;
	moveDownFilter: PXActionState;
	showAvailableValues: PXActionState;
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ allowNull: false, width: 85, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) Required: PXFieldState;
	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) Hidden: PXFieldState;
	@columnConfig({ width: 180, fullState: true }) Name: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 250, fullState: true }) FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 180 }) DisplayName: PXFieldState;
	@columnConfig({ width: 95, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsExpression: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 100, fullState: true }) DefaultValue: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false, width: 95, textAlign: TextAlign.Right }) ColSpan: PXFieldState;
	@columnConfig({ width: 95 }) Size: PXFieldState;
	@columnConfig({ width: 95 }) LabelSize: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	syncPosition: false,
	keepPosition: true,
	keepPositionFields: ["DataFieldName", "Condition", "Value1", "Value2"],
	initNewRow: true,
	topBarItems: {
		moveUpCondition: {
			index: 3,
			config: {
				commandName: "moveUpCondition",
				images: { normal: "main@ArrowUp" }
			}
		},
		moveDownCondition: {
			index: 4,
			config: {
				commandName: "moveDownCondition",
				images: { normal: "main@ArrowDown" }
			}
		}
	}
})
export class GIWhere extends PXView {
	moveUpCondition: PXActionState;
	moveDownCondition: PXActionState;
	@columnConfig({ allowSort: false, allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ allowSort: false, width: 72 }) OpenBrackets: PXFieldState;
	@columnConfig({ allowSort: false, width: 250 }) DataFieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, allowNull: false, width: 120 }) Condition: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, width: 95, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsExpression: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		fullState: true, allowSort: false, width: 250, editorConfig: { comboBox: true }
	}) Value1: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		fullState: true, allowSort: false, width: 250, editorConfig: { comboBox: true }
	}) Value2: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, width: 72 }) CloseBrackets: PXFieldState;
	@columnConfig({ allowSort: false, allowNull: false, width: 72 }) Operation: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	keepPositionFields: ["DataFieldName"],
	initNewRow: true,
	topBarItems: {
		moveUpGroupBy: {
			index: 3,
			config: {
				commandName: "moveUpGroupBy",
				images: { normal: "main@ArrowUp" }
			}
		},
		moveDownGroupBy: {
			index: 4,
			config: {
				commandName: "moveDownGroupBy",
				images: { normal: "main@ArrowDown" }
			}
		}
	}
})
export class GIGroupBy extends PXView {
	moveUpGroupBy: PXActionState;
	moveDownGroupBy: PXActionState;
	@columnConfig({ allowNull: false, width: 100, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({
		width: 300, editorType: "qp-formula-editor",
		editorConfig: { comboBox: true }, fullState: true
	}) DataFieldName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	keepPositionFields: ["DataFieldName"],
	initNewRow: true,
	topBarItems: {
		moveUpSortings: {
			index: 3,
			config: {
				commandName: "moveUpSortings",
				images: { normal: "main@ArrowUp" }
			}
		},
		moveDownSortings: {
			index: 4,
			config: {
				commandName: "moveDownSortings",
				images: { normal: "main@ArrowDown" }
			}
		}
	}
})
export class GISort extends PXView {
	moveUpSortings: PXActionState;
	moveDownSortings: PXActionState;
	@columnConfig({
		allowSort: false,
		allowNull: false,
		width: 100, textAlign:
		TextAlign.Center, type:
		GridColumnType.CheckBox
	}) IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		allowSort: false,
		width: 300,
		editorType: "qp-formula-editor",
		editorConfig: { comboBox: true }, fullState: true
	}) DataFieldName: PXFieldState;
	@columnConfig({
		allowSort: false,
		allowNull: false,
		width: 150
	}) SortOrder: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "PasteLine"
})
export class GIResult extends PXView {
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ width: 180, allowDragDrop: true }) ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		width: 180, editorType: "qp-formula-editor",
		editorConfig: { comboBox: true }, allowDragDrop: true, fullState: true
	}) Field: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 180, allowDragDrop: true }) SchemaField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 108 }) Caption: PXFieldState;
	@columnConfig({ allowNull: true, width: 100 }) AggregateFunction: PXFieldState;
	@columnConfig({ width: 100 }) TotalAggregateFunction: PXFieldState;
	@columnConfig({ width: 85, textAlign: TextAlign.Right }) Width: PXFieldState;
	@columnConfig({
		width: 100, textAlign: TextAlign.Right, editorType: "qp-formula-editor",
		editorConfig: { comboBox: true }
	}) StyleFormula: PXFieldState;
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsVisible: PXFieldState;
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) QuickFilter: PXFieldState;
	@columnConfig({ allowNull: false, width: 80, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) FastFilter: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false, width: 110, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) DefaultNav: PXFieldState;
	@columnConfig({ width: 180 }) NavigationNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	initNewRow: true,
})
export class GIRecordDefault extends PXView {
	@columnConfig({ width: 150 }) FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 240 }) Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoAdjustColumns: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoRepaint: ["NavigationParameters", "NavigationConditions", "CurrentNavigationScreen"]
})
export class GINavigationScreen extends PXView {
	@columnConfig({
		allowSort: false,
		allowNull: false,
		width: 60,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox
	}) IsActive: PXFieldState;
	@columnConfig({ displayMode: GridColumnDisplayMode.Both, editorConfig: { displayMode: "text", selectorMode: PXSelectorMode.TextModeEditable } })
	Link: PXFieldState<PXFieldOptions.CommitChanges>;
	WindowMode: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class GINavigationScreen2 extends PXView {
	Icon: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomTitle: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	initNewRow: true,
	autoAdjustColumns: true,
})
export class GINavigationParameter extends PXView {
	@columnConfig({ width: 100 }) FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		fullState: true, width: 180, editorConfig: { comboBox: true }
	}) ParameterName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, width: 95, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsExpression: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	initNewRow: true
})
export class GINavigationCondition extends PXView {
	@columnConfig({ allowSort: false, allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ allowSort: false, width: 70 }) OpenBrackets: PXFieldState;
	@columnConfig({ allowSort: false, width: 180 }) DataField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, allowNull: false, width: 120 }) Condition: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, width: 95, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsExpression: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		allowSort: false, width: 120, editorType: "qp-formula-editor",
		editorConfig: { comboBox: true }
	}) ValueSt: PXFieldState;
	@columnConfig({
		allowSort: false, width: 120, visible: false, editorType: "qp-formula-editor",
		editorConfig: { comboBox: true }
	}) ValueSt2: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowSort: false, width: 70 }) CloseBrackets: PXFieldState;
	@columnConfig({ allowSort: false, allowNull: false, width: 70 }) Operator: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	initNewRow: true,
})
export class GIMassUpdateField extends PXView {
	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ width: 300 }) FieldName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	initNewRow: true,
	autoInsert: true,
})
export class GIMassAction extends PXView {
	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ width: 300 }) ActionName: PXFieldState;
}

export class CustomMessageDialogParams extends PXView {
	Message: PXFieldState<PXFieldOptions.Disabled>;
}

export class CustomMessageDialogParams2 extends PXView {
	Message: PXFieldState<PXFieldOptions.Disabled>;
}

export class CustomMessageDialogParams3 extends PXView {
	Message: PXFieldState<PXFieldOptions.Disabled>;
}

export class CustomMessageDialogParams4 extends PXView {
	Message: PXFieldState<PXFieldOptions.Disabled>;
}

export class ExitAdvancedModeDialogParams extends PXView {
	Message: PXFieldState<PXFieldOptions.Disabled>;
}

export class SaveDraftDialogParams extends PXView {
	Message: PXFieldState<PXFieldOptions.Disabled>;
}

export class SiteMapWithAccessRights extends PXView {
	Title: PXFieldState<PXFieldOptions.CommitChanges>;
	Workspace: PXFieldState<PXFieldOptions.CommitChanges>;
	Category: PXFieldState<PXFieldOptions.CommitChanges>;
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccessRights: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyFromScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
}

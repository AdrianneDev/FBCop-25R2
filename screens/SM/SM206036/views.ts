import {
	columnConfig,
	GridColumnGeneration,
	GridColumnShowHideMode,
	GridColumnType,
	gridConfig, GridPagerMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	controlConfig,
	TextAlign,
	GridNoteFilesShowMode,
} from "client-controls";

// Views

export class SYMappingSimpleProperty extends PXView  {
	@controlConfig({displayMode: "id"})
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	Name: PXFieldState;
	@controlConfig({ displayMode: "text" })
	ProviderType: PXFieldState;
}

export class SYMapping extends PXView  {
	@controlConfig({allowEdit: true })
	Name: PXFieldState;
	@controlConfig({ displayMode: "text"})
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	NbrRecords: PXFieldState<PXFieldOptions.Disabled>;
	IsSimpleMapping: PXFieldState;
	ProcessInParallel: PXFieldState<PXFieldOptions.CommitChanges>;
	BreakOnError: PXFieldState;
	BreakOnTarget: PXFieldState;
	DiscardResult: PXFieldState;
}
@gridConfig({
	preset: GridPreset.Details,
	generateColumns: GridColumnGeneration.AppendDynamic,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	autoSaveLayout: true,
	allowDelete: false,
	allowSort: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class SYData extends PXView  {
	replace: PXActionState;
	addSubstitution: PXActionState;
	switchActivation: PXActionState;
	switchActivationUntilError: PXActionState;
	switchProcessing: PXActionState;
	clearErrors: PXActionState;

	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	CanAddSubstitutions: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	MappingID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({width: 50})
	LineNbr: PXFieldState;
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState;
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsProcessed: PXFieldState;
	@columnConfig({width: 100})
	ErrorMessage: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	topBarItems: {
		RefreshFromFile: {index: 0, config: {commandName: "RefreshFromFile", text: "Refresh from File"}},
	}
})
export class SYMappingField extends PXView  {
	RefreshFromFile: PXActionState;
	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsActive: PXFieldState;
	@columnConfig({
		width: 250,
		editorType: "qp-formula-editor",
		editorConfig: {
			comboBox: true
		}
	})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	IsKey: PXFieldState;
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
		},
		width: 250
	})
	FieldName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	fastFilterByAllFields: false
})
export class SYHistory extends PXView  {
	@columnConfig({width: 200, format: "g"})
	StatusDateToDisplay: PXFieldState;
	@columnConfig({width: 150})
	StatusDate: PXFieldState;
	@columnConfig({width: 150})
	Status: PXFieldState;
	@columnConfig({width: 100, textAlign: TextAlign.Right})
	NbrRecords: PXFieldState;
	@columnConfig({width: 200, textAlign: TextAlign.Left})
	ImportTimeStamp: PXFieldState;
	@columnConfig({width: 250})
	Description: PXFieldState;
}

export class SYMappingDetails extends PXView  {
	ProviderID: PXFieldState;
	SyncType: PXFieldState;
	PreparedOn: PXFieldState<PXFieldOptions.Disabled>;
	CompletedOn: PXFieldState<PXFieldOptions.Disabled>;
	BatchSize: PXFieldState;
}

export class SYImportOperation extends PXView  {
	SkipHeaders: PXFieldState;
	Validate: PXFieldState<PXFieldOptions.CommitChanges>;
	ValidateAndSave: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SYReplace extends PXView  {
	ColumnIndex: PXFieldState<PXFieldOptions.CommitChanges>;
	SearchValue: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplaceValue: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchCase: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplaceResult: PXFieldState;
}

@gridConfig({preset: GridPreset.ReadOnly, autoAdjustColumns: true, fastFilterByAllFields: false})
export class SYSubstitutionInfo extends PXView  {
	@columnConfig({width: 210})
	SubstitutionID: PXFieldState;
	@columnConfig({width: 350, hideViewLink: true})
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	OriginalValue: PXFieldState;
	@columnConfig({fullState: true, hideViewLink: true})
	SubstitutedValue: PXFieldState;
}

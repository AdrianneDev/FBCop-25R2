import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	controlConfig,
	GridColumnShowHideMode,
	GridColumnType,
	PXActionState,
	TextAlign,
	GridPreset,
	GridColumnGeneration,
	GridPagerMode,
	GridNoteFilesShowMode,
} from "client-controls";

// Views

export class SYMapping extends PXView  {
	@controlConfig({allowEdit: true })
	Name: PXFieldState;
	@controlConfig({ displayMode: "text"})
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	NbrRecords: PXFieldState<PXFieldOptions.Disabled>;
	DiscardResult: PXFieldState;
}

export class SYMappingDetails extends PXView  {
	ProviderID: PXFieldState;
	SyncType: PXFieldState;
	PreparedOn: PXFieldState<PXFieldOptions.Disabled>;
	CompletedOn: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	preserveSortsAndFilters: false
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
	ExportTimeStamp: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	generateColumns: GridColumnGeneration.AppendDynamic,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	autoSaveLayout: true,
	allowDelete: false,
	allowInsert: false,
	allowSort: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class SYData extends PXView  {
	switchActivation: PXActionState;
	switchActivationUntilError: PXActionState;
	switchProcessing: PXActionState;
	clearErrors: PXActionState;

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

export class SYImportOperation extends PXView  {
	SkipHeaders: PXFieldState;
}
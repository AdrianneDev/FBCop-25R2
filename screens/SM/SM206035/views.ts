import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	PXActionState,
	GridColumnGeneration,
	GridPreset
} from "client-controls";

// Views

@gridConfig({
	preset: GridPreset.Processing,
	fastFilterByAllFields: false,
	allowUpdate: false,
})
export class SYHistory extends PXView  {
	@columnConfig({width: 200, format: "g"})
	StatusDateToDisplay: PXFieldState;
	@columnConfig({width: 200})
	StatusDate: PXFieldState;
	Status: PXFieldState;
	NbrRecords: PXFieldState;
	ImportTimeStamp: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	generateColumns: GridColumnGeneration.AppendDynamic,
	syncPosition: true
})
export class SYData extends PXView  {
	viewReplacement: PXActionState;
	addSubstitutions: PXActionState;

	LineNbr: PXFieldState;
	IsActive: PXFieldState;
	IsProcessed: PXFieldState;
	ErrorMessage: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false})
	CanAddSubstitutions: PXFieldState<PXFieldOptions.Hidden>;
}

export class SYReplace extends PXView  {
	ColumnIndex: PXFieldState<PXFieldOptions.CommitChanges>;
	SearchValue: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplaceValue: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchCase: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplaceResult: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class SYSubstitutionInfo extends PXView  {
	SubstitutionID: PXFieldState;
	@columnConfig({hideViewLink: true}) TableName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	OriginalValue: PXFieldState;
	@columnConfig({hideViewLink: true}) SubstitutedValue: PXFieldState;
}

export class SYImportOperation extends PXView  {
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
	BreakOnError: PXFieldState<PXFieldOptions.CommitChanges>;
	BreakOnTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipHeaders: PXFieldState;
	Validate: PXFieldState<PXFieldOptions.CommitChanges>;
	ValidateAndSave: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class SYMapping extends PXView  {
	viewHistory: PXActionState;
	viewPreparedData: PXActionState;

	@columnConfig({allowCheckAll: true, width: 20}) Selected: PXFieldState;
	Name: PXFieldState;
	@columnConfig({hideViewLink: true}) ScreenDescription: PXFieldState;
	@columnConfig({hideViewLink: true}) ProviderID: PXFieldState;
	SyncType: PXFieldState;
	Status: PXFieldState;
	NbrRecords: PXFieldState;
	PreparedOn: PXFieldState;
	CompletedOn: PXFieldState;
}
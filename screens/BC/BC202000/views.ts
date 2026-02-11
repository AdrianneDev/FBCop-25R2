import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

export class EntityFilter extends PXView {
	ConnectorType: PXFieldState<PXFieldOptions.CommitChanges>;
	BindingID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityType: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CurrentEntity extends PXView {
	IsActive: PXFieldState<PXFieldOptions.Disabled>;
	Direction: PXFieldState<PXFieldOptions.CommitChanges>;
	PrimarySystem: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxAttemptCount: PXFieldState;
	AutoMergeDuplicates: PXFieldState;
	ParallelProcessing: PXFieldState;
	ImportRealTimeStatus: PXFieldState;
	ExportRealTimeStatus: PXFieldState;
	RealTimeMode: PXFieldState;
	RealTimeBaseURL: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowImport: true,
})
export class ImportMappings extends PXView {
	SortOrder: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetObject: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetField: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceObject: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: { comboBox: true },
	})
	SourceField: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowImport: true,
})
export class ExportMappings extends PXView {
	SortOrder: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetObject: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetField: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceObject: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: { comboBox: true },
	})
	SourceField: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowImport: true
})
export class ExportFilters extends PXView {
	SortOrder: PXFieldState;

	@columnConfig({ allowNull: false, })
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		allowNull: false,
		width: 100,
	})
	OpenBrackets: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorType: "qp-drop-down", })
	FieldName: PXFieldState;

	@columnConfig({
		allowNull: false,
		width: 100
	})
	Condition: PXFieldState;
	@columnConfig({ allowNull: false })
	IsRelative: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Value2: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		allowNull: false,
		width: 100,
	})
	CloseBrackets: PXFieldState;

	@columnConfig({
		allowNull: false,
		width: 100,
	})
	Operator: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowImport: true,
})
export class ImportFilters extends PXView {
	SortOrder: PXFieldState;

	@columnConfig({ allowNull: false, })
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		allowNull: false,
		width: 100,
	})
	OpenBrackets: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorType: "qp-drop-down", })
	FieldName: PXFieldState;

	@columnConfig({
		allowNull: false,
		width: 100,
	})
	Condition: PXFieldState;

	@columnConfig({ allowNull: false, })
	IsRelative: PXFieldState;

	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Value2: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		allowNull: false,
		width: 100,
	})
	CloseBrackets: PXFieldState;

	@columnConfig({
		allowNull: false,
		width: 100,
	})
	Operator: PXFieldState;
}

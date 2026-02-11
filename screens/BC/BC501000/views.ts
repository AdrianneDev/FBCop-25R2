import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	linkCommand,
	gridConfig,
	GridColumnShowHideMode,
	GridPreset,
} from "client-controls";

export class ProcessFilter extends PXView {
	BindingID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityType: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepareMode: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class Entities extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 60,
	})
	Selected: PXFieldState;

	BindingID: PXFieldState;

	@linkCommand("NavigateEntity")
	EntityType: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.True, })
	ConnectorType: PXFieldState;

	Direction: PXFieldState;
	PrimarySystem: PXFieldState;
	SyncSortOrder: PXFieldState;
	ImportRealTimeStatus: PXFieldState;
	ExportRealTimeStatus: PXFieldState;
	RealTimeMode: PXFieldState;
	BCEntityStats__LastErrorMessage: PXFieldState;

	@linkCommand("NavigatePrepared")
	PreparedRecords: PXFieldState;

	@linkCommand("NavigateProcessed")
	ProcessedRecords: PXFieldState;

	@linkCommand("NavigateTotal")
	TotalRecords: PXFieldState;

	BCEntityStats__LastIncrementalImportDateTime: PXFieldState;
	BCEntityStats__LastIncrementalExportDateTime: PXFieldState;
	BCEntityStats__LastReconciliationImportDateTime: PXFieldState;
	BCEntityStats__LastReconciliationExportDateTime: PXFieldState;
}

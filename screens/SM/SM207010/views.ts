import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, GridPreset, GridFastFilterVisibility, columnConfig } from "client-controls";

// Views

export class ODataPreferences extends PXView  {

	DaysRetentionHistoryDeletedRecords: PXFieldState;
}

@gridConfig({
	showFastFilter: GridFastFilterVisibility.False,
	mergeToolbarWith: "ScreenToolbar",
	preset: GridPreset.Primary
})
export class SMDeletedRecordsTrackingTables extends PXView  {
	@linkCommand("NavigateToDacSchemaBrowser")
	@columnConfig({ width: 300 })
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 500 })
	Description: PXFieldState;
	CreatedDateTime: PXFieldState;
}

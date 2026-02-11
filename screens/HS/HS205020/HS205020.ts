import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createCollection,
	gridConfig,
	PXFieldOptions,
	GridPreset,
	GridNoteFilesShowMode,
	columnConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.DataSync.HubSpot.HSSetupMaint",
	primaryView: "EntitySetup",
	bpEventsIndicator: false,
	udfTypeField: "",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class HS205020 extends PXScreen {
	EntitySetup = createCollection(HSEntitySetup);
}

@gridConfig({
	preset: GridPreset.Primary,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	fastFilterByAllFields: false,
})
export class HSEntitySetup extends PXView {
	EntityType: PXFieldState<PXFieldOptions.CommitChanges>;
	ImportScenario: PXFieldState;
	ExportScenario: PXFieldState;
	MaxAttemptCount: PXFieldState;
	PoolingPeriod: PXFieldState;
	MasterSource: PXFieldState;
	SyncSortOrder: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastMissedSyncDateTime: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastFullSyncDateTime: PXFieldState;
}

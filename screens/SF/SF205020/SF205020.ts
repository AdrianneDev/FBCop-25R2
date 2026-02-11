import {
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXScreen,
	columnConfig,
	createCollection,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Salesforce.SFSetupMaint",
	primaryView: "EntitySetup",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class SF205020 extends PXScreen {
	EntitySetup = createCollection(SFEntitySetup);
}

@gridConfig({
	preset: GridPreset.Primary,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class SFEntitySetup extends PXView {
	EntityType: PXFieldState;
	ImportScenario: PXFieldState;
	ExportScenario: PXFieldState;
	MaxAttemptCount: PXFieldState;
	SyncSortOrder: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastMissedSyncDateTime: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastFullSyncDateTime: PXFieldState;
}

import {
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXScreen,
	columnConfig,
	createCollection,
	PXFieldOptions,
	createSingle,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Salesforce.SFReSyncMaint", primaryView: "Filter" })
export class SF205035 extends PXScreen {
	RStoLSSyncProc = createCollection(SFEntitySetup);
	Filter = createSingle(SFSyncFilter);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class SFEntitySetup extends PXView {
	@columnConfig({ allowCheckAll: true, width: 10 })
	Selected: PXFieldState;
	EntityType: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastMissedSyncDateTime: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastFullSyncDateTime: PXFieldState;
}

export class SFSyncFilter extends PXView {
	SyncMode: PXFieldState<PXFieldOptions.CommitChanges>;
}

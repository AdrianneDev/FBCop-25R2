import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createCollection,
	createSingle,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.DataSync.HubSpot.HSReSyncMaint",
	primaryView: "Filter",
	bpEventsIndicator: false,
	udfTypeField: "",
})
export class HS205035 extends PXScreen {
	Filter = createSingle(HSSyncFilter);
	RStoLSSyncProc = createCollection(HSEntitySetup);
}

export class HSSyncFilter extends PXView {
	SyncMode: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowUpdate: false,
	fastFilterByAllFields: false,
})
export class HSEntitySetup extends PXView {
	@columnConfig({ allowCheckAll: true, width: 10 })
	Selected: PXFieldState;
	EntityType: PXFieldState;
	MasterSource: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastMissedSyncDateTime: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastFullSyncDateTime: PXFieldState;
}

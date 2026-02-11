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
	PXActionState,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.DataSync.HubSpot.HSSyncMaint",
	primaryView: "RStoLSSyncProc",
	bpEventsIndicator: false,
	udfTypeField: "",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class HS205030 extends PXScreen {
	RStoLSSyncProc = createCollection(HSEntitySetup);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowUpdate: false,
	fastFilterByAllFields: false,
})
export class HSEntitySetup extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	@columnConfig({ editorType: "qp-drop-down" }) SyncProcessStatus: PXFieldState;
	EntityType: PXFieldState;
	ImportScenario: PXFieldState;
	ExportScenario: PXFieldState;
	MasterSource: PXFieldState;
	@columnConfig({ editorConfig: { preserveTimezone: true }})
	LastRealTimeDateTime: PXFieldState;
}

import {
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXScreen,
	columnConfig,
	createCollection,
	PXFieldOptions,
	GridPreset,
	GridFilterBarVisibility,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Salesforce.SFSyncMaint",
	primaryView: "RStoLSSyncProc",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class SF205030 extends PXScreen {
	RStoLSSyncProc = createCollection(SFEntitySetup);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class SFEntitySetup extends PXView {
	@columnConfig({ allowCheckAll: true, width: 10 }) Selected: PXFieldState;
	ProcStatus: PXFieldState;
	EntityType: PXFieldState;
	ImportScenario: PXFieldState;
	ExportScenario: PXFieldState;
	LastNotificationTime: PXFieldState;
	LastNotification: PXFieldState;
}

import {
	PXView,
	PXFieldState,
	commitChanges,
	graphInfo,
	PXScreen,
	createCollection,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode,
	columnConfig,
	viewInfo,
	PXFieldOptions,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRActivitySetupMaint",
	primaryView: "ActivityTypes",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class CR102000 extends PXScreen {
	@viewInfo({ containerName: "Activity Types" })
	ActivityTypes = createCollection(ActivityTypes);
}

@gridConfig({
	preset: GridPreset.Primary,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	fastFilterByAllFields: false,
})
export class ActivityTypes extends PXView {
	ClassID: PXFieldState;
	Type: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	@commitChanges Application: PXFieldState;
	@columnConfig({ editorType: "qp-drop-down" })
	ImageUrl: PXFieldState;
	@commitChanges PrivateByDefault: PXFieldState;
	@commitChanges RequireTimeByDefault: PXFieldState;
	Incoming: PXFieldState;
	Outgoing: PXFieldState;
}

import {
	graphInfo,
	gridConfig,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset,
	GridNoteFilesShowMode,
	columnConfig
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FS.ProblemMaint",
	primaryView: "ProblemRecords",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class FS201200 extends PXScreen {
	ProblemRecords = createCollection(FSProblem);
}

@gridConfig({
	preset: GridPreset.Primary,
	allowImport: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class FSProblem extends PXView {

	@columnConfig({ hideViewLink: true })
	ProblemCD: PXFieldState<PXFieldOptions.CommitChanges>;

	Descr: PXFieldState;
}

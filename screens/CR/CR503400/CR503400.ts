import {
	PXView,
	PXFieldState,
	linkCommand,
	columnConfig,
	graphInfo,
	PXScreen,
	createCollection,
	gridConfig,
	PXFieldOptions,
	GridPreset,
	GridFilterBarVisibility,
	GridNoteFilesShowMode,
	PXPageLoadBehavior,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRGrammProcess",
	primaryView: "Items",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class CR503400 extends PXScreen {
	Items = createCollection(ProcessingItem);
}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class ProcessingItem extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	BAccountID: PXFieldState;
	FullName: PXFieldState;
	ContactType: PXFieldState;
	@linkCommand("Items_ViewDetails") DisplayName: PXFieldState;
}

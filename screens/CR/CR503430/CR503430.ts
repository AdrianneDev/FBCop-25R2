import {
	PXView,
	PXFieldState,
	commitChanges,
	graphInfo,
	PXScreen,
	createCollection,
	createSingle,
	gridConfig,
	linkCommand,
	PXFieldOptions,
	GridFilterBarVisibility,
	GridPreset,
	GridNoteFilesShowMode,
	PXPageLoadBehavior,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRValidationProcess",
	primaryView: "Filter",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class CR503430 extends PXScreen {
	Filter = createSingle(Filter);
	Contacts = createCollection(Contacts);
}

export class Filter extends PXView {
	@commitChanges ValidationType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.False,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	mergeToolbarWith: "ScreenToolbar",
	syncPosition: true,
})
export class Contacts extends PXView {
	AggregatedType: PXFieldState;
	@linkCommand("Contacts_BAccount_ViewDetails") BAccountID: PXFieldState;
	AcctName: PXFieldState;
	@linkCommand("Contacts_Contact_ViewDetails") DisplayName: PXFieldState;
	AggregatedStatus: PXFieldState;
	DuplicateStatus: PXFieldState;
}

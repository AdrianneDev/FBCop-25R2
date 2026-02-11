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
	GridFilterBarVisibility,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRCaseReleaseProcess",
	primaryView: "Filter",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class CR507000 extends PXScreen {
	Filter = createSingle(CaseFilter);
	Items = createCollection(CRCase);
}

export class CaseFilter extends PXView {
	CaseClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.False,
	allowUpdate: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	mergeToolbarWith: "ScreenToolbar",
})
export class CRCase extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	CaseCD: PXFieldState;
	Subject: PXFieldState;
	@columnConfig({ hideViewLink: true }) CaseClassID: PXFieldState;
	Customer__AcctName: PXFieldState;
	@columnConfig({ hideViewLink: true }) Customer__ClassID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ContractID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState;
	TimeBillable: PXFieldState;
	OverTimeBillable: PXFieldState;
	CreatedDateTime: PXFieldState;
	ResolutionDate: PXFieldState;
}

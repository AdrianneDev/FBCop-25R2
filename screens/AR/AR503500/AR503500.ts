import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState,
	graphInfo, viewInfo, gridConfig, columnConfig,
	PXPageLoadBehavior, PXFieldOptions, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARStatementPrint", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR503500 extends PXScreen {
	@viewInfo({containerName: "Selection"})
    Filter = createSingle(PrintParameters);

	@viewInfo({containerName: "Details"})
	Details = createCollection(DetailsResult);
}

export class PrintParameters extends PXView  {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementCycleId: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementDate: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryStatements: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAll: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintWithDeviceHub: PXFieldState<PXFieldOptions.CommitChanges>;
	DefinePrinterManually: PXFieldState<PXFieldOptions.CommitChanges>;
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfCopies: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementMessage: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: ["CustomerID", "CustomerID_BAccountR_acctName"]
})
export class DetailsResult extends PXView  {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	CustomerID: PXFieldState;

	CustomerID_BAccountR_acctName: PXFieldState;
	StatementBalance: PXFieldState;
	OverdueBalance: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryStatementBalance: PXFieldState;
	CuryOverdueBalance: PXFieldState;
	UseCurrency: PXFieldState;
	DontPrint: PXFieldState;
	Printed: PXFieldState;
	DontEmail: PXFieldState;
	Emailed: PXFieldState;
}

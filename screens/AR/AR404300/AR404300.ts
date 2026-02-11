import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, columnConfig, linkCommand,
	GridColumnType, PXFieldOptions, PXPageLoadBehavior, GridPreset, GridFilterBarVisibility
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARStatementDetails", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR404300 extends PXScreen {
	ViewDetails: PXActionState;

   	@viewInfo({containerName: "Selection"})
	Filter = createSingle(ARStatementDetailsParameters);

   	@viewInfo({containerName: "Details"})
	Details = createCollection(DetailsResult);
}

export class ARStatementDetailsParameters extends PXView  {
	StatementCycleId: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	fastFilterByAllFields: false
})
export class DetailsResult extends PXView  {
	@linkCommand("ViewDetails")
	@columnConfig({ allowFastFilter: true })
	CustomerId: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	CustomerId_BAccountR_acctName: PXFieldState;
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
	OnDemand: PXFieldState;

	PreparedOn: PXFieldState;
}

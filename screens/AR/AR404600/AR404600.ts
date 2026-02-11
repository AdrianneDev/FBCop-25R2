import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, columnConfig,
	PXFieldOptions, PXPageLoadBehavior, GridPreset, GridFilterBarVisibility
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARStatementForCustomer", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR404600 extends PXScreen {
   	@viewInfo({containerName: "Selection"})
	Filter = createSingle(ARStatementForCustomerParameters);

   	@viewInfo({containerName: "Details"})
	Details = createCollection(DetailsResult);
}

export class ARStatementForCustomerParameters extends PXView  {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
})
export class DetailsResult extends PXView  {
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	StatementCycleId: PXFieldState;

	@columnConfig({ hideViewLink: true })
	StatementDate: PXFieldState;

	StatementBalance: PXFieldState;
	OverdueBalance: PXFieldState;
	CuryID: PXFieldState;
	CuryStatementBalance: PXFieldState;
	CuryOverdueBalance: PXFieldState;

	DontPrint: PXFieldState;
	Printed: PXFieldState;
	DontEmail: PXFieldState;
	Emailed: PXFieldState;
	OnDemand: PXFieldState;

	PreparedOn: PXFieldState;
}

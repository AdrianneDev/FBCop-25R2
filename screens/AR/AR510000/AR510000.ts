import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, columnConfig, linkCommand,
	PXPageLoadBehavior, PXFieldOptions, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARRetainageRelease", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR510000 extends PXScreen {
	ViewDocument: PXActionState;

	@viewInfo({containerName: "Selection"})
	Filter = createSingle(ARRetainageFilter);

	@viewInfo({containerName: "Documents"})
	DocumentList = createCollection(ARInvoice);
}


export class ARRetainageFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowBillsWithOpenBalance: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageReleasePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageReleasedAmt: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class ARInvoice extends PXView {
	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	ARTranSortOrder: PXFieldState;
	RetainageReleasePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageReleasedAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageUnreleasedCalcAmt: PXFieldState;
	DocDate: PXFieldState;
	CuryOrigDocAmtWithRetainageTotal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DisplayProjectID: PXFieldState;

	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	InvoiceNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTranInventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTranTaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTranCostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTranAccountID: PXFieldState;
}

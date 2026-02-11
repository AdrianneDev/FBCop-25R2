import { PXScreen, PXActionState, PXView, PXFieldState, PXFieldOptions, columnConfig, GridPreset, PXPageLoadBehavior, createCollection, createSingle, gridConfig, linkCommand, graphInfo } from "client-controls";

@graphInfo({graphType: "PX.Objects.CC.PayLinkProcessing", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues})
export class AR513500 extends PXScreen {
	ViewDocument: PXActionState;
	ViewCustomer: PXActionState;
	Filter = createSingle(PayLinkFilter);
	DocumentList = createCollection(PayLinkDocument);
}

export class PayLinkFilter extends PXView  {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class PayLinkDocument extends PXView  {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	BranchID: PXFieldState;
	DocTypeDisplayName: PXFieldState;
	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;
	@linkCommand("ViewCustomer")
	CustomerID: PXFieldState;
	AcctName: PXFieldState;
	CustomerClassID: PXFieldState;
	DocDate: PXFieldState;
	DueDate: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;
	PayLinkAmt: PXFieldState;
	CuryID: PXFieldState;
	ProcessingCenterID: PXFieldState;
	StatusDate: PXFieldState;
	NeedSync: PXFieldState;
	ExternalID: PXFieldState;
	ErrorMessage: PXFieldState;
}

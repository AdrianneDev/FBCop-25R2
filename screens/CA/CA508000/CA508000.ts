import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, PXPageLoadBehavior, PXFieldState,
	PXView, PXFieldOptions, gridConfig, columnConfig, GridPreset, linkCommand,
} from "client-controls";

@graphInfo({graphType: "PX.Objects.CC.UpdateLevel3Data", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues})
export class CA508000 extends PXScreen {
	ViewDocument: PXActionState;

	Filter = createSingle(L3DocumentProcessingFilter);
	L3Payments = createCollection(ARPayment);
}


// Views

export class L3DocumentProcessingFilter extends PXView  {
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingStatus: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class ARPayment extends PXView  {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	DocType: PXFieldState;
	@linkCommand("ViewDocument")

	RefNbr: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	CustomerID: PXFieldState;
	Customer__AcctName: PXFieldState;
	Status: PXFieldState;
	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProcessingCenterID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;

	ExternalTransaction__L3Status: PXFieldState;
	ExternalTransaction__L3Error: PXFieldState;
}

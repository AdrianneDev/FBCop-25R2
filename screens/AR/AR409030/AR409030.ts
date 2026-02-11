import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs,
	PXViewCollection, PXPageLoadBehavior, PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo, disabled,
	PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "ReconciliationTools.ARGLDiscrepancyByDocumentEnq", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class AR409030 extends PXScreen {

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(DiscrepancyEnqFilter);
	@viewInfo({ containerName: "Rows" })
	Rows = createCollection(ARDocumentResult);
}

export class DiscrepancyEnqFilter extends PXView {

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowOnlyWithDiscrepancy: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalGLAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalXXAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalDiscrepancy: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Inquiry })
export class ARDocumentResult extends PXView {

	@columnConfig({ hideViewLink: true })
	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	Status: PXFieldState;

	OrigDocAmt: PXFieldState;

	BatchNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	GLTurnover: PXFieldState;
	XXTurnover: PXFieldState;
	Discrepancy: PXFieldState;
}

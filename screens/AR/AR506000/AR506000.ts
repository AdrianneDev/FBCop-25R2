import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs,
	PXViewCollection, PXPageLoadBehavior, PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo, disabled,
	PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset
} from "client-controls";

@graphInfo({graphType: "PX.Objects.AR.ARAutoApplyPayments", primaryView: "Filter" })
export class AR506000 extends PXScreen {

   	@viewInfo({containerName: "Parameters"})
	Filter = createSingle(ARAutoApplyParameters);
   	@viewInfo({containerName: "Statement Cycles"})
	ARStatementCycleList = createCollection(ARStatementCycle);
}


export class ARAutoApplyParameters extends PXView {

	ApplicationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ApplyCreditMemos: PXFieldState<PXFieldOptions.CommitChanges>;
	ReleaseBatchWhenFinished: PXFieldState;
	LoadChildDocuments: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class ARStatementCycle extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	StatementCycleId: PXFieldState;
	LastStmtDate: PXFieldState;
	Descr: PXFieldState;
	NextStmtDate: PXFieldState;
}

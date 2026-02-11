import {
	PXScreen, createSingle, createCollection, graphInfo, PXPageLoadBehavior, PXView, PXFieldState, PXFieldOptions, columnConfig,
	GridColumnShowHideMode, linkCommand, GridPagerMode, gridConfig, GridPreset, PXActionState, handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection,
	QpGridEventArgs
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.AccountByPeriodEnq", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class GL404000 extends PXScreen {
	Filter = createSingle(Filter);

	GLTranEnq = createCollection(GLTranEnq);

	@handleEvent(CustomEventType.RowSelected, { view: "GLTranEnq" })
	onGLTranEnqChanged(args: RowSelectedHandlerArgs<PXViewCollection<GLTranEnq>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (model.ReclassificationHistory) model.ReclassificationHistory.enabled = !!activeRow?.IncludedInReclassHistory.value;
	}

	onFilterChanged(args: QpGridEventArgs) {
		this.screenService.update("Refresh");
	}
}

export class Filter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	EndPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;

	StartDateUI: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodStartDateUI: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDateUI: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodEndDateUI: PXFieldState<PXFieldOptions.CommitChanges>;

	ShowSummary: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeUnposted: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeUnreleased: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeReclassified: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowCuryDetail: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;

	BegBal: PXFieldState;
	TurnOver: PXFieldState;
	EndBal: PXFieldState;
}

@gridConfig({ preset: GridPreset.Primary, batchUpdate: true, preserveSortsAndFilters: false })
export class GLTranEnq extends PXView {

	ReclassificationHistory: PXActionState;

	@columnConfig({ allowCheckAll: true, allowShowHide: GridColumnShowHideMode.Server })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	Module: PXFieldState;

	@linkCommand("ViewBatch")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BatchNbr: PXFieldState;

	BatchDescription: PXFieldState;
	TranDate: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	FinPeriodID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	TranPeriodID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	TranDesc: PXFieldState;

	@linkCommand("ViewDocument")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	RefNbr: PXFieldState;

	LineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.Server })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.Server })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.Server })
	SubID: PXFieldState;

	@columnConfig({
		allowSort: false,
		allowFilter: false
	})
	SignBegBalance: PXFieldState;

	DebitAmt: PXFieldState;
	CreditAmt: PXFieldState;

	@columnConfig({
		allowSort: false,
		allowFilter: false
	})
	SignEndBalance: PXFieldState;

	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.Server })
	CuryID: PXFieldState;

	@columnConfig({
		allowShowHide: GridColumnShowHideMode.Server,
		allowSort: false,
		allowFilter: false
	})
	SignCuryBegBalance: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryDebitAmt: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryCreditAmt: PXFieldState;

	@columnConfig({
		allowShowHide: GridColumnShowHideMode.Server,
		allowSort: false,
		allowFilter: false
	})
	SignCuryEndBalance: PXFieldState;

	InventoryID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server})
	ReferenceID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server})
	ReferenceID_BaccountR_AcctName: PXFieldState;

	@linkCommand("ViewReclassBatch")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ReclassBatchNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	IncludedInReclassHistory: PXFieldState;

	@linkCommand("ViewPMTran")
	PMTranID: PXFieldState;

	@linkCommand("ViewProject")
	ProjectID: PXFieldState;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;

	@linkCommand("ViewTask")
	TaskID: PXFieldState;
	TaskID_Description: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
}

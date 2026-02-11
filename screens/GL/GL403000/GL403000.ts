import {
	PXScreen, createSingle, createCollection, graphInfo, PXPageLoadBehavior, PXView, PXFieldState, PXFieldOptions, columnConfig,
	GridColumnShowHideMode, gridConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.AccountHistoryBySubEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class GL403000 extends PXScreen {
	Filter = createSingle(Filter);

	EnqResult = createCollection(EnqResult);
}

export class Filter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowCuryDetail: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class EnqResult extends PXView {

	SubCD: PXFieldState;
	SignBegBalance: PXFieldState;
	PtdDebitTotal: PXFieldState;
	PtdCreditTotal: PXFieldState;
	SignEndBalance: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	SignCuryBegBalance: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryPtdDebitTotal: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryPtdCreditTotal: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	SignCuryEndBalance: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	PtdSaldo: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryPtdSaldo: PXFieldState;

}

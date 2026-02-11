import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, controlConfig,
	graphInfo, viewInfo, gridConfig,
	PXFieldOptions,
	GridPreset
} from "client-controls";

@graphInfo({graphType: "PX.Objects.CA.CashForecastEntry", primaryView: "filterCashAccounts", showUDFIndicator: true })
export class CA305500 extends PXScreen {
   	@viewInfo({containerName: "Selection"})
	filterCashAccounts = createSingle(CashAccount);

   	@viewInfo({containerName: "Selection"})
	filter = createSingle(Filter);

   	@viewInfo({containerName: "Cash Transactions"})
	cashForecastTrans = createCollection(CashForecastTran);
}

export class CashAccount extends PXView {

	@controlConfig({ displayMode: "both" })
	CashAccountCD: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryID: PXFieldState<PXFieldOptions.Disabled>;
}

export class Filter extends PXView {
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class CashForecastTran extends PXView {
	TranDate: PXFieldState;
	DrCr: PXFieldState;
	TranDesc: PXFieldState;
	CuryTranAmt: PXFieldState;
}

import {
	PXScreen, createSingle, graphInfo, PXPageLoadBehavior, PXView, PXFieldState, PXFieldOptions, createCollection, linkCommand,
	PXActionState, gridConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AR.ARCustomerBalanceEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AR401000 extends PXScreen {

	viewDetails: PXActionState;

	Filter = createSingle(ARHistoryFilter);
	History = createCollection(ARHistoryResult);
	Summary = createSingle(ARHistorySummary);
}

export class ARHistoryFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	Period: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ARSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SplitByCurrency: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowWithBalanceOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeChildAccounts: PXFieldState<PXFieldOptions.CommitChanges>;
}


export class ARHistorySummary extends PXView {

	BalanceSummary: PXFieldState;
	BalanceSummary_Label: PXFieldState;

	DepositsSummary: PXFieldState;
	DepositsSummary_Label: PXFieldState;

	RevaluedSummary: PXFieldState;
	RevaluedSummary_Label: PXFieldState;

	BalanceRetainedSummary: PXFieldState;
	BalanceRetainedSummary_Label: PXFieldState;

	CuryBalanceSummary: PXFieldState;
	CuryBalanceSummary_Label: PXFieldState;

	CuryDepositsSummary: PXFieldState;
	CuryDepositsSummary_Label: PXFieldState;

	CuryBalanceRetainedSummary: PXFieldState;
	CuryBalanceRetainedSummary_Label: PXFieldState;
}

@gridConfig({ preset: GridPreset.Inquiry })
export class ARHistoryResult extends PXView {

	@linkCommand("viewDetails")
	AcctCD: PXFieldState;
	AcctName: PXFieldState;
	FinPeriodID: PXFieldState;
	CuryID: PXFieldState;
	CuryBegBalance: PXFieldState;
	CuryEndBalance: PXFieldState;
	CuryBalance: PXFieldState;
	CuryDepositsBalance: PXFieldState;
	CurySales: PXFieldState;
	CuryPayments: PXFieldState;
	CuryBegRetainedBalance: PXFieldState;
	CuryEndRetainedBalance: PXFieldState;
	CuryRetainageWithheld: PXFieldState;
	CuryRetainageReleased: PXFieldState;
	CuryFinCharges: PXFieldState;
	CuryDiscount: PXFieldState;
	CuryCrAdjustments: PXFieldState;
	CuryDrAdjustments: PXFieldState;
	CuryDeposits: PXFieldState;
	BegBalance: PXFieldState;
	EndBalance: PXFieldState;
	Balance: PXFieldState;
	DepositsBalance: PXFieldState;
	Sales: PXFieldState;
	Payments: PXFieldState;
	BegRetainedBalance: PXFieldState;
	EndRetainedBalance: PXFieldState;
	RetainageWithheld: PXFieldState;
	RetainageReleased: PXFieldState;
	FinCharges: PXFieldState;
	Discount: PXFieldState;
	RGOL: PXFieldState;
	CrAdjustments: PXFieldState;
	DrAdjustments: PXFieldState;
	FinPtdRevaluated: PXFieldState;
	Deposits: PXFieldState;
}

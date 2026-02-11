import {
	PXScreen, createSingle, createCollection, graphInfo, PXPageLoadBehavior, PXView, PXFieldState,
	PXFieldOptions, linkCommand, gridConfig, PXActionState, GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APVendorBalanceEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AP401000 extends PXScreen {

	viewDetails: PXActionState;

	Filter = createSingle(APHistoryFilter);
	Summary = createSingle(APHistorySummary);
	History = createCollection(APHistoryResult);

}

export class APHistoryFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SplitByCurrency: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowWithBalanceOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class APHistorySummary extends PXView {

	BalanceSummary: PXFieldState;
	BalanceSummary_Label: PXFieldState;

	DepositsSummary: PXFieldState;
	DepositsSummary_Label: PXFieldState;

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
export class APHistoryResult extends PXView {

	@linkCommand("viewDetails")
	AcctCD: PXFieldState;

	AcctName: PXFieldState;
	FinPeriodID: PXFieldState;
	CuryID: PXFieldState;
	CuryBegBalance: PXFieldState;
	CuryEndBalance: PXFieldState;
	CuryDepositsBalance: PXFieldState;
	CuryPurchases: PXFieldState;
	CuryPayments: PXFieldState;
	CuryBegRetainedBalance: PXFieldState;
	CuryEndRetainedBalance: PXFieldState;
	CuryRetainageWithheld: PXFieldState;
	CuryRetainageReleased: PXFieldState;
	CuryDiscount: PXFieldState;
	CuryWhTax: PXFieldState;
	CuryCrAdjustments: PXFieldState;
	CuryDrAdjustments: PXFieldState;
	CuryDeposits: PXFieldState;
	BegBalance: PXFieldState;
	EndBalance: PXFieldState;
	DepositsBalance: PXFieldState;
	Purchases: PXFieldState;
	Payments: PXFieldState;
	BegRetainedBalance: PXFieldState;
	EndRetainedBalance: PXFieldState;
	RetainageWithheld: PXFieldState;
	RetainageReleased: PXFieldState;
	Discount: PXFieldState;
	WhTax: PXFieldState;
	RGOL: PXFieldState;
	CrAdjustments: PXFieldState;
	DrAdjustments: PXFieldState;
	Deposits: PXFieldState;

}

import {
	PXView,
	PXFieldState,
	gridConfig,
	controlConfig,
	ICurrencyInfo,
	PXFieldOptions,
	columnConfig,
	linkCommand,
	GridPreset,
	GridFastFilterVisibility,
	GridColumnDisplayMode,
	PXActionState,
	GridPagerMode,
} from "client-controls";

export class PMWipAdjustment extends PXView {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	@controlConfig({ displayMode: "text" })
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectionDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	ProjectStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludePendingChangeOrders: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	CuryOverbillingAmount: PXFieldState;
	CuryUnderbillingAmount: PXFieldState;
	CuryTotalAmount: PXFieldState;
	CuryOverbillingAdjustmentAmount: PXFieldState;
	CuryUnderbillingAdjustmentAmount: PXFieldState;
	CuryTotalAdjustmentAmount: PXFieldState;
}

export class PMWipAdjustmentFinancial extends PXView {
	OverbillingUnderbillingOption: PXFieldState<PXFieldOptions.CommitChanges>;
	RevenueOption: PXFieldState<PXFieldOptions.CommitChanges>;
	OverbillingAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	OverbillingSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnderbillingAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnderbillingSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevenueAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevenueSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;
	ConsolidateTransactions: PXFieldState<PXFieldOptions.CommitChanges>;
	PostNetoAmount: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	showFastFilter: GridFastFilterVisibility.False,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
})
export class PMWipAdjustmentLine extends PXView {
	SendEmail: PXActionState;
	RefreshSelected: PXActionState;
	DeleteSelected: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewProject")
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	PMProject__Description: PXFieldState;
	PMProject__Status: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Text })
	PMProject__OwnerID: PXFieldState;
	@linkCommand("ViewCostProjection")
	ProjectionRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	PMCostProjectionByDate__ProjectionDate: PXFieldState;
	CuryOriginalRevenueAmount: PXFieldState;
	CuryBudgetedRevenueChangeOrderAmount: PXFieldState;
	CuryPendingRevenueChangeOrderAmount: PXFieldState;
	CuryRevisedRevenueBudgetedAmount: PXFieldState;
	CuryOriginalCostAmount: PXFieldState;
	CuryBudgetedCostChangeOrderAmount: PXFieldState;
	CuryPendingCostChangeOrderAmount: PXFieldState;
	CuryRevisedCostBudgetedAmount: PXFieldState;
	CuryOriginalCommitmentAmount: PXFieldState;
	CuryApprovedCommitmentAmount: PXFieldState;
	CuryPendingCommitmentAmount: PXFieldState;
	CuryRevisedCommitmentAmount: PXFieldState;
	CuryProjectedAmount: PXFieldState;
	CuryProjectedMarginAmount: PXFieldState;
	ProjectedMarginPct: PXFieldState;
	CuryPeriodCostAmount: PXFieldState;
	BudgetUsedPct: PXFieldState;
	CuryPeriodBillingAmount: PXFieldState;
	CuryActualAmount: PXFieldState;
	CompletedPct: PXFieldState;
	CuryRevenueExpectedAmount: PXFieldState;
	CuryBilledRevenueAmount: PXFieldState;
	CuryOverbillingAmount: PXFieldState;
	CuryUnderbillingAmount: PXFieldState;
	CuryGrossProfitAmount: PXFieldState;
	MarginPct: PXFieldState;
	CuryRevenueBacklogAmount: PXFieldState;
	CuryGrossProfitBacklogAmount: PXFieldState;
	CuryRemainingContractgAmount: PXFieldState;
	CuryOverbillingAdjustmentAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnderbillingAdjustmentAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	OverbillingAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OverbillingSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UnderbillingAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UnderbillingSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	RevenueAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	RevenueSubID: PXFieldState;
	IncludePendingChangeOrders: PXFieldState<PXFieldOptions.CommitChanges>;
	Contact__Phone1: PXFieldState;
	Contact__Phone2: PXFieldState;
	Contact__Phone3: PXFieldState;
	Contact__Email: PXFieldState;
}

export class CurrencyInfo extends PXView implements ICurrencyInfo {
	CuryInfoID: PXFieldState;
	BaseCuryID: PXFieldState;
	BaseCalc: PXFieldState;
	DisplayCuryID: PXFieldState;
	CuryRateTypeID: PXFieldState;
	BasePrecision: PXFieldState;
	CuryRate: PXFieldState;
	CuryEffDate: PXFieldState;
	RecipRate: PXFieldState;
	SampleCuryRate: PXFieldState;
	SampleRecipRate: PXFieldState;
	CuryID: PXFieldState;
}

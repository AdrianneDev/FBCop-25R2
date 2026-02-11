import {
	PXView,
	PXFieldState,
	gridConfig,
	controlConfig,
	PXFieldOptions,
	columnConfig,
	TextAlign,
	GridPreset,
	GridFastFilterVisibility,
	PXActionState,
	GridPagerMode,
	linkCommand
} from "client-controls";

export class PMCostProjectionByDate extends PXView  {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectionDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	GroupByProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByAccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByCostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludePendingChangeOrders: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateProjectBudget: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRevisedRevenueBudgetedAmountTotal: PXFieldState;
	CuryPendingRevenueChangeOrderAmountTotal: PXFieldState;
	CuryBilledRevenueAmountTotal: PXFieldState;
	CuryRevenueBudgetBacklogAmountTotal: PXFieldState;
	CuryRevenueExpectedAmountTotal: PXFieldState;
	CuryExpectedAmountTotal: PXFieldState;
	CuryOverbillingAmountTotal: PXFieldState;
	CuryProjectedMarginTotal: PXFieldState;
	ProjectedMarginPctTotal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	showFastFilter: GridFastFilterVisibility.False,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class PMCostProjectionByDateLine extends PXView  {
	ViewCostTransactions: PXActionState;
	ViewCostCommitments: PXActionState;
	ViewLineCostCommitments: PXActionState;
	RunProjectCostAnalysis: PXActionState;

	LineNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryAmountToComplete: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({textAlign: TextAlign.Right})	CuryProjectedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({textAlign: TextAlign.Right})	CompletedPct: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({textAlign: TextAlign.Right})	CuryBudgetedAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryActualAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryCommitmentOpenAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryPendingCommitmentAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryCompletedAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryPendingChangeOrderAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryBudgetBacklogAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	Performance: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	AnticipatedPerformance: PXFieldState;
}

export class Contract extends PXView  {
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False
})
export class CommitmentInfo extends PXView  {
	ViewPurchaseOrder: PXActionState;

	POOrder__OrderType: PXFieldState<PXFieldOptions.Disabled>;
	@linkCommand("ViewPurchaseOrder")
	POOrder__OrderNbr: PXFieldState<PXFieldOptions.Disabled>;
	POOrder__OrderDate: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	POOrder__CuryID: PXFieldState<PXFieldOptions.Disabled>;
	LineNbr: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	PMTran__AccountGroupID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineAmt: PXFieldState<PXFieldOptions.Disabled>;
	PMTran__ProjectCuryAmount: PXFieldState<PXFieldOptions.Disabled>;
	PMTran__Date: PXFieldState<PXFieldOptions.Disabled>;
	APTran__TranType: PXFieldState<PXFieldOptions.Disabled>;
	APTran__RefNbr: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False
})
export class PMCostProjectionByDateToSelect extends PXView  {
	RefNbr: PXFieldState;
	Description: PXFieldState;
}

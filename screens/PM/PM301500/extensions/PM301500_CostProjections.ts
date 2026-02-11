import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState, GridFastFilterVisibility, linkCommand, PXFieldOptions, controlConfig, featureInstalled, FeaturesSet, columnConfig, TextAlign, GridAutoGrowMode } from "client-controls";
import { PM301500 } from "../PM301500";
import { PMConstants } from "../../pm-constants";

export interface PM301500_CostProjections extends PM301500 { }
export class PM301500_CostProjections {
    ActualCostProjection = createSingle(CostProjectionByDate);
    ActualCostProjectionItems = createCollection(CostProjectionByDateLine);

	@handleEvent(CustomEventType.GetRowCss, { view: "ActualCostProjectionItems" })
	getCostProjectionItemsRowCss(args: RowCssHandlerArgs<PXViewCollection<CostProjectionByDateLine>>) {
		const lineNbr = args?.selector?.row?.LineNbr.value;
		return  (lineNbr === 0)
			? PMConstants.BoldRowCssClass
			: undefined;
	}
}

export class CostProjectionByDate extends PXView  {
	RefNbr: PXFieldState<PXFieldOptions.Disabled>;
	ProjectionDate: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Multiline>;
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
	preset: GridPreset.ReadOnly,
	adjustPageSize: false,
	pageSize: 0,
	syncPosition: true,
	allowSort: false,
	showFastFilter: GridFastFilterVisibility.FilterBar
})
export class CostProjectionByDateLine extends PXView  {
	ViewCostProjectionCostTransactions: PXActionState;
	ViewCostProjectionCostCommitments: PXActionState;
	RunProjectCostAnalysis: PXActionState;

	LineNbr: PXFieldState;
	ProjectTaskID: PXFieldState;
	AccountGroupID: PXFieldState;
	InventoryID: PXFieldState;
	CostCodeID: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryAmountToComplete: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CuryProjectedAmount: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})	CompletedPct: PXFieldState;
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

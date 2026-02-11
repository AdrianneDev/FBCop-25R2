import {
	columnConfig,
	gridConfig,
	headerDescription,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Document extends PXView {
	ProjectID: PXFieldState;
	RevisionID: PXFieldState;
	Status: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	TotalAmountToComplete: PXFieldState<PXFieldOptions.Disabled>;
	TotalAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalBudgetedAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalProjectedAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalVarianceAmount: PXFieldState<PXFieldOptions.Disabled>;
	@headerDescription
	FormCaptionDescription: PXFieldState;
}

export class ProjectTotals extends PXView {
	TotalBudgetedRevenueAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalBudgetedCompletedAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalBudgetedAmountToComplete: PXFieldState<PXFieldOptions.Disabled>;
	TotalBudgetedCostAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalBudgetedGrossProfit: PXFieldState<PXFieldOptions.Disabled>;
	TotalBudgetedVarianceAmount: PXFieldState<PXFieldOptions.Disabled>;
	TotalProjectedGrossProfit: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	initNewRow: true
})
export class Details extends PXView {
	AddCostBudget: PXActionState;
	ViewCostCommitments: PXActionState;
	ViewCostTransactions: PXActionState;
	Refresh: PXActionState;
	ShowHistory: PXActionState;

	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	BudgetedQuantity: PXFieldState;
	BudgetedAmount: PXFieldState;
	ActualQuantity: PXFieldState;
	ActualAmount: PXFieldState;
	UnbilledQuantity: PXFieldState;
	UnbilledAmount: PXFieldState;
	CompletedQuantity: PXFieldState;
	CompletedAmount: PXFieldState;
	QuantityToComplete: PXFieldState;
	AmountToComplete: PXFieldState;
	Quantity: PXFieldState<PXFieldOptions.CommitChanges>;
	Amount: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectedQuantity: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	VarianceQuantity: PXFieldState<PXFieldOptions.CommitChanges>;
	VarianceAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedPct: PXFieldState<PXFieldOptions.CommitChanges>;
	Mode: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class AvailableCostBudget extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisedQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRevisedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	ChangeOrderQty: PXFieldState;
	CuryChangeOrderAmount: PXFieldState;
	CommittedQty: PXFieldState;
	CuryCommittedAmount: PXFieldState;
	CommittedReceivedQty: PXFieldState;
	CommittedInvoicedQty: PXFieldState;
	CuryCommittedInvoicedAmount: PXFieldState;
	CommittedOpenQty: PXFieldState;
	CuryCommittedOpenAmount: PXFieldState;
	ActualQty: PXFieldState;
	CuryActualAmount: PXFieldState;
	CuryActualPlusOpenCommittedAmount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false
})
export class History extends PXView {
	PMCostProjection__RevisionID: PXFieldState;
	PMCostProjection__Date: PXFieldState;
	BudgetedQuantity: PXFieldState;
	BudgetedAmount: PXFieldState;
	ActualQuantity: PXFieldState;
	ActualAmount: PXFieldState;
	UnbilledQuantity: PXFieldState;
	UnbilledAmount: PXFieldState;
	CompletedQuantity: PXFieldState;
	CompletedAmount: PXFieldState;
	QuantityToComplete: PXFieldState;
	AmountToComplete: PXFieldState;
	Quantity: PXFieldState<PXFieldOptions.CommitChanges>;
	Amount: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectedQuantity: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedPct: PXFieldState<PXFieldOptions.CommitChanges>;
	Mode: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CopyDialog extends PXView {
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefreshBudget: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyNotes: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyFiles: PXFieldState<PXFieldOptions.CommitChanges>;
}

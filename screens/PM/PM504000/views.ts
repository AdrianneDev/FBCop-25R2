import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridFilterBarVisibility,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Filter extends PXView {
	RecalculateProjectBalances: PXFieldState<PXFieldOptions.Disabled>;
	RecalculateUnbilledSummary: PXFieldState<PXFieldOptions.CommitChanges>;
	RebuildCommitments: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculateDraftInvoicesAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculateChangeOrders: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculateInclusiveTaxes: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculateProjectBudgetHistory: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class Items extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@linkCommand("ViewProject")
	ContractCD: PXFieldState;
	@columnConfig({ width: 350 })
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;
	Status: PXFieldState;
	StartDate: PXFieldState;
	ExpireDate: PXFieldState;
}

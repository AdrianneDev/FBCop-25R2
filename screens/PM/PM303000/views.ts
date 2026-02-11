import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Document extends PXView {
	RefNbr: PXFieldState;
	Status: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	CreatedByID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	LastModifiedByID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	@linkCommand("ViewDailyFieldReport")
	DailyFieldReportCD: PXFieldState<PXFieldOptions.Disabled>;
}

export class Project extends PXView {
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class Details extends PXView {
	LoadTemplate: PXActionState;
	SelectBudgetLines: PXActionState;

	OwnerID: PXFieldState;
	WorkgroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	UOM: PXFieldState;
	PreviouslyCompletedQuantity: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	PriorPeriodQuantity: PXFieldState;
	CurrentPeriodQuantity: PXFieldState;
	TotalCompletedQuantity: PXFieldState;
	CompletedPercentTotalQuantity: PXFieldState;
	TotalBudgetedQuantity: PXFieldState;
}

export class costBudgetfilter extends PXView {
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	syncPosition: true
})
export class CostBudgets extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	RevisedQty: PXFieldState;
}

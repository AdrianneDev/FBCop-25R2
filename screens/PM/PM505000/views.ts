import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnShowHideMode,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridFilterBarVisibility
} from "client-controls";

export class Filter extends PXView {
	BillingID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	ResourceID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	wrapToolbar: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	fastFilterByAllFields: false,
	quickFilterFields: [
		"PMTask__BillingID",
		"Customer__CustomerClassID",
		"PMProject__CustomerID",
		"InventoryID",
		"ResourceID",
	],
})
export class Items extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False,
		width: 35,
	})
	Selected: PXFieldState;
	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;
	Date: PXFieldState;
	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Customer__CustomerClassID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PMProject__CustomerID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ResourceID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	Qty: PXFieldState;
	Billable: PXFieldState;
	BillableQty: PXFieldState;
	UnitRate: PXFieldState;
	Amount: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PMTask__BillingID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
	EarningType: PXFieldState;
	OvertimeMultiplier: PXFieldState;
}

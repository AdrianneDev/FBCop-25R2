import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridColumnShowHideMode,
	columnConfig,
	gridConfig,
	GridPreset,
	GridColumnDisplayMode,
	controlConfig
} from "client-controls";

export class Task extends PXView {
	TaskCD: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
}

export class TaskProperties extends PXView {
	CompletedPctMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	ApproverID: PXFieldState;
	@controlConfig({ allowEdit: true })
	DefaultCostCodeID: PXFieldState;
	BillSeparately: PXFieldState;
	@controlConfig({ allowEdit: true })
	AllocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	BillingID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	DefaultBranchID: PXFieldState;
	@controlConfig({ allowEdit: true })
	RateTableID: PXFieldState;
	BillingOption: PXFieldState;
	@controlConfig({ allowEdit: true })
	WipAccountGroupID: PXFieldState;
	ProgressBillingBase: PXFieldState;
	@controlConfig({ allowEdit: true })
	TaxCategoryID: PXFieldState;
	@controlConfig({ allowEdit: true })
	DefaultSalesAccountID: PXFieldState;
	DefaultSalesSubID: PXFieldState;
	@controlConfig({ allowEdit: true })
	DefaultExpenseAccountID: PXFieldState;
	DefaultExpenseSubID: PXFieldState;
	@controlConfig({ allowEdit: true })
	DefaultAccrualAccountID: PXFieldState;
	DefaultAccrualSubID: PXFieldState;
	@controlConfig({ allowEdit: true })
	EarningsAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	EarningsSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	BenefitExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	BenefitExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	TaxExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PTOExpenseAcctID: PXFieldState;
	PTOExpenseSubID: PXFieldState;
	VisibleInGL: PXFieldState;
	VisibleInAP: PXFieldState;
	VisibleInAR: PXFieldState;
	VisibleInSO: PXFieldState;
	VisibleInPO: PXFieldState;
	VisibleInIN: PXFieldState;
	VisibleInCA: PXFieldState;
	VisibleInCR: PXFieldState;
	VisibleInTA: PXFieldState;
	VisibleInEA: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Budget extends PXView {
	PMAccountGroup__Type: PXFieldState;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState;
	IsProduction: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class BillingItems extends PXView {
	@columnConfig({hideViewLink: true})
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Amount: PXFieldState;
	AccountSource: PXFieldState<PXFieldOptions.CommitChanges>;
	SubMask: PXFieldState;
	@columnConfig({hideViewLink: true})
	BranchId: PXFieldState;
	@columnConfig({hideViewLink: true})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	SubID: PXFieldState;
	ResetUsage: PXFieldState;
	Included: PXFieldState;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false
})
export class Answers extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		width: 300
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({ width: 300 })
	Value: PXFieldState;
}


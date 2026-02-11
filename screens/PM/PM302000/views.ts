import {
	columnConfig,
	gridConfig,
	headerDescription,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	controlConfig,
} from "client-controls";

export class Task extends PXView {
	ProjectID: PXFieldState;
	TaskCD: PXFieldState;
	Type: PXFieldState;
	Description: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	IsDefault: PXFieldState;
	@headerDescription
	FormCaptionDescription: PXFieldState;
}

export class TaskProperties extends PXView {
	PlannedStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PlannedEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedPctMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedPercent: PXFieldState;
	ApproverID: PXFieldState;
	@controlConfig({ allowEdit: true })
	DefaultCostCodeID: PXFieldState;
	BillSeparately: PXFieldState;
	CustomerID: PXFieldState<PXFieldOptions.Disabled>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	AllocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	BillingID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	DefaultBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	RateTableID: PXFieldState;
	BillingOption: PXFieldState;
	@controlConfig({ allowEdit: true })
	WipAccountGroupID: PXFieldState;
	ProgressBillingBase: PXFieldState;
	@controlConfig({ allowEdit: true })
	TaxCategoryID: PXFieldState;
	@controlConfig({ allowEdit: true })
	DefaultSalesAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultSalesSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	DefaultExpenseAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true })
	DefaultAccrualAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;
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
	VisibleInPROD: PXFieldState;
	VisibleInTA: PXFieldState;
	VisibleInEA: PXFieldState;
}

export class TaskCampaign extends PXView {
	CampaignID: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Details })
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
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	ResetUsage: PXFieldState;
	Included: PXFieldState;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false,
})
export class Answers extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		width: 300,
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({ width: 300 })
	Value: PXFieldState;
}

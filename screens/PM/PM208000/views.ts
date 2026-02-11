import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	GridColumnShowHideMode,
	GridColumnDisplayMode,
	linkCommand,
	columnConfig,
	GridPreset,
	gridConfig,
	GridNoteFilesShowMode,
	GridAutoGrowMode,
} from "client-controls";

export class Project extends PXView {
	ContractCD: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState;
	NonProject: PXFieldState;
}

export class ProjectProperties extends PXView {
	BudgetLevel: PXFieldState<PXFieldOptions.CommitChanges>;
	CostBudgetLevel: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	AssistantID: PXFieldState<PXFieldOptions.CommitChanges>;
	ApproverID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountingMode: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowIssueFromFreeStock: PXFieldState<PXFieldOptions.CommitChanges>;
	ChangeOrderWorkflow: PXFieldState;
	RestrictToEmployeeList: PXFieldState;
	RestrictToResourceList: PXFieldState;
	BudgetMetricsEnabled: PXFieldState;
	TermsID: PXFieldState;
	AllocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoAllocate: PXFieldState;
	BillingID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultBranchID: PXFieldState;
	RateTableID: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateProforma: PXFieldState<PXFieldOptions.CommitChanges>;
	LimitsEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentDefCode: PXFieldState;
	AutomaticReleaseAR: PXFieldState;
	VisibleInGL: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInAP: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInAR: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInSO: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInPO: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInIN: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInCA: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInCR: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInPROD: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInTA: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleInEA: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageMode: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeCO: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	SteppedRetainageOption: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageMaxPct: PXFieldState;
	AIALevel: PXFieldState<PXFieldOptions.CommitChanges>;
	LastProformaNumber: PXFieldState;
	IncludeQtyInAIA: PXFieldState<PXFieldOptions.CommitChanges>;
	IsTimeMaterialAIA: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultSalesAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultSalesSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpenseAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultAccrualAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultOverbillingAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultOverbillingSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultUnderbillingAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultUnderbillingSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DropshipExpenseAccountSource: PXFieldState;
	DropshipExpenseSubMask: PXFieldState;
	DropshipReceiptProcessing: PXFieldState<PXFieldOptions.CommitChanges>;
	DropshipExpenseRecording: PXFieldState<PXFieldOptions.CommitChanges>;
	EarningsAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	EarningsSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	BenefitExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	BenefitExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PTOExpenseAcctID: PXFieldState;
	PTOExpenseSubID: PXFieldState;
	ThroughDateSourceConditional: PXFieldState;
	IsActive: PXFieldState;
	ThroughDateSourceUnconditional: PXFieldState;
}

export class Billing extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	syncPosition: true,
	allowInsert: true,
	allowDelete: true
})
export class RetainageSteps extends PXView {
	ThresholdPct: PXFieldState;
	RetainagePct: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class Tasks extends PXView {
	@linkCommand("ViewTask")
	TaskCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	RateTableID: PXFieldState;
	AllocationID: PXFieldState;
	BillingID: PXFieldState;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
	})
	ApproverID: PXFieldState;
	BillingOption: PXFieldState;
	ProgressBillingBase: PXFieldState;
	@columnConfig({hideViewLink: true})
	TaxCategoryID: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	BillSeparately: PXFieldState;
	DefaultCostCodeID: PXFieldState;
	@columnConfig({hideViewLink: true})
	EarningsAcctID: PXFieldState;
	@columnConfig({hideViewLink: true})
	EarningsSubID: PXFieldState;
	@columnConfig({hideViewLink: true})
	BenefitExpenseAcctID: PXFieldState;
	@columnConfig({hideViewLink: true})
	BenefitExpenseSubID: PXFieldState;
	@columnConfig({hideViewLink: true})
	TaxExpenseAcctID: PXFieldState;
	@columnConfig({hideViewLink: true})
	TaxExpenseSubID: PXFieldState;
	@columnConfig({hideViewLink: true})
	PTOExpenseAcctID: PXFieldState;
	@columnConfig({hideViewLink: true})
	PTOExpenseSubID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class RevenueBudget extends PXView {
	@columnConfig({hideViewLink: true})
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	LimitQty: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxQty: PXFieldState;
	LimitAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryMaxAmount: PXFieldState;
	PrepaymentPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaymentAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	TaxCategoryID: PXFieldState;
	ProgressBillingBase: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class CostBudget extends PXView {
	@columnConfig({hideViewLink: true})
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	IsProduction: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	RevenueTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProductivityTracking: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class EmployeeContract extends PXView {
	@columnConfig({hideViewLink: true})
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	EPEmployee__AcctName: PXFieldState;
	@columnConfig({hideViewLink: true})
	EPEmployee__DepartmentID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class ContractRates extends PXView {
	@columnConfig({hideViewLink: true})
	EarningType: PXFieldState<PXFieldOptions.CommitChanges>;
	EPEarningType__Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	LabourItemID: PXFieldState;
	InventoryItem__BasePrice: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class EquipmentRates extends PXView {
	IsActive: PXFieldState;
	EquipmentID: PXFieldState;
	EPEquipment__Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	EPEquipment__RunRateItemID: PXFieldState;
	RunRate: PXFieldState;
	@columnConfig({hideViewLink: true})
	EPEquipment__SetupRateItemID: PXFieldState;
	SetupRate: PXFieldState;
	@columnConfig({hideViewLink: true})
	EPEquipment__SuspendRateItemID: PXFieldState;
	SuspendRate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	pageSize: 20,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class Accounts extends PXView {
	@columnConfig({hideViewLink: true})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		hideViewLink: true,
		width: 400,
	})
	TaskID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	pageSize: 20,
	showBottomBar: true,
})
export class Markups extends PXView {
	Type: PXFieldState;
	Description: PXFieldState;
	Value: PXFieldState;
	@columnConfig({hideViewLink: true})
	TaskID: PXFieldState;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState;
	@columnConfig({hideViewLink: true})
	InventoryID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false,
})
export class Answers extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
		width: 300
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({ width: 300 })
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class LienWaiverRecipients extends PXView {
	AddAllVendorClasses: PXActionState;

	@columnConfig({hideViewLink: true})
	VendorClassId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 250})
	MinimumCommitmentAmount: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class ProjectContacts extends PXView {
	@linkCommand("Relations_EntityDetails")
	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	BusinessAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text
	})
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Contact__Salutation: PXFieldState;
	Contact__Email: PXFieldState<PXFieldOptions.CommitChanges>;
	Contact__Phone1: PXFieldState;
	Contact__Phone2: PXFieldState;
	Contact__Phone3: PXFieldState;
	@columnConfig({
		hideViewLink: true
	})
	RoleID: PXFieldState<PXFieldOptions.CommitChanges>;
	RoleDescription: PXFieldState;
	Contact__IsActive: PXFieldState;
}

export class CopyDialog extends PXView {
	TemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
}


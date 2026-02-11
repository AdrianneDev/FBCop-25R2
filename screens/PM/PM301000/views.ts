import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	GridColumnShowHideMode,
	linkCommand,
	columnConfig,
	gridConfig,
	GridColumnDisplayMode,
	GridPreset,
	GridNoteFilesShowMode,
	controlConfig,
	fieldConfig,
	GridAutoGrowMode,
} from "client-controls";

export class Project extends PXView {
	ContractCD: PXFieldState;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({addCommand: "AddNewProjectTemplate"})
	TemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	@fieldConfig({
		controlType: "qp-currency",
		controlConfig: {
			viewName: "CurrencyInfo"
		}
	})
	CuryID: PXFieldState;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Hold: PXFieldState<PXFieldOptions.Hidden>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	AssistantID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class TaskTotals extends PXView {
	CuryIncome: PXFieldState<PXFieldOptions.Disabled>;
	CuryExpense: PXFieldState<PXFieldOptions.Disabled>;
	CuryMargin: PXFieldState<PXFieldOptions.Disabled>;
	MarginPct: PXFieldState<PXFieldOptions.Disabled>;
}

export class ProjectProperties extends PXView {
	BudgetLevel: PXFieldState<PXFieldOptions.CommitChanges>;
	CostBudgetLevel: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState;
	ProjectGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	ApproverID: PXFieldState<PXFieldOptions.CommitChanges>;
	LastChangeOrderNumber: PXFieldState;
	CuryIDCopy: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	RateTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountingMode: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowIssueFromFreeStock: PXFieldState<PXFieldOptions.CommitChanges>;
	ChangeOrderWorkflow: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowNonProjectAccountGroups: PXFieldState;
	RestrictToEmployeeList: PXFieldState<PXFieldOptions.CommitChanges>;
	RestrictToResourceList: PXFieldState<PXFieldOptions.CommitChanges>;
	BudgetMetricsEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	CertifiedJob: PXFieldState;
	BillingCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayrollWorkLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	AllocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoAllocate: PXFieldState;
	BillingID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	RateTableID: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateProforma: PXFieldState<PXFieldOptions.CommitChanges>;
	LimitsEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentDefCode: PXFieldState;
	AutomaticReleaseAR: PXFieldState;
	RetainageMode: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeCO: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	SteppedRetainageOption: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageMaxPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryCapAmount: PXFieldState<PXFieldOptions.NoLabel>;
	AIALevel: PXFieldState<PXFieldOptions.CommitChanges>;
	LastProformaNumber: PXFieldState;
	IncludeQtyInAIA: PXFieldState<PXFieldOptions.CommitChanges>;
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
	QuoteNbr: PXFieldState<PXFieldOptions.Disabled>;
	CostTaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevenueTaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
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

export class ProjectRevenueTotals extends PXView {
	CuryAmount: PXFieldState;
	CuryRevisedAmount: PXFieldState;
	ContractCompletedPct: PXFieldState;
	ContractCompletedWithCOPct: PXFieldState;
	CuryTotalRetainedAmount: PXFieldState;
}

export class Billing extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	NextDate: PXFieldState;
	LastDate: PXFieldState;
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
	ViewAddCommonTask: PXActionState;
	ActivateTasks: PXActionState;
	CompleteTasks: PXActionState;

	@linkCommand("ViewTask")
	TaskCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	RateTableID: PXFieldState;
	AllocationID: PXFieldState;
	BillingID: PXFieldState;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedPercent: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
	})
	ApproverID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefaultCostCodeID: PXFieldState;
	BillingOption: PXFieldState;
	ProgressBillingBase: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	DefaultAccrualAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefaultAccrualSubID: PXFieldState;
	BillSeparately: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefaultBranchID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefaultSalesAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefaultSalesSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefaultExpenseAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefaultExpenseSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	WipAccountGroupID: PXFieldState;
	PlannedStartDate: PXFieldState;
	PlannedEndDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EarningsAcctID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EarningsSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BenefitExpenseAcctID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BenefitExpenseSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxExpenseAcctID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxExpenseSubID: PXFieldState;
	PTOExpenseAcctID: PXFieldState;
	PTOExpenseSubID: PXFieldState;
	CompletedPctMethod: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class RevenueFilter extends PXView {
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByTask: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmountToInvoiceTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class RevenueBudget extends PXView {
	ViewRevenueTransactions: PXActionState;
	Refresh: PXActionState;

	@columnConfig({hideViewLink: true})
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewRevenueBudgetInventory")
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Type: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	DraftChangeOrderQty: PXFieldState;
	CuryDraftChangeOrderAmount: PXFieldState;
	RevisedQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRevisedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	ChangeOrderQty: PXFieldState;
	CuryChangeOrderAmount: PXFieldState;
	LimitQty: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxQty: PXFieldState;
	LimitAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryMaxAmount: PXFieldState;
	CommittedQty: PXFieldState;
	CuryCommittedAmount: PXFieldState;
	CommittedReceivedQty: PXFieldState;
	CommittedInvoicedQty: PXFieldState;
	CuryCommittedInvoicedAmount: PXFieldState;
	CommittedOpenQty: PXFieldState;
	CuryCommittedOpenAmount: PXFieldState;
	InvoicedQty: PXFieldState;
	CuryInvoicedAmount: PXFieldState;
	ActualQty: PXFieldState;
	CuryActualAmount: PXFieldState;
	ActualAmount: PXFieldState;
	CuryActualPlusOpenCommittedAmount: PXFieldState;
	CuryVarianceAmount: PXFieldState;
	PrepaymentPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaymentAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaymentInvoiced: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaymentAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedPct: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyToInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmountToInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	Performance: PXFieldState;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	TaxCategoryID: PXFieldState;
	RetainageMaxPct: PXFieldState;
	CuryCapAmount: PXFieldState;
	CuryDraftRetainedAmount: PXFieldState;
	CuryRetainedAmount: PXFieldState;
	CuryTotalRetainedAmount: PXFieldState;
	ProgressBillingBase: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryInclTaxAmount: PXFieldState;
}

export class CostFilter extends PXView {
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByTask: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class CostBudget extends PXView {
	ViewCostCommitments: PXActionState;
	ViewCostTransactions: PXActionState;
	Refresh: PXActionState;

	@columnConfig({hideViewLink: true})
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewCostBudgetInventory")
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Type: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	DraftChangeOrderQty: PXFieldState;
	CuryDraftChangeOrderAmount: PXFieldState;
	ChangeOrderQty: PXFieldState;
	CuryChangeOrderAmount: PXFieldState;
	RevisedQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRevisedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CommittedOrigQty: PXFieldState;
	CuryCommittedOrigAmount: PXFieldState;
	CommittedCOQty: PXFieldState;
	CuryCommittedCOAmount: PXFieldState;
	CommittedQty: PXFieldState;
	CuryCommittedAmount: PXFieldState;
	CommittedReceivedQty: PXFieldState;
	CommittedInvoicedQty: PXFieldState;
	CuryCommittedInvoicedAmount: PXFieldState;
	CommittedOpenQty: PXFieldState;
	CuryCommittedOpenAmount: PXFieldState;
	ActualQty: PXFieldState;
	CuryActualAmount: PXFieldState;
	ActualAmount: PXFieldState;
	CuryActualPlusOpenCommittedAmount: PXFieldState;
	CuryVarianceAmount: PXFieldState;
	Performance: PXFieldState;
	IsProduction: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryCostToComplete: PXFieldState;
	CuryCostAtCompletion: PXFieldState;
	PercentCompleted: PXFieldState;
	CuryLastCostToComplete: PXFieldState;
	CuryLastCostAtCompletion: PXFieldState;
	LastPercentCompleted: PXFieldState;
	CuryCostProjectionCostToComplete: PXFieldState;
	CuryCostProjectionCostAtCompletion: PXFieldState;
	CostProjectionQtyToComplete: PXFieldState;
	CostProjectionQtyAtCompletion: PXFieldState;
	CostProjectionCompletedPct: PXFieldState;
	CuryUnitPrice: PXFieldState;
	@columnConfig({ hideViewLink: true })
	RevenueTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProductivityTracking: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
	allowFilter: false,
	allowSort: false
})
export class BalanceRecords extends PXView {
	ViewBalanceTransactions: PXActionState;
	ViewCommitments: PXActionState;

	@columnConfig({allowShowHide: GridColumnShowHideMode.False})
	RecordID: PXFieldState<PXFieldOptions.Hidden>;
	AccountGroup: PXFieldState;
	Description: PXFieldState;
	CuryAmount: PXFieldState;
	CuryDraftCOAmount: PXFieldState;
	CuryBudgetedCOAmount: PXFieldState;
	CuryRevisedAmount: PXFieldState;
	CuryOriginalCommittedAmount: PXFieldState;
	CuryCommittedCOAmount: PXFieldState;
	CuryCommittedAmount: PXFieldState;
	CuryCommittedInvoicedAmount: PXFieldState;
	CuryActualAmount: PXFieldState;
	ActualAmount: PXFieldState;
	CuryCommittedOpenAmount: PXFieldState;
	CuryActualPlusOpenCommittedAmount: PXFieldState;
	CuryVarianceAmount: PXFieldState;
	Performance: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.True})
	CuryInclTaxAmount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class PurchaseOrders extends PXView {
	CreatePurchaseOrder: PXActionState;
	CreateDropShipOrder: PXActionState;
	CreateSubcontract: PXActionState;

	OrderType: PXFieldState;
	@linkCommand("ViewPurchaseOrder")
	OrderNbr: PXFieldState;
	OrderDate: PXFieldState;
	@columnConfig({hideViewLink: true})
	VendorID: PXFieldState;
	VendorID_Vendor_acctName: PXFieldState;
	PMPOLine__CuryLineCost: PXFieldState;
	PMPOLine__OrderQty: PXFieldState;
	OrderQty: PXFieldState;
	CuryOrderTotal: PXFieldState;
	@columnConfig({hideViewLink: true})
	CuryID: PXFieldState;
	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class Invoices extends PXView {
	Aia: PXActionState;
	ViewReleaseRetainage: PXActionState;

	RecordNumber: PXFieldState;
	PMProforma__InvoiceDate: PXFieldState;
	@linkCommand("ViewProforma")
	ProformaRefNbr: PXFieldState;
	PMProforma__ProjectNbr: PXFieldState;
	PMProforma__Description: PXFieldState;
	PMProforma__Status: PXFieldState;
	PMProforma__CuryDocTotal: PXFieldState;
	@columnConfig({hideViewLink: true})
	PMProforma__CuryID: PXFieldState;
	ARDocType: PXFieldState;
	@linkCommand("ViewInvoice")
	ARRefNbr: PXFieldState;
	ARInvoice__DocDate: PXFieldState;
	ARInvoice__DocDesc: PXFieldState;
	ARInvoice__CuryOrigDocAmt: PXFieldState;
	ARInvoice__CuryRetainageTotal: PXFieldState;
	ARInvoice__CuryOrigDocAmtWithRetainageTotal: PXFieldState;
	ARInvoice__CuryDocBal: PXFieldState;
	@columnConfig({hideViewLink: true})
	ARInvoice__CuryID: PXFieldState;
	ARInvoice__Status: PXFieldState;
	ARInvoice__CuryRetainageUnreleasedAmt: PXFieldState;
	ARInvoice__IsRetainageDocument: PXFieldState;
	@linkCommand("ViewOrigDocument")
	ARInvoice__OrigRefNbr: PXFieldState;
	PMProforma__IsMigratedRecord: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true
})
export class ChangeOrders extends PXView {
	CreateChangeOrder: PXActionState;

	@linkCommand("ViewChangeOrder")
	RefNbr: PXFieldState;
	@columnConfig({hideViewLink: true})
	ClassID: PXFieldState;
	ProjectNbr: PXFieldState;
	Status: PXFieldState;
	Description: PXFieldState;
	Date: PXFieldState;
	CompletionDate: PXFieldState;
	DelayDays: PXFieldState;
	ExtRefNbr: PXFieldState;
	RevenueTotal: PXFieldState;
	CommitmentTotal: PXFieldState;
	CostTotal: PXFieldState;
	@linkCommand("ViewReversingChangeOrders")
	ReversingRefNbr: PXFieldState;
	@linkCommand("ViewOrigChangeOrder")
	OrigRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class ReversingChangeOrders extends PXView {
	@linkCommand("ViewCurrentReversingChangeOrder")
	RefNbr: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true
})
export class ChangeRequests extends PXView {
	CreateChangeRequest: PXActionState;

	@linkCommand("ViewChangeRequest")
	RefNbr: PXFieldState;
	Status: PXFieldState;
	Date: PXFieldState;
	Description: PXFieldState;
	CostTotal: PXFieldState;
	LineTotal: PXFieldState;
	MarkupTotal: PXFieldState;
	PriceTotal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class Unions extends PXView {
	UnionID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnionID_Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoRepaint: ["ContractRates"]
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
	LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class EquipmentRates extends PXView {
	IsActive: PXFieldState;
	EquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
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
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	pageSize: 20,
})
export class Accounts extends PXView {
	@columnConfig({hideViewLink: true})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	pageSize: 20,
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
	autoAdjustColumns: false
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
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	autoGrowInHeight: GridAutoGrowMode.Fit,
})
export class LienWaiverRecipients extends PXView {
	AddAllVendorClasses: PXActionState;

	@columnConfig({hideViewLink: true})
	VendorClassId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 250})
	MinimumCommitmentAmount: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class ProjectContacts extends PXView {
	CreateContact: PXActionState;

	IsActive: PXFieldState;
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

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false
})
export class ProjectProdOrders extends PXView {
	CreateProdOrder: PXActionState;

	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState;
	@linkCommand("ViewProdOrder")
	ProdOrdID: PXFieldState;
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;
	ProdDate: PXFieldState;
	QtytoProd: PXFieldState;
	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	QtyRemaining: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false
})
export class ProjectEstimates extends PXView {
	AMEstimateReference__EstimateID: PXFieldState;
	InventoryCD: PXFieldState;
	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;
	OrderQty: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AMEstimateReference__TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AMEstimateReference__CostCodeID: PXFieldState;
}

export class CreateProductionOrderFilter extends PXView {
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState;
	ProdDate: PXFieldState;
	QtytoProd: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState;
	CreateLinkedOrders: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class TemplateSettings extends PXView {
	TemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false
})
export class TasksForAddition extends PXView {
	@columnConfig({
		allowCheckAll: true
	})
	Selected: PXFieldState;
	TaskCD: PXFieldState;
	Description: PXFieldState;
	ApproverID: PXFieldState;
	PMProject__NonProject: PXFieldState;
}

export class CopyDialog extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class LoadFromTemplateDialog extends PXView {
	Message: PXFieldState;
}

export class DocumentSettings extends PXView {
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SLAETA_Date: PXFieldState;
	SLAETA_Time: PXFieldState<PXFieldOptions.NoLabel>;
	AssignedEmpID: PXFieldState;
	ProblemID: PXFieldState;
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDateTimeBegin_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDateTimeBegin_Time: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	ScheduledDateTimeEnd_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDateTimeEnd_Time: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	HandleManuallyScheduleTime: PXFieldState<PXFieldOptions.CommitChanges>;
}

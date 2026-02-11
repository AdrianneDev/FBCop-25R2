import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	controlConfig,
	gridConfig,
	GridPreset,
	columnConfig,
	headerDescription,
	linkCommand,
	GridFastFilterVisibility,
	PXActionState,
	TextAlign,
	GridPagerMode,
	GridNoteFilesShowMode
} from "client-controls";

export class Project extends PXView {
	@controlConfig({ allowEdit: false, displayMode: "id" })
	ContractCD: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true, displayMode: "text" })
	CustomerID: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({ allowEdit: true, displayMode: "text" })
	TemplateID: PXFieldState<PXFieldOptions.Disabled>;
	@headerDescription
	Description: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({ allowEdit: false, displayMode: "text" })
	OwnerID: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig({ allowEdit: false, displayMode: "text" })
	AssistantID: PXFieldState<PXFieldOptions.Disabled>;
	StartDate: PXFieldState<PXFieldOptions.Disabled>;
	ExpireDate: PXFieldState<PXFieldOptions.Disabled>;
	SiteAddressID: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Empty })
export class Restriction extends PXView  {
	Key: PXFieldState;
	Disabled: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	syncPosition: true,
	pageSize: 0,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class EPApproval extends PXView {
	DocDate: PXFieldState;
	@linkCommand("OpenApprovalEntity")
	RefNoteID: PXFieldState;
	DocType: PXFieldState;
	CuryTotalAmount: PXFieldState;
	@columnConfig({hideViewLink: true})
	CuryID: PXFieldState;
	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	syncPosition: true,
	pageSize: 0,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class ARInvoice extends PXView {
	DocDate: PXFieldState;
	@linkCommand("OpenArInvoice")
	RefNbr: PXFieldState;
	DocDesc: PXFieldState;
	Status: PXFieldState;
	ProjectARTran__CuryTranAmt: PXFieldState;
	@columnConfig({hideViewLink: true})
	CuryID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar
})
export class Task extends PXView {
	CreateProjectTask: PXActionState;

	@linkCommand("ViewTask")
	TaskCD: PXFieldState;
	Type: PXFieldState;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	RateTableID: PXFieldState;
	AllocationID: PXFieldState;
	BillingID: PXFieldState;
	Status: PXFieldState;
	CompletedPercent: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	ApproverID: PXFieldState;
	DefaultCostCodeID: PXFieldState;
	BillingOption: PXFieldState;
	ProgressBillingBase: PXFieldState;
	TaxCategoryID: PXFieldState;
	IsDefault: PXFieldState;
	DefaultAccrualAccountID: PXFieldState;
	DefaultAccrualSubID: PXFieldState;
	BillSeparately: PXFieldState;
	DefaultBranchID: PXFieldState;
	LocationID: PXFieldState;
	DefaultSalesAccountID: PXFieldState;
	DefaultSalesSubID: PXFieldState;
	DefaultExpenseAccountID: PXFieldState;
	DefaultExpenseSubID: PXFieldState;
	WipAccountGroupID: PXFieldState;
	PlannedStartDate: PXFieldState;
	PlannedEndDate: PXFieldState;
	EarningsAcctID: PXFieldState;
	EarningsSubID: PXFieldState;
	BenefitExpenseAcctID: PXFieldState;
	BenefitExpenseSubID: PXFieldState;
	TaxExpenseAcctID: PXFieldState;
	TaxExpenseSubID: PXFieldState;
	PTOExpenseAcctID: PXFieldState;
	PTOExpenseSubID: PXFieldState;
	CompletedPctMethod: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	allowSort: false,
	showFastFilter: GridFastFilterVisibility.ToolBar
})
export class RevenueBudget extends PXView {
	ViewRevenueTransactions: PXActionState;

	@columnConfig({hideViewLink: true})
	ProjectTaskID: PXFieldState;
	@linkCommand("ViewRevenueBudgetInventory")
	InventoryID: PXFieldState;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState;
	Description: PXFieldState;
	Type: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState;
	CuryUnitRate: PXFieldState;
	CuryAmount: PXFieldState;
	DraftChangeOrderQty: PXFieldState;
	CuryDraftChangeOrderAmount: PXFieldState;
	RevisedQty: PXFieldState;
	CuryRevisedAmount: PXFieldState;
	ChangeOrderQty: PXFieldState;
	CuryChangeOrderAmount: PXFieldState;
	LimitQty: PXFieldState;
	MaxQty: PXFieldState;
	LimitAmount: PXFieldState;
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
	PrepaymentPct: PXFieldState;
	CuryPrepaymentAmount: PXFieldState;
	CuryPrepaymentInvoiced: PXFieldState;
	CuryPrepaymentAvailable: PXFieldState;
	CompletedPct: PXFieldState;
	QtyToInvoice: PXFieldState;
	CuryAmountToInvoice: PXFieldState;
	Performance: PXFieldState;
	RetainagePct: PXFieldState;
	@columnConfig({hideViewLink: true})
	TaxCategoryID: PXFieldState;
	RetainageMaxPct: PXFieldState;
	CuryCapAmount: PXFieldState;
	CuryDraftRetainedAmount: PXFieldState;
	CuryRetainedAmount: PXFieldState;
	CuryTotalRetainedAmount: PXFieldState;
	ProgressBillingBase: PXFieldState;
	CuryInclTaxAmount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	allowSort: false,
	showFastFilter: GridFastFilterVisibility.ToolBar
})
export class CostBudget extends PXView {
	ViewCostCommitments: PXActionState;
	ViewCostTransactions: PXActionState;

	@columnConfig({hideViewLink: true})
	ProjectTaskID: PXFieldState;
	@linkCommand("ViewCostBudgetInventory")
	InventoryID: PXFieldState;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState;
	@columnConfig({hideViewLink: true})
	AccountGroupID: PXFieldState;
	Description: PXFieldState;
	Type: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState;
	CuryUnitRate: PXFieldState;
	CuryAmount: PXFieldState;
	DraftChangeOrderQty: PXFieldState;
	CuryDraftChangeOrderAmount: PXFieldState;
	ChangeOrderQty: PXFieldState;
	CuryChangeOrderAmount: PXFieldState;
	RevisedQty: PXFieldState;
	CuryRevisedAmount: PXFieldState;
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
	IsProduction: PXFieldState;
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
	RevenueTaskID: PXFieldState;
	ProductivityTracking: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	allowSort: false,
	showFastFilter: GridFastFilterVisibility.ToolBar
})
export class ProformaInvoice extends PXView {
	Aia: PXActionState;

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
	ARInvoice__CuryRetainageReleased: PXFieldState;
	ARInvoice__CuryRetainagePaidTotal: PXFieldState;
	ARInvoice__IsRetainageDocument: PXFieldState;
	@linkCommand("ViewOrigDocument")
	ARInvoice__OrigRefNbr: PXFieldState;
	PMProforma__IsMigratedRecord: PXFieldState;
}

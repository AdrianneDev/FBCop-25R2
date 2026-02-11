import {
	columnConfig,
	gridConfig,
	linkCommand,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridAutoGrowMode
} from "client-controls";

export class Document extends PXView {
	RefNbr: PXFieldState;
	Status: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	InvoiceDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState;
	ProjectNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	CuryProgressiveTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTransactionalTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotalWithRetainage: PXFieldState<PXFieldOptions.Disabled>;
	CuryDocTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryAmountDue: PXFieldState<PXFieldOptions.Disabled>;
	RetainagePct: PXFieldState<PXFieldOptions.Disabled>;
	CuryAllocatedRetainedTotal: PXFieldState<PXFieldOptions.Disabled>;
}

export class Project extends PXView {
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
}

export class Overflow extends PXView {
	CuryOverflowTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
})
export class Details extends PXView {
	@linkCommand("ViewTranDocument")
	RefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ResourceID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;
	Date: PXFieldState;
	Billable: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	ProjectCuryAmount: PXFieldState;
	InvoicedQty: PXFieldState;
	ProjectCuryInvoicedAmount: PXFieldState;
	ProjectCuryID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
})
export class Unbilled extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
	@linkCommand("ViewTranDocument")
	RefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ResourceID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;
	Date: PXFieldState;
	Billable: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	BillableQty: PXFieldState;
	TranCuryUnitRate: PXFieldState;
	TranCuryAmount: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TranCuryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OffsetAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OffsetSubID: PXFieldState;
}

export class DocumentSettings extends PXView {
	ARInvoiceDocType: PXFieldState<PXFieldOptions.CommitChanges>;
	ARInvoiceRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewARDocument")
	ARInvoiceRefName: PXFieldState<PXFieldOptions.CommitChanges>;
	ARInvoiceRefStatus: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState;
	DiscDate: PXFieldState;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	AvalaraCustomerUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
	IsMigratedRecord: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "ProgressPasteLine"
})
export class ProgressiveLines extends PXView {
	UploadFromBudget: PXActionState;
	LineNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewProgressLineTask")
	@columnConfig({hideViewLink: true, allowDragDrop: true})
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewProgressLineInventory")
	@columnConfig({allowDragDrop: true})
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowDragDrop: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	PMRevenueBudget__RevisedQty: PXFieldState;
	PMRevenueBudget__CuryRevisedAmount: PXFieldState;
	ActualQty: PXFieldState;
	PMRevenueBudget__CuryActualAmount: PXFieldState;
	PMRevenueBudget__CuryInvoicedAmount: PXFieldState;
	PreviouslyInvoicedQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPreviouslyInvoiced: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedPct: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryMaterialStoredAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTimeMaterialAmount: PXFieldState;
	CuryPrepaidAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CurrentInvoicedPct: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAllocatedRetainedAmount: PXFieldState;
	CuryRetainage: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DefCode: PXFieldState;
	SortOrder: PXFieldState;
	ProgressBillingBase: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "TransactPasteLine"
})
export class TransactionLines extends PXView {
	UploadUnbilled: PXActionState;
	ViewTransactionDetails: PXActionState;
	MergeWithProgress: PXActionState;
	RevertMergeWithProgress: PXActionState;

	Merged: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewTransactLineTask")
	@columnConfig({allowDragDrop: true})
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewTransactLineInventory")
	@columnConfig({allowDragDrop: true})
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true, allowDragDrop: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	ResourceID: PXFieldState;
	@linkCommand("ViewVendor")
	VendorID: PXFieldState;
	Date: PXFieldState;
	BillableQty: PXFieldState;
	CuryBillableAmount: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaidAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryMaxAmount: PXFieldState;
	CuryAvailableAmount: PXFieldState;
	CuryLineTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	Option: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOverflowAmount: PXFieldState;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainage: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	SubID: PXFieldState;
	RevenueTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	DefCode: PXFieldState;
	SortOrder: PXFieldState;
	LineNbr: PXFieldState;
	MergedToLineNbr: PXFieldState;
	CuryMergedAmount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class Taxes extends PXView {
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRate: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxableAmt: PXFieldState;
	CuryExemptedAmt: PXFieldState;
	CuryTaxAmt: PXFieldState;
	CuryRetainedTaxableAmt: PXFieldState;
	CuryRetainedTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class Revisions extends PXView {
	@columnConfig({width: 120})
	RevisionID: PXFieldState;
	CuryDocTotal: PXFieldState;
	CuryRetainageTotal: PXFieldState;
	CuryTaxTotal: PXFieldState;
	ARInvoiceDocType: PXFieldState;
	ARInvoiceRefNbr: PXFieldState<PXFieldOptions.Disabled>;
	ReversedARInvoiceDocType: PXFieldState;
	ReversedARInvoiceRefNbr: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState;
}

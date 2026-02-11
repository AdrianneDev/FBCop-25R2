import {
	columnConfig,
	gridConfig,
	headerDescription,
	linkCommand,
	GridColumnShowHideMode,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridNoteFilesShowMode,
	GridAutoGrowMode
} from "client-controls";

export class ExpenseClaim extends PXView {
	Hold: PXFieldState<PXFieldOptions.Hidden>;
	Approved: PXFieldState<PXFieldOptions.Hidden>;
	RefNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ApproveDate: PXFieldState;
	DocDesc: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	DepartmentID: PXFieldState<PXFieldOptions.Disabled>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	@headerDescription
	FormCaptionDescription: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
})
export class ReceiptsForSubmit extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	ClaimDetailCD: PXFieldState;
	ExpenseDate: PXFieldState;
	ExpenseRefNbr: PXFieldState;
	EmployeeID: PXFieldState;
	BranchID: PXFieldState;
	@linkCommand("ViewUnsubmitReceipt")
	TranDesc: PXFieldState;
	CuryTranAmtWithTaxes: PXFieldState;
	CuryID: PXFieldState;
	Status: PXFieldState;
}

export class CustomerUpdateAsk extends PXView {
	CustomerUpdateAnswer: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ExpenseClaimDetailsCurrent extends PXView {
	CuryTaxRoundDiff: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class Tax_Rows extends PXView {
	TaxID: PXFieldState;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ExpenseClaimCurrent extends PXView {
	CuryTaxRoundDiff: PXFieldState<PXFieldOptions.Disabled>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class ExpenseClaimDetails extends PXView {
	createNew: PXActionState;
	ShowSubmitReceipt: PXActionState;

	@linkCommand("EditDetail")
	ClaimDetailCD: PXFieldState;
	ExpenseDate: PXFieldState;
	ExpenseRefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	@linkCommand("ViewTaxes")
	CuryTaxTotal: PXFieldState;
	CuryEmployeePart: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTipAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryNetAmount: PXFieldState;
	CuryTranAmtWithTaxes: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ClaimCuryTranAmtWithTaxes: PXFieldState;
	Status: PXFieldState;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Billable: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewProject")
	ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaidWith: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CorpCardID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ExpenseAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ExpenseSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	SalesAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SalesSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState;
	TaxCalcMode: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARRefNbr: PXFieldState;
	@linkCommand("ViewAPInvoice")
	APRefNbr: PXFieldState;
	EmployeeID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	CustomerID_Customer_acctName: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Hidden>;
	ClaimDetailID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
})
export class Taxes extends PXView {
	TaxID: PXFieldState;
	TaxRate: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxableAmt: PXFieldState;
	CuryTaxAmt: PXFieldState;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	autoAdjustColumns: true,
	showTopBar: false,
})
export class APDocuments extends PXView {
	DocType: PXFieldState;
	@linkCommand("ViewInvoice")
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigDocAmt: PXFieldState;
	TaxZoneID: PXFieldState;
	TaxCalcMode: PXFieldState;
	Status: PXFieldState;
}

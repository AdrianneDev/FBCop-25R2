import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	GridAutoGrowMode,
	controlConfig, headerDescription
} from "client-controls";

export class ClaimDetails extends PXView {
	ClaimDetailCD: PXFieldState;
	ExpenseDate: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	CuryTranAmtWithTaxes: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	ClaimCuryTranAmtWithTaxes: PXFieldState<PXFieldOptions.Disabled>;
	CardCuryID: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.NoLabel>;
	BankTranStatus: PXFieldState<PXFieldOptions.Hidden>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CurrentClaimDetails extends PXView {
	TranDesc: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEmployeePart: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTipAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	ExpenseRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({displayMode: "both"})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusClaim: PXFieldState<PXFieldOptions.Disabled>;
	PaidWith: PXFieldState<PXFieldOptions.CommitChanges>;
	CorpCardID: PXFieldState<PXFieldOptions.CommitChanges>;
	Hold: PXFieldState<PXFieldOptions.Disabled>;
	Approved: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Hidden>;
	Rejected: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Hidden>;
	Released: PXFieldState<PXFieldOptions.Disabled>;
	HoldClaim: PXFieldState<PXFieldOptions.Disabled>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	FSEntityTypeUI: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	FSEntityNoteID: PXFieldState<PXFieldOptions.CommitChanges>;

	FSBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	Billable: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseSubID: PXFieldState;
	SalesAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesSubID: PXFieldState;
	CuryTaxRoundDiff: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	BankTranStatus: PXFieldState<PXFieldOptions.Disabled>;
	Category: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class Taxes extends PXView {
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;
	CuryTaxAmt: PXFieldState;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

export class ApprovalSetupView extends PXView {
	ApprovalEnabled: PXFieldState;
}

import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridPreset, PXActionState, GridColumnShowHideMode, controlConfig, GridColumnDisplayMode, GridAutoGrowMode, ISelectorControlConfig
} from "client-controls";

import { NullTextValues } from "src/screens/common/messages";

// Views

export class APQuickCheck extends PXView {
	DocType: PXFieldState;

	@controlConfig<ISelectorControlConfig>({
		fastFilterFields: ["RefNbr", "ExtRefNbr", "VendorID", "VendorID_Vendor_acctName"]
	})
	RefNbr: PXFieldState;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	AdjDate: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	DepositAfter: PXFieldState;

	@controlConfig({ rows: 2 })
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;

	@controlConfig({ allowEdit: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigWhTaxAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryRoundDiff: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryChargeAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true, nullText: NullTextValues.MultipleProjects })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CurrentAPQuickCheck extends PXView {
	@controlConfig({ allowEdit: true })
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	PrebookBatchNbr: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	VoidBatchNbr: PXFieldState<PXFieldOptions.Disabled>;

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	APAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	APSubID: PXFieldState;
	PrebookAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrebookSubID: PXFieldState;
	Cleared: PXFieldState<PXFieldOptions.CommitChanges>;
	ClearDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true, linkCommand: "ViewOriginalDocument" })
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;

	PrintCheck: PXFieldState<PXFieldOptions.CommitChanges>;
	DepositAsBatch: PXFieldState<PXFieldOptions.CommitChanges>;
	Deposited: PXFieldState;
	DepositDate: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	DepositNbr: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class APTran extends PXView {
	ViewSchedule: PXActionState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	LineNbr: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID_Account_description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	NonBillable: PXFieldState;
	@columnConfig({ displayMode: GridColumnDisplayMode.Both, hideViewLink: true })
	Box1099: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	DefScheduleID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;

	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	T5018Service: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class TaxTran extends PXView {
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, adjustPageSize: true })
export class APPaymentChargeTran extends PXView {

	@columnConfig({ hideViewLink: true })
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;
}

import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, PXFieldOptions, controlConfig, columnConfig,
	GridColumnShowHideMode, gridConfig, GridPreset, viewInfo,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.TX.SalesTaxMaint", primaryView: "Tax", })
export class TX205000 extends PXScreen {

	Tax = createSingle(Tax);

	@viewInfo({ syncAlways: true })
	TaxRevisions = createCollection(TaxRev);

	Categories = createCollection(TaxCategoryDet);
	Zones = createCollection(TaxZoneDet);
	CurrentTax = createSingle(Tax2);
	TaxForPrintingParametersTab = createSingle(Tax3);

}

export class Tax extends PXView {

	@controlConfig({ displayMode: "id" })
	TaxID: PXFieldState;

	Descr: PXFieldState;
	TaxType: PXFieldState<PXFieldOptions.CommitChanges>;
	DeductibleVAT: PXFieldState<PXFieldOptions.CommitChanges>;
	ReverseTax: PXFieldState<PXFieldOptions.CommitChanges>;
	PendingTax: PXFieldState<PXFieldOptions.CommitChanges>;
	StatisticalTax: PXFieldState<PXFieldOptions.CommitChanges>;
	DirectTax: PXFieldState<PXFieldOptions.CommitChanges>;
	ExemptTax: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeInTaxable: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcRule: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxApplyTermsDisc: PXFieldState;
	TaxCalcLevel2Exclude: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	TaxVendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	OutDate: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxUOM: PXFieldState<PXFieldOptions.CommitChanges>;

	IsExternal: PXFieldState;

}

export class Tax2 extends PXView {

	PerUnitTaxPostMode: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTaxAcctIDOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTaxSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTaxSubIDOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchTaxAcctIDOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchTaxSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchTaxSubIDOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ReportExpenseToSingleAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PendingSalesTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PendingSalesTaxSubID: PXFieldState;
	PendingPurchTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PendingPurchTaxSubID: PXFieldState;
	OnARPrepaymentTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	OnARPrepaymentTaxSubID: PXFieldState;
	OnAPPrepaymentTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	OnAPPrepaymentTaxSubID: PXFieldState;
	RetainageTaxPayableAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageTaxPayableSubID: PXFieldState;
	RetainageTaxClaimableAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageTaxClaimableSubID: PXFieldState;

}

export class Tax3 extends PXView {

	ShortPrintingLabel: PXFieldState;
	LongPrintingLabel: PXFieldState;
	PrintingSequence: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class TaxRev extends PXView {

	StartDate: PXFieldState;
	TaxRate: PXFieldState;
	NonDeductibleTaxRate: PXFieldState;
	TaxableMin: PXFieldState;
	TaxableMax: PXFieldState;
	TaxableMaxQty: PXFieldState;
	TaxBucketID: PXFieldState;
	TaxType: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class TaxCategoryDet extends PXView {

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxCategory__TaxCatFlag: PXFieldState;
	TaxCategory__Descr: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class TaxZoneDet extends PXView {

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxZone__DfltTaxCategoryID: PXFieldState;
	TaxZone__Descr: PXFieldState;

}

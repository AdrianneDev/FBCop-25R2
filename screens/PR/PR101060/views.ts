import {
	PXFieldOptions,
	PXFieldState,
	PXView,
	gridConfig,
	GridPreset,
	columnConfig,
	controlConfig,
	GridAutoGrowMode,
	GridColumnType,
	TextAlign
} from "client-controls";

export class Document extends PXView {
	CodeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	ContribType: PXFieldState<PXFieldOptions.CommitChanges>;
	AssociatedSource: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState;
	DedInvDescrType: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
	IsGarnishment: PXFieldState<PXFieldOptions.CommitChanges>;
	AffectsTaxes: PXFieldState<PXFieldOptions.CommitChanges>;
	AcaApplicable: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPayableBenefit: PXFieldState<PXFieldOptions.CommitChanges>;
	VndInvDescr: PXFieldState;
	ShowApplicableWageTab: PXFieldState;
	ShowUSTaxSettingsTab: PXFieldState<PXFieldOptions.Hidden>;
	ShowCANTaxSettingsTab: PXFieldState<PXFieldOptions.Hidden>;
}

export class CurrentDocument extends PXView {
	IncludeType: PXFieldState<PXFieldOptions.CommitChanges>;
	BenefitTypeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowSupplementalElection: PXFieldState;
	BenefitTypeCDCAN: PXFieldState<PXFieldOptions.CommitChanges>;
	MinimumIndividualContribution: PXFieldState;
	DedCalcType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true }) DedAmount: PXFieldState;
	@controlConfig({ allowNull: true }) DedPercent: PXFieldState;
	DedMaxFreqType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true }) DedMaxAmount: PXFieldState;
	DedApplicableEarnings: PXFieldState<PXFieldOptions.CommitChanges>;
	DedReportType: PXFieldState;
	DedReportTypeCAN: PXFieldState;
	DedQuebecReportTypeCAN: PXFieldState;
	CntCalcType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true }) CNtAmount: PXFieldState;
	@controlConfig({ allowNull: true }) CntPercent: PXFieldState;
	CntMaxFreqType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true }) CntMaxAmount: PXFieldState;
	CntApplicableEarnings: PXFieldState<PXFieldOptions.CommitChanges>;
	CntReportType: PXFieldState;
	CntReportTypeCAN: PXFieldState;
	CertifiedReportType: PXFieldState;
	CntQuebecReportTypeCAN: PXFieldState;
	NoFinancialTransaction: PXFieldState<PXFieldOptions.CommitChanges>;
	ContributesToGrossCalculation: PXFieldState<PXFieldOptions.CommitChanges>;
	ContributesToBenefitApplicableWage: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState;
	EarningsIncreasingWageIncludeType: PXFieldState<PXFieldOptions.CommitChanges>;
	BenefitsIncreasingWageIncludeType: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxesIncreasingWageIncludeType: PXFieldState<PXFieldOptions.CommitChanges>;
	DeductionsDecreasingWageIncludeType: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxesDecreasingWageIncludeType: PXFieldState<PXFieldOptions.CommitChanges>;
	DedLiabilityAcctID: PXFieldState;
	DedLiabilitySubID: PXFieldState;
	BenefitExpenseAcctID: PXFieldState;
	BenefitExpenseSubID: PXFieldState;
	BenefitLiabilityAcctID: PXFieldState;
	BenefitLiabilitySubID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class DeductCodeTaxesUS extends PXView {
	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxID_Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class DeductCodeTaxesCAN extends PXView {
	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxID_Description: PXFieldState;
	IsDeductionPreTax: PXFieldState;
	IsBenefitTaxable: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class AcaInformation extends PXView {
	CoverageType: PXFieldState<PXFieldOptions.CommitChanges>;
	HealthPlanType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class WorkCompensationRates extends PXView {
	@columnConfig({ type: GridColumnType.CheckBox, textAlign: TextAlign.Center })
	IsActive: PXFieldState;

	@columnConfig({ hideViewLink: true })
	WorkCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	PMWorkCode__Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	DeductionRate: PXFieldState;
	Rate: PXFieldState;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class MaximumInsurableWages extends PXView {
	MaximumInsurableWage: PXFieldState;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class EarningsIncreasingWage extends PXView {
	ApplicableTypeCD: PXFieldState;
	EPEarningType__Description: PXFieldState;
	EPEarningType__EarningTypeCategory: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class BenefitsIncreasingWage extends PXView {
	ApplicableBenefitCodeID: PXFieldState;
	ApplicableBenefitCodeID_Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit

})
export class TaxesIncreasingWage extends PXView {
	ApplicableTaxID: PXFieldState;
	PRTaxCode__Description: PXFieldState;
	PRTaxCode__TaxCategory: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class DeductionsDecreasingWage extends PXView {
	ApplicableDeductionCodeID: PXFieldState;
	ApplicableDeductionCodeID_Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class TaxesDecreasingWage extends PXView {
	ApplicableTaxID: PXFieldState;
	PRTaxCode__Description: PXFieldState;
	PRTaxCode__TaxCategory: PXFieldState;
}


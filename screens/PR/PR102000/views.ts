import {
	PXFieldOptions,
	PXFieldState,
	PXView,
	gridConfig,
	GridPreset,
	columnConfig,
	GridAutoGrowMode
} from "client-controls";

export class EarningTypes extends PXView {
	TypeCD: PXFieldState;
	Description: PXFieldState;
	EarningTypeCategory: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeMultiplier: PXFieldState<PXFieldOptions.CommitChanges>;
	RegularTypeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	IsWCCCalculation: PXFieldState;
	PublicHoliday: PXFieldState;
}

export class EarningSettings extends PXView {
	WageTypeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ReportType: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeType: PXFieldState<PXFieldOptions.CommitChanges>;
	WageTypeCDCAN: PXFieldState<PXFieldOptions.CommitChanges>;
	ReportTypeCAN: PXFieldState<PXFieldOptions.CommitChanges>;
	QuebecReportTypeCAN: PXFieldState<PXFieldOptions.CommitChanges>;
	IsSupplementalCAN: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState;
	TaskID: PXFieldState;
	EarningsAcctID: PXFieldState;
	EarningsSubID: PXFieldState;
	BenefitExpenseAcctID: PXFieldState;
	BenefitExpenseSubID: PXFieldState;
	TaxExpenseAcctID: PXFieldState;
	TaxExpenseSubID: PXFieldState;
	PTOExpenseAcctID: PXFieldState;
	PTOExpenseSubID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class PRRegularTypesForOvertime extends PXView {
	RegularTypeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	EPEarningType__Description: PXFieldState;
	EPEarningType__EarningTypeCategory: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class EarningTypeTaxesUS extends PXView {
	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxID_Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class EarningTypeTaxesCAN extends PXView {
	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState;

	TaxID_Description: PXFieldState;
	Taxability: PXFieldState;
}

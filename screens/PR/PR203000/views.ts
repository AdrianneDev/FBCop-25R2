import { Column } from "@bryntum/schedulerpro";
import {
	PXActionState,
	PXFieldState,
	PXView,
	GridColumnShowHideMode,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	linkCommand,
	GridPreset,
	GridColumnType,
	TextAlign,
	controlConfig,
	GridAutoGrowMode
} from "client-controls";

export class PayrollEmployee extends PXView {
	@controlConfig({displayMode: "both"})
	AcctCD: PXFieldState;
	AcctName: PXFieldState;
	ActiveInPayroll: PXFieldState;
}

export class CurrentPayrollEmployee extends PXView {
	EmployeeClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmpType: PXFieldState<PXFieldOptions.CommitChanges>;
	EmpTypeUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	PayGroupID: PXFieldState;

	PayGroupUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	CalendarID: PXFieldState<PXFieldOptions.CommitChanges>;
	CalendarIDUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	HoursPerWeek: PXFieldState;
	StdWeeksPerYear: PXFieldState<PXFieldOptions.CommitChanges>;
	StdWeeksPerYearUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	HoursPerYear: PXFieldState;
	OverrideHoursPerYearForCertified: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideHoursPerYearForCertifiedUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	HoursPerYearForCertified: PXFieldState;
	HoursPerYearForCertifiedUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	ExemptFromOvertimeRules: PXFieldState<PXFieldOptions.CommitChanges>;
	ExemptFromOvertimeRulesUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	UnionID: PXFieldState;

	UnionUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkCodeID: PXFieldState;
	WorkCodeUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	ExemptFromCertifiedReporting: PXFieldState<PXFieldOptions.CommitChanges>;
	ExemptFromCertifiedReportingUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	UsePayrollProjectWorkLocation: PXFieldState<PXFieldOptions.CommitChanges>;
	UsePayrollProjectWorkLocationUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	DedSplitType: PXFieldState;
	NetPayMin: PXFieldState;
	NetPayMinUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	GrnMaxPctNet: PXFieldState;
	GrnMaxPctuseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	UseCustomSettings: PXFieldState<PXFieldOptions.CommitChanges>;
	UsePTOBanksFromClass: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	EarningsAcctID: PXFieldState;
	EarningsSubID: PXFieldState;
	DedLiabilityAcctID: PXFieldState;
	DedLiabilitySubID: PXFieldState;
	BenefitExpenseAcctID: PXFieldState;
	BenefitExpenseSubID: PXFieldState;
	BenefitLiabilityAcctID: PXFieldState;
	BenefitLiabilitySubID: PXFieldState;
	PayrollTaxExpenseAcctID: PXFieldState;
	PayrollTaxExpenseSubID: PXFieldState;
	PayrollTaxLiabilityAcctID: PXFieldState;
	PayrollTaxLiabilitySubID: PXFieldState;
	PTOExpenseAcctID: PXFieldState;
	PTOExpenseSubID: PXFieldState;
	PTOLiabilityAcctID: PXFieldState;
	PTOLiabilitySubID: PXFieldState;
	PTOAssetAcctID: PXFieldState;
	PTOAssetSubID: PXFieldState;
}

export class Contact extends PXView {
	DateOfBirth: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class WorkLocations extends PXView {
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	PRLocation__Description: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class EmploymentHistory extends PXView {
	ProbationPeriodEndDate: PXFieldState;
	HireDate: PXFieldState;
	TerminationDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	allowInsert: true,
	allowDelete: true
})
export class EmployeePositions extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PositionID: PXFieldState<PXFieldOptions.CommitChanges>;

	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	StartReason: PXFieldState;
	ProbationPeriodEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsTerminated: PXFieldState<PXFieldOptions.CommitChanges>;
	TermReason: PXFieldState<PXFieldOptions.CommitChanges>;
	IsRehirable: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPayCheck")
	SettlementPaycheckRefNoteID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true,
	fastFilterByAllFields: false
})
export class EmployeeAttributes extends PXView {
	Description: PXFieldState;
	AdditionalInformation: PXFieldState;
	CompanyNotes: PXFieldState;
	State: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Required: PXFieldState;
	UsedForTaxCalculation: PXFieldState;
	UsedForGovernmentReporting: PXFieldState;
	FormBox: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true,
	autoRepaint: ["EmployeeTaxAttributes"],
	syncPosition: true,
	fastFilterByAllFields: false
})
export class EmployeeTax extends PXView {
	ImportTaxes: PXActionState;

	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxID_Description: PXFieldState;
	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	wrapToolbar: true,
	fastFilterByAllFields: false
})
export class EmployeeTaxAttributes extends PXView {
	Description: PXFieldState;
	AdditionalInformation: PXFieldState;
	CompanyNotes: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Required: PXFieldState;
	FormBox: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false
})
export class EmployeeEarning extends PXView {
	TypeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	TypeCD_Description: PXFieldState;
	IsActive: PXFieldState;
	PayRate: PXFieldState;
	UnitType: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	keepPosition: true
})
export class EmployeeDeduction extends PXView {
	GarnishmentDetails: PXActionState;

	CodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CodeID_Description: PXFieldState;
	IsActive: PXFieldState;
	DedAmount: PXFieldState;
	DedPercent: PXFieldState;
	DedMaxFreqType: PXFieldState;
	DedMaxAmount: PXFieldState;
	DedUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	CntAmount: PXFieldState;
	CntPercent: PXFieldState;
	CntMaxFreqType: PXFieldState;
	CntMaxAmount: PXFieldState;
	CntUseDflt: PXFieldState<PXFieldOptions.CommitChanges>;
	IsGarnishment: PXFieldState;
	Sequence: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	syncPosition: true,
	allowInsert: true,
	allowDelete: true
})
export class PREmployeePTOBank extends PXView {
	ViewAvailablePTOPaidHours: PXActionState;

	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	BankID: PXFieldState<PXFieldOptions.CommitChanges>;
	BankID_Description: PXFieldState;
	BandingRule: PXFieldState;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	AccrualMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	AccrualRate: PXFieldState<PXFieldOptions.CommitChanges>;
	HoursPerYear: PXFieldState<PXFieldOptions.CommitChanges>;
	FrontLoadingAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	AccrualLimit: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	AllowNegativeBalance: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	DisburseFromCarryover: PXFieldState<PXFieldOptions.CommitChanges>;

	TransferDate: PXFieldState;
	CarryoverType: PXFieldState<PXFieldOptions.CommitChanges>;
	CarryoverAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	ProbationPeriodBehaviour: PXFieldState<PXFieldOptions.CommitChanges>;
	SettlementBalanceType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	AllowViewAvailablePTOPaidHours: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false
})
export class EmployeeDirectDeposit extends PXView {
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BankAcctNbr: PXFieldState;

	@columnConfig({
		allowShowHide: GridColumnShowHideMode.Server
	})
	BankAcctType: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BankName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BankRoutingNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	FinInstNbrCan: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BankTransitNbrCan: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BankAcctNbrCan: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BeneficiaryName: PXFieldState;

	Amount: PXFieldState<PXFieldOptions.CommitChanges>;
	Percent: PXFieldState<PXFieldOptions.CommitChanges>;
	SortOrder: PXFieldState;
	GetsRemainder: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CurrentDeduction extends PXView {
	GarnBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	VndInvDescr: PXFieldState<PXFieldOptions.CommitChanges>;
	GarnCourtName: PXFieldState<PXFieldOptions.CommitChanges>;
	GarnDocRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	GarnCourtDate: PXFieldState<PXFieldOptions.CommitChanges>;
	GarnOrigAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	GarnPaidAmount: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CreateEditPREmployeeFilter extends PXView {
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeClassID: PXFieldState;
	PaymentMethodID: PXFieldState;
	CashAccountID: PXFieldState;
}

export class PTOPaidHoursPopupFilter extends PXView {
	BankID: PXFieldState;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DisbursingType: PXFieldState<PXFieldOptions.CommitChanges>;
	PayRate: PXFieldState<PXFieldOptions.CommitChanges>;
	AvailablePaidHours: PXFieldState<PXFieldOptions.CommitChanges>;
}


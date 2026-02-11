import {
	PXView, PXFieldState, PXActionState,
	controlConfig, gridConfig, GridPreset, columnConfig,
	PXFieldOptions, linkCommand, headerDescription, fieldConfig
} from "client-controls";


export class BAccount extends PXView {
	@headerDescription
	AcctCD: PXFieldState;
	@headerDescription
	AcctName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class State extends PXView {
	IsBranchTabVisible: PXFieldState;
	IsDeliverySettingsTabVisible: PXFieldState;
	IsGLAccountsTabVisible: PXFieldState;
	IsRutRotTabVisible: PXFieldState;
	IsGroup: PXFieldState;
	IsCompanyGroupsVisible: PXFieldState;
}

export class LedgerCreateParameters extends PXView {
	LedgerCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class BAccount2 extends PXView {
	LegalName: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRegistrationID: PXFieldState<PXFieldOptions.CommitChanges>;
	MTDApplicationID: PXFieldState;
	RegisteredEntityForReporting: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class Organization extends PXView {
	OrganizationType: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	UseForAnomalyService: PXFieldState<PXFieldOptions.CommitChanges>;
	CarrierFacility: PXFieldState;

	@controlConfig({ allowEdit: true })
	BaseCuryID: PXFieldState<PXFieldOptions.CommitChanges>;

	FileTaxesByBranches: PXFieldState<PXFieldOptions.CommitChanges>;
	Reporting1099ByBranches: PXFieldState<PXFieldOptions.CommitChanges>;
	Reporting1099: PXFieldState<PXFieldOptions.CommitChanges>;
	RoleName: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CountryID: PXFieldState;

	OrganizationLocalizationCode: PXFieldState<PXFieldOptions.CommitChanges>;
	CashDiscountBase: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultPrinterID: PXFieldState;
	TCC: PXFieldState;
	CFSFiler: PXFieldState;
	ForeignEntity: PXFieldState;
	ContactName: PXFieldState;
	CTelNumber: PXFieldState;
	CEmail: PXFieldState;
	NameControl: PXFieldState;
	LogoName: PXFieldState;
	LogoNameGetter: PXFieldState<PXFieldOptions.Disabled>;
	LogoNameReport: PXFieldState;
	LogoNameReportGetter: PXFieldState<PXFieldOptions.Disabled>;
	OverrideThemeVariables: PXFieldState<PXFieldOptions.CommitChanges>;
	PrimaryColor: PXFieldState<PXFieldOptions.CommitChanges>;
	BackgroundColor: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowsRUTROT: PXFieldState<PXFieldOptions.CommitChanges>;
	RUTROTCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	RUTROTClaimNextRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	RUTROTOrgNbrValidRegEx: PXFieldState;
	DefaultRUTROTType: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxAgencyAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	BalanceOnProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	ROTPersonalAllowanceLimit: PXFieldState;
	ROTExtraAllowanceLimit: PXFieldState;
	ROTDeductionPct: PXFieldState;
	RUTPersonalAllowanceLimit: PXFieldState;
	RUTExtraAllowanceLimit: PXFieldState;
	RUTDeductionPct: PXFieldState;
}

export class Location extends PXView {
	CAvalaraExemptionNumber: PXFieldState;
	CAvalaraCustomerUsageType: PXFieldState;
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VTaxZoneID: PXFieldState;

	CShipComplete: PXFieldState;
	CMPSalesSubID: PXFieldState;
	CMPExpenseSubID: PXFieldState;
	CMPFreightSubID: PXFieldState;
	CMPDiscountSubID: PXFieldState;
	CMPGainLossSubID: PXFieldState;
	CMPPayrollSubID: PXFieldState;
}

export class CommonSetup extends PXView {
	DecPlQty: PXFieldState<PXFieldOptions.CommitChanges>;
	DecPlPrcCst: PXFieldState;

	@controlConfig({ allowEdit: true })
	WeightUOM: PXFieldState;

	@controlConfig({ allowEdit: true })
	LinearUOM: PXFieldState;

	@controlConfig({ allowEdit: true })
	VolumeUOM: PXFieldState;
}

export class Company extends PXView {
	PhoneMask: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class Branch extends PXView {
	AddBranch: PXActionState;

	@linkCommand("ViewBranch")
	BranchCD: PXFieldState<PXFieldOptions.CommitChanges>;

	AcctName: PXFieldState;
	Active: PXFieldState;
	IsDunningCompanyBranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	RoleName: PXFieldState;
	Roles__Descr: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class EPEmployee extends PXView {
	NewContact: PXActionState;

	@columnConfig({ hideViewLink: true })
	BranchAlias__BranchCD: PXFieldState;

	@linkCommand("ViewContact")
	AcctCD: PXFieldState;

	Contact__DisplayName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DepartmentID: PXFieldState;

	Address__City: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Address__State: PXFieldState;

	Address__Department: PXFieldState<PXFieldOptions.Hidden>;
	Address__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	Address__StreetName: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingName: PXFieldState<PXFieldOptions.Hidden>;
	Address__Floor: PXFieldState<PXFieldOptions.Hidden>;
	Address__UnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostBox: PXFieldState<PXFieldOptions.Hidden>;
	Address__Room: PXFieldState<PXFieldOptions.Hidden>;
	Address__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	Address__DistrictName: PXFieldState<PXFieldOptions.Hidden>;

	Contact__Phone1: PXFieldState;
	Contact__EMail: PXFieldState;
	VStatus: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, allowDelete: false })
export class OrganizationLedgerLink extends PXView {

	DeleteOrganizationLedgerLink: PXActionState;

	@linkCommand("ViewLedger")
	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;

	Ledger__Descr: PXFieldState;
	Ledger__BalanceType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Ledger__BaseCuryID: PXFieldState;
	Ledger__ConsolAllowed: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class GroupOrganizationLink extends PXView {
	SetAsPrimary: PXActionState;

	@linkCommand("ViewGroup")
	GroupID: PXFieldState;
	Organization__OrganizationName: PXFieldState;
	PrimaryGroup: PXFieldState<PXFieldOptions.CommitChanges>;
}

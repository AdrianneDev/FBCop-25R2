import {
	PXView, PXFieldState,
	gridConfig, columnConfig, linkCommand, controlConfig,
	PXFieldOptions, PXActionState, GridPreset, fieldConfig,
	GridNoteFilesShowMode, headerDescription
} from "client-controls";

export class BAccount extends PXView  {
	@headerDescription
	AcctCD: PXFieldState;
	@headerDescription
	AcctName: PXFieldState<PXFieldOptions.CommitChanges>;
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class BAccount2 extends PXView  {
	CarrierFacility: PXFieldState;
	BranchRoleName: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	BranchCountryID: PXFieldState<PXFieldOptions.CommitChanges>;

	DefaultPrinterID: PXFieldState;
	LegalName: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRegistrationID: PXFieldState<PXFieldOptions.CommitChanges>;
	MTDApplicationID: PXFieldState;
	Reporting1099: PXFieldState<PXFieldOptions.CommitChanges>;
	RegisteredEntityForReporting: PXFieldState<PXFieldOptions.CommitChanges>;
	IsDunningCompanyBranchID: PXFieldState;
	TCC: PXFieldState;
	CFSFiler: PXFieldState;
	ForeignEntity: PXFieldState;
	ContactName: PXFieldState;
	CTelNumber: PXFieldState;
	CEmail: PXFieldState;
	NameControl: PXFieldState;
	BranchLogoName: PXFieldState;
	BranchLogoNameGetter: PXFieldState<PXFieldOptions.Disabled>;
	BranchLogoNameReport: PXFieldState;
	BranchLogoNameReportGetter: PXFieldState<PXFieldOptions.Disabled>;
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

export class Location extends PXView  {
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

@gridConfig({ syncPosition: true, preset: GridPreset.ReadOnly })
export class EPEmployee extends PXView  {
	NewContact: PXActionState;
	AcctCD: PXFieldState;

	Contact__DisplayName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DepartmentID: PXFieldState;

	Address__City: PXFieldState;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
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

	@columnConfig({ hideViewLink: true })
	Address__State: PXFieldState;

	Contact__Phone1: PXFieldState;
	Contact__EMail: PXFieldState;
	VStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class Ledger extends PXView  {
	@linkCommand("ViewLedger")
	LedgerCD: PXFieldState;
	Descr: PXFieldState;
	BalanceType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseCuryID: PXFieldState;
	ConsolAllowed: PXFieldState;
}

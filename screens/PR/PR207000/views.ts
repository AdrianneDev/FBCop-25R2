import { PXView, PXFieldState, gridConfig, PXFieldOptions, PXActionState, GridPreset, columnConfig, GridColumnType, TextAlign } from "client-controls";

export class PRAcaCompanyYearlyInformation extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	Year: PXFieldState<PXFieldOptions.CommitChanges>;
	Ein: PXFieldState;
	IsPartOfAggregateGroup: PXFieldState<PXFieldOptions.CommitChanges>;
	IsAuthoritativeTransmittal: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class MonthFilter extends PXView {
	Month: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class PRAcaEmployeeMonthlyInformation extends PXView {
	UpdateSelectedEmployees: PXActionState;
	UpdateAllEmployees: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PREmployee__AcctCD: PXFieldState;

	PREmployee__AcctName: PXFieldState;
	Month: PXFieldState;
	FTStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	OfferOfCoverage: PXFieldState<PXFieldOptions.CommitChanges>;
	Section4980H: PXFieldState;
	MinimumIndividualContribution: PXFieldState;
	HoursWorked: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class PRAcaCompanyMonthlyInformation extends PXView {
	UpdateSelectedCompanyMonths: PXActionState;
	UpdateAllCompanyMonths: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 300 })
	Month: PXFieldState;

	@columnConfig({ width: 125 })
	NumberOfFte: PXFieldState;

	@columnConfig({ width: 125 })
	NumberOfEmployees: PXFieldState;

	@columnConfig({ width: 125 })
	PctEmployeesCoveredByMec: PXFieldState;

	@columnConfig({ width: 250 })
	CertificationOfEligibility: PXFieldState;

	@columnConfig({ width: 125, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	SelfInsured: PXFieldState;

	@columnConfig({ width: 200 })
	Numberof1095C: PXFieldState;
}

export class PRAcaAggregateGroupMember extends PXView {
	@columnConfig({ width: 400 })
	MemberCompanyName: PXFieldState;

	@columnConfig({ width: 300 })
	MemberEin: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 200 })
	HighestMonthlyFteNumber: PXFieldState;
}

export class PRAcaUpdateEmployeeFilter extends PXView {
	UpdateAcaFTStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateOfferOfCoverage: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateSection4980H: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateMinimumIndividualContribution: PXFieldState<PXFieldOptions.CommitChanges>;
	AcaFTStatus: PXFieldState;
	OfferOfCoverage: PXFieldState;
	Section4980H: PXFieldState;
	MinimumIndividualContribution: PXFieldState;
}

export class PRAcaUpdateCompanyMonthFilter extends PXView {
	UpdateCertificationOfEligibility: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateSelfInsured: PXFieldState<PXFieldOptions.CommitChanges>;
	CertificationOfEligibility: PXFieldState;
	SelfInsured: PXFieldState;
}

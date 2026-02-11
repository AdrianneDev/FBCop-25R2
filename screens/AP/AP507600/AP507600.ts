import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions,
	columnConfig, GridPreset, linkCommand, PXActionState
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.Localizations.CA.CRATaxReportProcessing", primaryView: "ReportFilter", hideFilesIndicator: false })
export class AP507600 extends PXScreen {

	ViewDocument: PXActionState;

	ReportFilter = createSingle(CRAReportFilter);
	Report = createSingle(CRAReport);
	ReportSummary = createSingle(CRAReportSummary);
	ReportDetails = createCollection(CRAReportDetail);
}

export class CRAReportFilter extends PXView {
	CRAReportType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Year: PXFieldState<PXFieldOptions.CommitChanges>;
	Revision: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CRAReport extends PXView {
	RevisionSubmitted: PXFieldState;
	FilingType: PXFieldState<PXFieldOptions.CommitChanges>;
	ThresholdAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState;
	ToDate: PXFieldState;
}

export class CRAReportSummary extends PXView {
	Language: PXFieldState;
	ProgramNumber: PXFieldState;
	TransmitterNumber: PXFieldState;
	AcctName: PXFieldState;
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	Province: PXFieldState;
	Country: PXFieldState;
	PostalCode: PXFieldState;
	Name: PXFieldState;
	AreaCode: PXFieldState;
	Phone: PXFieldState;
	ExtensionNbr: PXFieldState;
	EMail: PXFieldState;
	SecondEmail: PXFieldState;
}

@gridConfig({ preset: GridPreset.Processing, mergeToolbarWith: "" })
export class CRAReportDetail extends PXView {
	@columnConfig({ allowUpdate: false })
	VAcctCD: PXFieldState;

	@columnConfig({ allowUpdate: false })
	VendorName: PXFieldState;

	@columnConfig({ allowUpdate: false })
	SIN: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ProgramNumber: PXFieldState;

	@columnConfig({ allowUpdate: false })
	T4ABox: PXFieldState;

	@columnConfig({ allowUpdate: false })
	OrganizationName: PXFieldState;

	@columnConfig({ allowUpdate: false })
	TotalServiceAmount: PXFieldState;

	@linkCommand("ViewDocument")
	@columnConfig({ allowUpdate: false })
	Amount: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ReportType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	TaxRegistrationID: PXFieldState;
}

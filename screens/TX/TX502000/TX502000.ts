import {
	createCollection, createSingle, PXScreen, graphInfo, PXPageLoadBehavior, PXView, PXFieldState, controlConfig,
	gridConfig, columnConfig, GridPreset, PXFieldOptions, linkCommand, PXActionState,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.TX.ReportTaxReview", primaryView: "Period_Header", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class TX502000 extends PXScreen {

	ViewDocument: PXActionState;
	CheckDocument: PXActionState;

	Period_Header = createSingle(TaxPeriodFilter);
	Period_Details = createCollection(TaxReportLine);
	APDocuments = createCollection(APInvoice);

}

export class TaxPeriodFilter extends PXView {

	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionId: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowDifference: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState;
	EndDate: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class TaxReportLine extends PXView {
	LineNbr: PXFieldState;
	SortOrder: PXFieldState;
	Descr: PXFieldState;

	@linkCommand("ViewDocument")
	TaxHistory__ReportFiledAmt: PXFieldState;
	TaxReportLine__TaxReportRevisionID: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class APInvoice extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("CheckDocument")
	RefNbr: PXFieldState;
	DocDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;
	Status: PXFieldState;
}

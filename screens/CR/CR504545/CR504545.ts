import {
	PXScreen,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	createCollection,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CR.CRQuoteProcess", primaryView: "Filter" })
export class CR504545 extends PXScreen {
	Filter = createSingle(PrintQuotesFilter);
	Records = createCollection(CRQuote);
}

export class PrintQuotesFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyWorkGroup: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	AggregateEmails: PXFieldState<PXFieldOptions.CommitChanges>;
	AggregateAttachments: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintWithDeviceHub: PXFieldState<PXFieldOptions.CommitChanges>;
	DefinePrinterManually: PXFieldState<PXFieldOptions.CommitChanges>;
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfCopies: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class CRQuote extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	QuoteNbr: PXFieldState;
	OpportunityID: PXFieldState;
	IsPrimary: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;
	Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	CuryProductsAmount: PXFieldState;
	DocumentDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
}

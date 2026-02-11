import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, PXActionState, GridColumnDisplayMode, GridPreset, GridFilterBarVisibility } from "client-controls";

@graphInfo({ graphType: "PX.Objects.TX.ProcessInputSVAT", primaryView: "Filter", })
export class TX503500 extends PXScreen {

	ViewDocument: PXActionState;
	ViewBatch: PXActionState;

	Filter = createSingle(SVATTaxFilter);

	@viewInfo({ containerName: "Transactions" })
	SVATDocuments = createCollection(SVATConversionHist);

}

export class SVATTaxFilter extends PXView {

	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxAgencyID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReversalMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalTaxAmount: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Processing })
export class SVATConversionHist extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	Module: PXFieldState;
	DisplayDocType: PXFieldState;

	@linkCommand("ViewDocument")
	AdjdRefNbr: PXFieldState;

	AdjdDocDate: PXFieldState;
	Status: PXFieldState;
	TaxID: PXFieldState;
	TaxRate: PXFieldState;
	TaxableAmt: PXFieldState;
	TaxAmt: PXFieldState;
	TaxInvoiceNbr: PXFieldState;
	TaxInvoiceDate: PXFieldState;
	@columnConfig({ displayMode: GridColumnDisplayMode.Both, hideViewLink: true }) DisplayCounterPartyID: PXFieldState;
	DisplayDescription: PXFieldState;
	DisplayDocRef: PXFieldState;

	@linkCommand("ViewBatch")
	AdjBatchNbr: PXFieldState;

}

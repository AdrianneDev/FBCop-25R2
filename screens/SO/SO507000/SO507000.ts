import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.SO.SOPaymentProcess",
	primaryView: "Filter",
})
export class SO507000 extends PXScreen {
	ViewRelatedDocument: PXActionState;
	ViewDocument: PXActionState;

	@viewInfo({ containerName: "CC Processing Filter" })
	Filter = createSingle(Filter);

	@viewInfo({ containerName: "Payments" })
	Payments = createCollection(Payments);
}

export class Filter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	IncreaseBeforeCapture: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class Payments extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;
	CustomerID_BAccountR_acctName: PXFieldState;
	CuryIncreasedAuthorizedAmount: PXFieldState;
	CuryIncreasedAppliedAmount: PXFieldState;

	FundHoldExpDate: PXFieldState;
	Status: PXFieldState;
	RelatedTranProcessingStatus: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProcessingCenterID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;

	RelatedDocument: PXFieldState;

	@linkCommand("ViewRelatedDocument")
	RelatedDocumentNumber: PXFieldState;

	RelatedDocumentStatus: PXFieldState;
	CuryRelatedDocumentAppliedAmount: PXFieldState;

	@columnConfig({ hideViewLink: true })
	relatedDocumentCreditTerms: PXFieldState;

	ErrorDescription: PXFieldState;
}

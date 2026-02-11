import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, CurrencyInfo, PXFieldOptions,
	controlConfig, linkCommand, columnConfig, PXActionState, GridPreset, GridColumnDisplayMode,
	handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection, headerDescription,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.JournalWithSubEntry", primaryView: "BatchModule", showUDFIndicator: true, showActivitiesIndicator: true, bpEventsIndicator: true })
export class GL304000 extends PXScreen {

	BatchModule = createSingle(GLDocBatch);
	GLTranModuleBatNbr = createCollection(GLTranDoc);
	APPayments = createCollection(GLTranDocAP);
	ARPayments = createCollection(GLTranDocAR);
	APAdjustments = createCollection(APAdjust);
	ARAdjustments = createCollection(ARAdjust);
	GLTransactions = createCollection(GLTran);
	CurrentDocTaxes = createCollection(GLTax);
	_GLDocBatch_CurrencyInfo_ = createSingle(CurrencyInfo);

	@handleEvent(CustomEventType.RowSelected, { view: "GLTranModuleBatNbr" })
	onGLTranDocSelected(args: RowSelectedHandlerArgs<PXViewCollection<GLTranDoc>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (model.ViewDocument) model.ViewDocument.enabled = !!activeRow;
		if (model.ShowTaxes) model.ShowTaxes.enabled = !!activeRow;
	}
}

export class GLDocBatch extends PXView {

	BatchNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	DateEntered: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerID: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState;
	CuryInfoID: PXFieldState;

	@headerDescription
	@controlConfig({ rows: 2 })
	Description: PXFieldState<PXFieldOptions.Multiline>;

	CuryDebitTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryCreditTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryControlTotal: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true, allowSort: false })
export class GLTranDoc extends PXView {

	ViewDocument: PXActionState;
	ShowTaxes: PXActionState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TranCode: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DebitAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	DebitSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CreditAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CreditSubID: PXFieldState;


	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTranTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ShowTaxes")
	CuryTaxAmt: PXFieldState;

	Split: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Text })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;

	DueDate: PXFieldState;
	DiscDate: PXFieldState;
	CuryDiscAmt: PXFieldState;

	LineNbr: PXFieldState<PXFieldOptions.Hidden>;

	CuryInclTaxAmt: PXFieldState;
	CuryDocTotal: PXFieldState;
	DocCreated: PXFieldState;
	Released: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoRepaint: ["APAdjustments"],
	adjustPageSize: true
})
export class GLTranDocAP extends PXView {

	@columnConfig({ hideViewLink: true })
	TranCode: PXFieldState;

	RefNbr: PXFieldState;
	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DebitAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DebitSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CreditAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CreditSubID: PXFieldState;

	ExtRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryApplAmt: PXFieldState;
	curyUnappliedBal: PXFieldState;
	CuryTranAmt: PXFieldState;
	TranDesc: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, pageSize: 200 })
export class APAdjust extends PXView {

	AdjdDocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorConfig: {
			parameters: (screen: GL304000) => ({ "aAdjdDocType": screen.APAdjustments.activeRow.AdjdDocType.value })
		}
	})
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AdjdLineNbr: PXFieldState;

	CuryAdjgAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgWhTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjdDocDate: PXFieldState;
	APInvoice__DueDate: PXFieldState;
	APInvoice__DiscDate: PXFieldState;
	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;
	CuryWhTaxBal: PXFieldState;
	APInvoice__DocDesc: PXFieldState;
	AdjdCuryID: PXFieldState;
	AdjdFinPeriodID: PXFieldState;
	APInvoice__InvoiceNbr: PXFieldState;
	VendorID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoRepaint: ["ARAdjustments"],
	adjustPageSize: true
})
export class GLTranDocAR extends PXView {

	@columnConfig({ hideViewLink: true })
	TranCode: PXFieldState;

	RefNbr: PXFieldState;
	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DebitAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DebitSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CreditAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CreditSubID: PXFieldState;
	ExtRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryApplAmt: PXFieldState;
	curyUnappliedBal: PXFieldState;
	CuryTranAmt: PXFieldState;
	TranDesc: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, pageSize: 200 })
export class ARAdjust extends PXView {

	AdjdDocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorConfig: {
			parameters: (screen: GL304000) => ({ "aAdjdDocType": screen.ARAdjustments.activeRow.AdjdDocType.value })
		}
	})
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AdjdLineNbr: PXFieldState;

	CuryAdjgAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgWOAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WriteOffReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	AdjdDocDate: PXFieldState;
	ARInvoice__DueDate: PXFieldState;
	ARInvoice__DiscDate: PXFieldState;
	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;
	CuryWOBal: PXFieldState;
	ARInvoice__DocDesc: PXFieldState;
	AdjdCuryID: PXFieldState;
	AdjdFinPeriodID: PXFieldState;
	ARInvoice__InvoiceNbr: PXFieldState;
	CustomerID: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class GLTran extends PXView {
	RefNbr: PXFieldState;
	Module: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BatchNbr: PXFieldState;

	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	Qty: PXFieldState;
	CuryID: PXFieldState;
	CuryDebitAmt: PXFieldState;
	CuryCreditAmt: PXFieldState;
	TranDesc: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class GLTax extends PXView {
	TaxID: PXFieldState;
	CuryTaxableAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRate: PXFieldState;
	CuryTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState;
}

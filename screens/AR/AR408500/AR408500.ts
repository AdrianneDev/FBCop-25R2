import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, columnConfig, PXFieldOptions, linkCommand, gridConfig, GridPreset,
	handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARDunningLetterByDocumentEnq", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR408500 extends PXScreen {
	ViewDocument: PXActionState;

	Filter = createSingle(DLByDocumentFilter);
	EnqResults = createCollection(ARDunningLetterDetail);

	@handleEvent(CustomEventType.RowSelected, { view: "EnqResults" })
	onEnqResultsChanged(args: RowSelectedHandlerArgs<PXViewCollection<ARDunningLetterDetail>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (model.ViewLetter) model.ViewLetter.enabled = !!activeRow;
	}
}

export class DLByDocumentFilter extends PXView  {
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	LevelFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	LevelTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Inquiry})
export class ARDunningLetterDetail extends PXView  {
	ViewLetter: PXActionState;

	@columnConfig({ hideViewLink: true })
	ARInvoice__CustomerID: PXFieldState;

	ARInvoice__DocType: PXFieldState;

	@linkCommand("ViewDocument")
	ARInvoice__RefNbr: PXFieldState;

	ARInvoice__DocBal: PXFieldState;
	ARInvoice__DueDate: PXFieldState;
	DunningLetterLevel: PXFieldState;
	ARDunningLetter__Status: PXFieldState;
	ARDunningLetter__DunningLetterDate: PXFieldState;
}

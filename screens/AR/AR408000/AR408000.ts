import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, gridConfig, columnConfig,
	PXFieldOptions, GridColumnDisplayMode,
	GridPreset, GridNoteFilesShowMode,
	handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection,
	TextAlign
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARDunningLetterByCustomerEnq", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR408000 extends PXScreen {
	Filter = createSingle(DLByCustomerFilter);
	EnqResults = createCollection(ARDunningLetter);

	@handleEvent(CustomEventType.RowSelected, { view: "EnqResults" })
	onEnqResultsChanged(args: RowSelectedHandlerArgs<PXViewCollection<ARDunningLetter>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (model.ViewDocument) model.ViewDocument.enabled = !!activeRow;
	}
}

export class DLByCustomerFilter extends PXView  {
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class ARDunningLetter extends PXView  {
	ViewDocument: PXActionState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Text })
	BAccountID: PXFieldState;

	Customer__AcctName: PXFieldState;
	DunningLetterLevel: PXFieldState;
	Status: PXFieldState;
	ARDunningLetterDetail__OverdueBal: PXFieldState;
	DunningLetterDate: PXFieldState;
	DetailsCount: PXFieldState;
}

import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, columnConfig,
	GridColumnType, PXFieldOptions, GridPreset, GridColumnDisplayMode, GridFilterBarVisibility,
	handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARDunningLetterPrint", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR522000 extends PXScreen {
	@viewInfo({containerName: "Selection"})
	Filter = createSingle(PrintParameters);

	@viewInfo({containerName: "Dunning Letters"})
	Details = createCollection(DetailsResult);

	@handleEvent(CustomEventType.RowSelected, { view: "Details" })
	onDetailsChanged(args: RowSelectedHandlerArgs<PXViewCollection<DetailsResult>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (model.ViewDocument) model.ViewDocument.enabled = !!activeRow;
	}

}

export class PrintParameters extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAll: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintWithDeviceHub: PXFieldState<PXFieldOptions.CommitChanges>;
	DefinePrinterManually: PXFieldState<PXFieldOptions.CommitChanges>;
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfCopies: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	fastFilterByAllFields: false,
})
export class DetailsResult extends PXView {
	ViewDocument: PXActionState;

	@columnConfig({ allowNull: false, type: GridColumnType.CheckBox, allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ allowNull: false, hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ allowFastFilter: true, hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	CustomerID: PXFieldState;

	@columnConfig({ allowNull: false })
	DunningLetterDate: PXFieldState;

	DunningLetterLevel: PXFieldState;

	@columnConfig({ allowNull: false })
	DocBal: PXFieldState;

	@columnConfig({ allowNull: false })
	DunningFee: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false, hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({type: GridColumnType.CheckBox })
	LastLevel: PXFieldState;

	@columnConfig({ allowNull: false, type: GridColumnType.CheckBox })
	DontPrint: PXFieldState;

	@columnConfig({ allowNull: false, type: GridColumnType.CheckBox })
	Printed: PXFieldState;

	@columnConfig({ allowNull: false, type: GridColumnType.CheckBox })
	DontEmail: PXFieldState;

	@columnConfig({ allowNull: false, type: GridColumnType.CheckBox })
	Emailed: PXFieldState;
}

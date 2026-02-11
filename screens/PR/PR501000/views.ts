import { PXView, PXFieldState, PXFieldOptions, gridConfig, columnConfig, GridPreset, GridNoteFilesShowMode } from "client-controls";

export class PRDocumentProcessFilter extends PXView {
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	mergeToolbarWith: "ScreenToolbar",
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class PRPayment extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	RefNbr: PXFieldState;
	DocType: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;

	PREmployee__AcctName: PXFieldState;
	GrossAmount: PXFieldState;
	DedAmount: PXFieldState;
	TaxAmount: PXFieldState;
}

import { controlConfig, gridConfig, GridPreset, linkCommand, readOnly, PXView, PXFieldState, PXFieldOptions, columnConfig, PXShortFieldState } from "client-controls";

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
	allowStoredFilters: true,
})
export class ARDocument extends PXView {
	@columnConfig({ allowCheckAll: true, allowNull: false, allowUpdate: true, allowFilter: false }) Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@readOnly @controlConfig({ editCommand: "viewARDocument", displayMode: "id", allowEdit: true, allowFilter: false }) RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true, allowFilter: false }) ExtRefNbr: PXFieldState;
	DocType: PXFieldState;
	DocDate: PXFieldState;
	DueDate: PXFieldState;
	@linkCommand("ViewInvoice") TotalOfPayments_Text: PXFieldState;
	@columnConfig({ allowFilter: false }) CuryOrigDocAmtWithRetainageTotal: PXFieldState;
	@columnConfig({ hideViewLink: true, allowFilter: false }) DefaultCuryID: PXFieldState;
	@columnConfig({ hideViewLink: true, allowFilter: false }) CuryID: PXFieldState;
	CuryDocBal_Text: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	@columnConfig({ allowFilter: false }) CuryOrigDocAmt_Text: PXFieldState;
	@columnConfig({ allowFilter: false }) DocDesc: PXFieldState<PXFieldOptions.Multiline>;
	@columnConfig({ hideViewLink: true }) @controlConfig({ displayMode: "text", allowEdit: false }) CustomerID: PXFieldState;
	@columnConfig({ allowFilter: false }) CustomerID_Customer_acctName: PXFieldState;
	@columnConfig({ allowFilter: false }) CuryOrigDiscAmt: PXFieldState;
	@columnConfig({ allowFilter: false }) CuryOrigDiscAmt_Text: PXFieldState;
	DiscDate: PXFieldState;
	Status: PXFieldState;
	HasUnreleasedPayment: PXFieldState;
	get passedDue() {
		return this.DueDate.value != null && new Date(this.DueDate.value) <= new Date();
	}

	getClass(filter: SummaryFilterView) {
		return `sp-documents-document no-animation ${filter?.DocumentsSelected.value > 0 && this.CuryID.value.id !== filter?.CuryID.value.id ? "sp-documents-disabled" : ""}`;
	}
}

export class SummaryFilterView extends PXView {
	SelectedTotal: PXFieldState;
	SelectedTotal_Text: PXFieldState;
	DocumentsSelected: PXFieldState;
	CuryID: PXFieldState;
}

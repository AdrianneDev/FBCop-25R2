import { PXView, PXFieldState, PXFieldOptions, gridConfig, columnConfig, GridPreset, linkCommand } from "client-controls";

export class PayCheckDetailFilter extends PXView {
	DetailType: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDate: PXFieldState;
	SingleLineInvoices: PXFieldState;
	CreateZeroAmountLines: PXFieldState;
	Total: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class PayCheckDetail extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	DetailType: PXFieldState;
	DocType: PXFieldState;
	@linkCommand("ViewPayCheck")
	RefNbr: PXFieldState;
	CodeCD: PXFieldState;
	Description: PXFieldState;
	BranchCD: PXFieldState;
	VendorAcctCD: PXFieldState;
	EmployeeAcctCD: PXFieldState;
	EmployeeAcctName: PXFieldState;
	TransactionDate: PXFieldState;
	Amount: PXFieldState;
}

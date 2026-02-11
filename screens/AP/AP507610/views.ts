import { columnConfig, GridColumnDisplayMode, gridConfig, GridPreset, PXFieldOptions, PXFieldState, PXView } from "client-controls";

export class T4ASlipFilter extends PXView {
	ActionType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrganizationID: PXFieldState;
	BranchID: PXFieldState;
	Year: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAll: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintWithDeviceHub: PXFieldState<PXFieldOptions.CommitChanges>;
	DefinePrinterManually: PXFieldState<PXFieldOptions.CommitChanges>;
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfCopies: PXFieldState;
}

@gridConfig({ preset: GridPreset.Processing })
export class T4ASlip extends PXView {
	@columnConfig({ allowUpdate: true, allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({displayMode: GridColumnDisplayMode.Both, })
	VendorID: PXFieldState;
	BoxNbr: PXFieldState;
	AmtToReport: PXFieldState;
	Printed: PXFieldState;
	Emailed: PXFieldState;
}

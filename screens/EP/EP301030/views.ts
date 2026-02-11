import {
	gridConfig,
	columnConfig,
	linkCommand,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

export class Filter extends PXView {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class Claim extends PXView {
	DocDate: PXFieldState;
	@linkCommand("editDetail")
	RefNbr: PXFieldState;
	Status: PXFieldState;
	DocDesc: PXFieldState;
	CuryDocBal: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Text })
	EmployeeID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	DepartmentID: PXFieldState;
	ApproveDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
}

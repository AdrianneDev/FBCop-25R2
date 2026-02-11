import {
	columnConfig,
	GridColumnDisplayMode,
	gridConfig,
	GridPreset,
	linkCommand,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Filter extends PXView {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
})
export class ClaimDetails extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@linkCommand("editDetail")
	ClaimDetailCD: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ContractID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	ExpenseDate: PXFieldState;
	Status: PXFieldState;
	TranDesc: PXFieldState;
	ExpenseRefNbr: PXFieldState;
	CuryTranAmtWithTaxes: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	@linkCommand("viewClaim")
	RefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Text })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CreatedByID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
}

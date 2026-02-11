import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridNoteFilesShowMode
} from "client-controls";

@gridConfig({
	preset: GridPreset.Inquiry,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class AllocationAuditSource extends PXView {
	@linkCommand("ViewAllocationRule")
	@columnConfig({ width: 200 })
	PMAllocationSourceTran__AllocationID: PXFieldState;
	@columnConfig({ width: 100 })
	PMAllocationSourceTran__StepID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
	@linkCommand("ViewBatch")
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState;
	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ResourceID: PXFieldState;
	BAccountID: PXFieldState;
	LocationID: PXFieldState;
	InventoryID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	Qty: PXFieldState;
	Billable: PXFieldState;
	UseBillableQty: PXFieldState;
	BillableQty: PXFieldState;
	UnitRate: PXFieldState;
	Amount: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OffsetAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OffsetSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OffsetAccountGroupID: PXFieldState;
	Allocated: PXFieldState;
	Released: PXFieldState;
	BatchNbr: PXFieldState;
	OrigModule: PXFieldState;
	OrigTranType: PXFieldState;
	OrigRefNbr: PXFieldState;
	OrigLineNbr: PXFieldState;
	Billed: PXFieldState;
	BilledDate: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	Reverse: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EarningType: PXFieldState;
	OvertimeMultiplier: PXFieldState;
	ARRefNbr: PXFieldState;
	Skip: PXFieldState;
}

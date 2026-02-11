import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnShowHideMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Document extends PXView {
	Module: PXFieldState;
	RefNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	OrigDocType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrigDocNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	OrigNoteID: PXFieldState;
	QtyTotal: PXFieldState<PXFieldOptions.Disabled>;
	BillableQtyTotal: PXFieldState<PXFieldOptions.Disabled>;
	AmtTotal: PXFieldState<PXFieldOptions.Disabled>;
}

export class Totals extends PXView {
	QtyTotal: PXFieldState<PXFieldOptions.Disabled>;
	BillableQtyTotal: PXFieldState<PXFieldOptions.Disabled>;
	AmtTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class Transactions extends PXView {
	ViewAllocationSorce: PXActionState;
	SelectProjectRate: PXActionState;
	SelectBaseRate: PXActionState;
	CuryToggle: PXActionState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewProject")
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("ViewTask")
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ResourceID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewCustomer")
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;
	@linkCommand("ViewInventory")
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShiftID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	Billable: PXFieldState;
	BillableQty: PXFieldState<PXFieldOptions.CommitChanges>;
	TranCuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	TranCuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	TranCuryId: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseCuryRate: PXFieldState;
	ProjectCuryAmount: PXFieldState;
	ProjectCuryId: PXFieldState;
	ProjectCuryRate: PXFieldState;
	StartDate: PXFieldState<PXFieldOptions.Hidden>;
	EndDate: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OffsetAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	OffsetSubID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OffsetAccountGroupID: PXFieldState;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EarningType: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeMultiplier: PXFieldState;
	@columnConfig({ width: 150 })
	UseBillableQty: PXFieldState;
	Allocated: PXFieldState;
	Released: PXFieldState;
	ExcludedFromAllocation: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	Billed: PXFieldState<PXFieldOptions.Hidden>;
}

export class ProjectCuryInfo extends PXView {
	CuryRateTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEffDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayCuryID: PXFieldState;
	BaseCuryID: PXFieldState;
	SampleCuryRate: PXFieldState<PXFieldOptions.CommitChanges>;
	SampleRecipRate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class BaseCuryInfo extends PXView {
	CuryRateTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEffDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayCuryID: PXFieldState;
	BaseCuryID: PXFieldState;
	SampleCuryRate: PXFieldState<PXFieldOptions.CommitChanges>;
	SampleRecipRate: PXFieldState<PXFieldOptions.CommitChanges>;
}

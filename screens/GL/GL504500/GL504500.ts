import {
	PXScreen, createSingle, createCollection, graphInfo, PXPageLoadBehavior, PXView, PXFieldState,
	PXFieldOptions, linkCommand, columnConfig, PXActionState, gridConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.AllocationProcess", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class GL504500 extends PXScreen {

	ViewBatch: PXActionState;
	EditDetail: PXActionState;

	Filter = createSingle(AllocationFilter);
	Allocations = createCollection(AllocationExt);

}

export class AllocationFilter extends PXView {

	DateEntered: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Processing, allowSort: false })
export class AllocationExt extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	BranchID: PXFieldState;

	@linkCommand("EditDetail")
	GLAllocationID: PXFieldState;

	Descr: PXFieldState;
	AllocMethod: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AllocLedgerID: PXFieldState;

	SortOrder: PXFieldState;

	@linkCommand("ViewBatch")
	BatchNbr: PXFieldState;

	BatchPeriod: PXFieldState;
	ControlTotal: PXFieldState;
	Status: PXFieldState;

}

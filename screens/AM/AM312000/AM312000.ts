import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.LateAssignmentMaint", primaryView: "ProdItemSplits" })
export class AM312000 extends PXScreen {
	@viewInfo({ containerName: "Late Assignment" })
	ProdItemSplits = createSingle(AMProdItemSplitPreassign);
	@viewInfo({ containerName: "Allocated Components" })
	MatlAssigned = createCollection(AMProdMatlLotSerialAssigned);
	@viewInfo({ containerName: "Unallocated Components" })
	MatlUnassigned = createCollection(AMProdMatlLotSerialUnassigned);
}

export class AMProdItemSplitPreassign extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusID: PXFieldState;
	InventoryID: PXFieldState;
	SiteId: PXFieldState;
	Qty: PXFieldState;
	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	QtyRemaining: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
})
export class AMProdMatlLotSerialAssigned extends PXView {
	Unallocate: PXActionState;

	InventoryID: PXFieldState;
	Descr: PXFieldState;
	@columnConfig({ hideViewLink: true }) LotSerialNbr: PXFieldState;
	QtyIssued: PXFieldState;
	@columnConfig({ hideViewLink: true }) BaseUnit: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
})
export class AMProdMatlLotSerialUnassigned extends PXView {
	Allocate: PXActionState;

	InventoryID: PXFieldState;
	Descr: PXFieldState;
	@columnConfig({ hideViewLink: true }) LotSerialNbr: PXFieldState;
	QtyIssued: PXFieldState;
	@columnConfig({ hideViewLink: true }) BaseUnit: PXFieldState;
	QtyRequired: PXFieldState;
	QtyToAllocate: PXFieldState;
}


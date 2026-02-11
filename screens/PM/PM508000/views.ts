import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

export class Filter extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class Items extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowSort: false,
		width: 35,
	})
	Selected: PXFieldState;
	@linkCommand("viewInventoryItem")
	InventoryID: PXFieldState;
	@columnConfig({
		hideViewLink: true,
	})
	SiteID: PXFieldState;
	@columnConfig({
		hideViewLink: true,
	})
	LocationID: PXFieldState;
	CostLayerType: PXFieldState;
	@linkCommand("viewProject")
	ProjectID: PXFieldState;
	@columnConfig({
		hideViewLink: true,
	})
	TaskID: PXFieldState;
	QtyOnHand: PXFieldState;
	TotalCost: PXFieldState;
}

import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	GridPreset
} from "client-controls";

export abstract class InventoryLinkFilterBase {
	SelectItems: PXActionState;

	@viewInfo({ containerName: "Selected Inventory Items" })
	SelectedItems = createCollection(InventoryLinks);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class InventoryLinks extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.Disabled>;
}
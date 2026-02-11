import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	GridPreset,
} from "client-controls";

export abstract class LocationLinkFilterBase {
	SelectLocations: PXActionState;

	@viewInfo({ containerName: "Selected Locations" })
	SelectedLocations = createCollection(LocationLinks);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class LocationLinks extends PXView {
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.Disabled>;
}
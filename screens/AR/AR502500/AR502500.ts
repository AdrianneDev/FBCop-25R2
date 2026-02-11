import {
	createCollection, createSingle,
	PXScreen, PXActionState, PXView, PXFieldState,
	graphInfo, viewInfo, gridConfig, columnConfig,
	GridColumnType, PXFieldOptions, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARUpdateDiscounts", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR502500 extends PXScreen {
	@viewInfo({containerName: "Selection"})
	Filter = createSingle(ItemFilter);

	@viewInfo({containerName: "Discount Sequences"})
	Items = createCollection(SelectedItem);
}

export class ItemFilter extends PXView {
	PendingDiscountDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: ["DiscountID", "DiscountSequenceID", "Description"]
})
export class SelectedItem extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	DiscountID: PXFieldState;
	DiscountSequenceID: PXFieldState;
	Description: PXFieldState;
	DiscountedFor: PXFieldState;
	BreakBy: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
}

import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset,
} from "client-controls";

export abstract class ReleatedItemsTabBase {
	@viewInfo({ containerName: "Related Items" })
	RelatedItems = createCollection(RelatedItems);
}

@gridConfig({
	preset: GridPreset.Details,
})
export class RelatedItems extends PXView {
	Relation: PXFieldState<PXFieldOptions.CommitChanges>;
	Rank: PXFieldState<PXFieldOptions.CommitChanges>;
	Tag: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewRelatedItem")
	RelatedInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	Desc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	Qty: PXFieldState;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Interchangeable: PXFieldState;
	Required: PXFieldState<PXFieldOptions.CommitChanges>;
	MLScorePercent: PXFieldState;
	AcceptedMLSuggestion: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
}

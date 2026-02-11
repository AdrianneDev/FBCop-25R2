import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

export abstract class AddRelatedItemsBase {
	@viewInfo({ containerName: "Add Related Items" })
	RelatedItemsFilter = createSingle(RelatedItemsFilter);

	@viewInfo({ containerName: "All Related Items" })
	AllRelatedItems = createCollection(RelatedItems);

	@viewInfo({ containerName: "Substitute Items" })
	SubstituteItems = createCollection(RelatedItems);

	@viewInfo({ containerName: "Up-Sell Items" })
	UpSellItems = createCollection(RelatedItems);

	@viewInfo({ containerName: "Add Related Items" })
	CrossSellItems = createCollection(RelatedItems);

	@viewInfo({ containerName: "Other Related Items" })
	OtherRelatedItems = createCollection(RelatedItems);
}

export class RelatedItemsFilter extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState;
	CuryExtPrice: PXFieldState;
	AvailableQty: PXFieldState;
	SiteID: PXFieldState;
	KeepOriginalPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	OnlyAvailableItems: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowForAllWarehouses: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowSubstituteItems: PXFieldState;
	ShowUpSellItems: PXFieldState;
	ShowCrossSellItems: PXFieldState;
	ShowOtherRelatedItems: PXFieldState;
	ShowAllRelatedItems: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowInsert: false,
	allowDelete: false,
	showNoteFiles: GridNoteFilesShowMode.Force
})
export class RelatedItems extends PXView {
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	QtySelected: PXFieldState;
	Rank: PXFieldState;
	Relation: PXFieldState;
	Tag: PXFieldState;

	@linkCommand("ViewRelatedItem")
	RelatedInventoryID: PXFieldState;

	SubItemID: PXFieldState;
	SubItemCD: PXFieldState<PXFieldOptions.Hidden>;
	Desc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	CuryUnitPrice: PXFieldState;
	CuryExtPrice: PXFieldState;
	PriceDiff: PXFieldState;
	AvailableQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	SiteCD: PXFieldState<PXFieldOptions.Hidden>;
	Interchangeable: PXFieldState;
	Required: PXFieldState;
}
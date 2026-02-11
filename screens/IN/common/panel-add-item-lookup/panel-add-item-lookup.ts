import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	controlConfig,
} from "client-controls";

// corresponds to the PX.Objects.Extensions.AddItemLookup.AddItemLookupExt C# extensions
export abstract class AddItemLookupBase {
	AddSelectedItems: PXActionState;
	AddAllItems: PXActionState;

	@viewInfo({ containerName: "Add Item Filter" })
	ItemFilter = createSingle(AddItemLookupFilter);

	@viewInfo({ containerName: "Add Item Parameters" })
	addItemParameters = createSingle(AddItemLookupParameters);

	@viewInfo({ containerName: "Add Item Results" })
	ItemInfo = createCollection(AddItemLookupResults);
}

export class AddItemLookupFilter extends PXView {
	Inventory: PXFieldState;
	ItemClass: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;

	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyWorkGroup: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
}

export class AddItemLookupParameters extends PXView {
	CuryID: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class AddItemLookupResults extends PXView {
	@columnConfig({ allowNull: false, allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	InventoryCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ItemClassID: PXFieldState;
	ItemClassDescription: PXFieldState;

	Descr: PXFieldState;

	PriceClassID: PXFieldState;
	PriceClassDescription: PXFieldState;
}

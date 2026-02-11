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
	GridColumnShowHideMode,
} from "client-controls";

// corresponds to the PX.Objects.Extensions.AddItemLookup.SiteStatusLookupExt C# extensions
export abstract class SiteStatusLookupBase {
	AddSelectedItems: PXActionState;

	@viewInfo({ containerName: "Inventory" })
	ItemFilter = createSingle(SiteStatusLookupFilter);

	@viewInfo({ containerName: "Inventory Lookup" })
	ItemInfo = createCollection(SiteStatusLookupResults);
}

export class SiteStatusLookupFilter extends PXView {
	Inventory: PXFieldState<PXFieldOptions.CommitChanges>;
	BarCode: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClass: PXFieldState<PXFieldOptions.CommitChanges>;

	SubItem: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	OnlyAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class SiteStatusLookupResults extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	QtySelected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ItemClassID: PXFieldState;
	ItemClassDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PriceClassID: PXFieldState;
	PriceClassDescription: PXFieldState;

	@columnConfig({ hideViewLink: true, allowFastFilter: true })
	InventoryCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	Descr: PXFieldState;

	// backward compatibility fields
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	SiteCD: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	InventoryID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	SubItemCD: PXFieldState<PXFieldOptions.Hidden>;
}

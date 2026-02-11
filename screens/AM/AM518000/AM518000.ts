import {
	PXScreen,
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
	viewInfo
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.GenerateCostRollupProcess", primaryView: "Filter" })
export class AM518000 extends PXScreen {
	Filter = createSingle(GenerateCostRollupSettings);
	SelectedBOMs = createCollection(AMBomItem);
}

export class GenerateCostRollupSettings extends PXView {
	SnglMlti: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteId: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMMaterialID: PXFieldState<PXFieldOptions.CommitChanges>;
	EffectiveDate: PXFieldState;
	IncMatScrp: PXFieldState;
	IncFixed: PXFieldState;
	UsePending: PXFieldState;
	IgnoreMinMaxLotSizeValues: PXFieldState;
	IgnoreReplenishmentSettings: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class AMBomItem extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	@columnConfig({ hideViewLink: true }) BOMID: PXFieldState;
	RevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	InventoryItem__InventoryCD: PXFieldState;
	InventoryItem__ReplenishmentSource: PXFieldState;
	InventoryItem__ItemType: PXFieldState;
}

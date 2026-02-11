import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	PXPageLoadBehavior,
	localizable,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INIntegrityCheck",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class IN505000 extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(INRecalculateInventoryFilter);

	@viewInfo({ containerName: "Details" })
	INItemList = createCollection(InventoryItemCommon);
}

export class INRecalculateInventoryFilter extends PXView {
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	RebuildHistory: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplanBackorders: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowOnlyAllocatedItems: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class InventoryItemCommon extends PXView {
	@localizable
	static NullToZero = "0.0";

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ allowUpdate: false })
	InventoryCD: PXFieldState;

	Descr: PXFieldState;

	@columnConfig({ allowUpdate: false, nullText: InventoryItemCommon.NullToZero })
	INSiteStatusSummary__QtyOnHand: PXFieldState;

	@columnConfig({ allowUpdate: false, nullText: InventoryItemCommon.NullToZero })
	INSiteStatusSummary__QtyAvail: PXFieldState;

	@columnConfig({ allowUpdate: false, nullText: InventoryItemCommon.NullToZero })
	INSiteStatusSummary__QtyNotAvail: PXFieldState;
}

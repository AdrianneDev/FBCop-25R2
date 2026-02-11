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
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.RelatedItems.INCrossSellSuggestionProcess",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class IN503500 extends PXScreen {
	@viewInfo({ containerName: "Filter" })
	Filter = createSingle(CrossSellSuggestionProcessFilter);

	@viewInfo({ containerName: "Details" })
	MLCrossSellSuggestions = createCollection(CrossSellSuggestionProcessResult);
}

export class CrossSellSuggestionProcessFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	OriginalItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	OriginalInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CrossSellInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class CrossSellSuggestionProcessResult extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	OriginalInventoryID: PXFieldState;
	OriginalDescr: PXFieldState;
	CrossSellInventoryID: PXFieldState;
	CrossSellDescr: PXFieldState;
	Rank: PXFieldState;
	Tag: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	Qty: PXFieldState;
	EffectiveDate: PXFieldState;
	ExpirationDate: PXFieldState;
	MLScorePercent: PXFieldState;
	OriginalItemClassID: PXFieldState;
	OriginalItemClassDescr: PXFieldState;
	Required: PXFieldState;
	IsActive: PXFieldState;
}

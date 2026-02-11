import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, PXActionState, PXFieldOptions, columnConfig,
	gridConfig, GridPreset, linkCommand, GridColumnShowHideMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.SplitProcess", primaryView: "Filter", })
export class FA506000 extends PXScreen {

	@viewInfo({ containerName: "Options" })
	Filter = createSingle(SplitFilter);

	@viewInfo({ containerName: "Split Assets" })
	Splits = createCollection(FixedAsset);
}

export class SplitFilter extends PXView {

	AssetID: PXFieldState<PXFieldOptions.CommitChanges>;
	Cost: PXFieldState<PXFieldOptions.Disabled>;
	Qty: PXFieldState<PXFieldOptions.Disabled>;
	SplitDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SplitPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeprBeforeSplit: PXFieldState<PXFieldOptions.CommitChanges>;

	// Actions
	ViewAsset: PXActionState;

}

@gridConfig({
	preset: GridPreset.Processing,
	mergeToolbarWith: "",
	allowInsert: true, allowDelete: true,
	actionsConfig: { insert: { hidden: false }, delete: { hidden: false } },
})
export class FixedAsset extends PXView {

	@columnConfig({ allowCheckAll: true, allowShowHide: GridColumnShowHideMode.False })
	Selected: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;

	Cost: PXFieldState<PXFieldOptions.CommitChanges>;
	SplittedQty: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 200 })
	Ratio: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewAsset")
	SplittedAssetCD: PXFieldState;

}

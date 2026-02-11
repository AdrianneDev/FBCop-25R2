import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXPageLoadBehavior, PXView, PXFieldState, gridConfig,
	PXFieldOptions, columnConfig, TextAlign, GridPreset, controlConfig
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.FixedAssetCostEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class FA403000 extends PXScreen {

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(FixedAssetFilter);

	@viewInfo({ containerName: "Accounts/Subs" })
	Amts = createCollection(Amounts);

}

export class FixedAssetFilter extends PXView {

	@controlConfig({ allowEdit: true })
	AssetID: PXFieldState<PXFieldOptions.CommitChanges>;

	PeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	BookID: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Primary })
export class Amounts extends PXView {

	@columnConfig({ hideViewLink: true })
	BookID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	AcctDescr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	SubDescr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	ItdAmt: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	YtdAmt: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	PtdAmt: PXFieldState;

}

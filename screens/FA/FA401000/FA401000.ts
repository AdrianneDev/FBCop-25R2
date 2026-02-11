import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXPageLoadBehavior, PXView, PXFieldState, gridConfig, PXFieldOptions,
	linkCommand, columnConfig, PXActionState, TextAlign, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.AccBalanceByAssetInq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class FA401000 extends PXScreen {

	ViewAsset: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(AccBalanceByAssetFilter);

	@viewInfo({ containerName: "Assets" })
	Amts = createCollection(Amounts);
}

export class AccBalanceByAssetFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	BookID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	Balance: PXFieldState;

}

@gridConfig({ preset: GridPreset.Inquiry })
export class Amounts extends PXView {

	@linkCommand("ViewAsset")
	AssetID: PXFieldState;

	Description: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ClassID: PXFieldState;

	DepreciateFromDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	Department: PXFieldState;
	ItdAmt: PXFieldState;
	YtdAmt: PXFieldState;
	PtdAmt: PXFieldState;

}

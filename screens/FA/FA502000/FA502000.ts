import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, gridConfig, GridPreset, columnConfig, linkCommand, PXActionState, PXFieldOptions
} from "client-controls";

@gridConfig({ preset: GridPreset.Processing })
export class FABookBalance extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FixedAsset__BranchID: PXFieldState;

	@linkCommand("ViewAsset")
	AssetID: PXFieldState;

	FixedAsset__Description: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	ClassID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FixedAsset__ParentAssetID: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	BookID: PXFieldState;

	CurrDeprPeriod: PXFieldState;

	YtdDeprBase: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FixedAsset__BaseCuryID: PXFieldState;

	FADetails__ReceiptDate: PXFieldState;

	FixedAsset__UsefulLife: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FixedAsset__FAAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FixedAsset__FASubID: PXFieldState;

	FADetails__TagNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Account__AccountClassID: PXFieldState;
}

export class Filter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	BookID: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentAssetID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@graphInfo({ graphType: "PX.Objects.FA.CalcDeprProcess", primaryView: "Filter" })
export class FA502000 extends PXScreen {

	ViewBook: PXActionState;
	ViewAsset: PXActionState;
	ViewClass: PXActionState;

	Filter = createSingle(Filter);

	Balances = createCollection(FABookBalance);
}

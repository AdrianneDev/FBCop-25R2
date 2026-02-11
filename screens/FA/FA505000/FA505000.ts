import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, GridPreset, PXFieldOptions, columnConfig, GridColumnType, TextAlign } from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.DisposalProcess", primaryView: "Filter", })
export class FA505000 extends PXScreen {

	@viewInfo({ containerName: "Options" })
	Filter = createSingle(ProcessAssetFilter);

	@viewInfo({ containerName: "Assets to Dispose" })
	Assets = createCollection(FixedAsset);

}

export class ProcessAssetFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentAssetID: PXFieldState<PXFieldOptions.CommitChanges>;
	BookID: PXFieldState<PXFieldOptions.CommitChanges>;
	DisposalDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DisposalPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	DisposalMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	DisposalAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DisposalAmtMode: PXFieldState<PXFieldOptions.CommitChanges>;
	DisposalAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DisposalSubID: PXFieldState;
	ActionBeforeDisposal: PXFieldState<PXFieldOptions.CommitChanges>;
	Reason: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Processing })
export class FixedAsset extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ClassID: PXFieldState;

	AssetCD: PXFieldState;
	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ParentAssetID: PXFieldState;

	FADetails__CurrentCost: PXFieldState;
	DisposalAmt: PXFieldState;
	FADetails__ReceiptDate: PXFieldState;
	UsefulLife: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FAAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FASubID: PXFieldState;

	FADetails__TagNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Account__AccountClassID: PXFieldState;

}

import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, columnConfig, gridConfig, GridPreset, headerDescription, HeaderDescription, controlConfig
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.GLBranchAcctMapMaint",
	primaryView: "Branches"
})
export class GL101010 extends PXScreen {

	Branches = createSingle(Branch);
	MapFrom = createCollection(BranchAcctMapFrom);
	MapTo = createCollection(BranchAcctMapTo);

}

export class Branch extends PXView {

	@headerDescription(HeaderDescription.ShowKey)
	@controlConfig({ allowEdit: true, displayMode: "both" })
	BranchCD: PXFieldState<PXFieldOptions.CommitChanges>;

	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription(HeaderDescription.ShowDescription)
	AcctName: PXFieldState<PXFieldOptions.Hidden>;

}

@gridConfig({
	preset: GridPreset.Details
})
export class BranchAcctMapFrom extends PXView {

	@columnConfig({ hideViewLink: true })
	ToBranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FromAccountCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ToAccountCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	MapAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	MapSubID: PXFieldState;

}

@gridConfig({
	preset: GridPreset.Details
})
export class BranchAcctMapTo extends PXView {

	@columnConfig({ hideViewLink: true })
	FromBranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FromAccountCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ToAccountCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	MapAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	MapSubID: PXFieldState;

}

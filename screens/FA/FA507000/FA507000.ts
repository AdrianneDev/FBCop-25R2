import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, GridPreset, PXFieldOptions, columnConfig
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.TransferProcess", primaryView: "Filter", })
export class FA507000 extends PXScreen {

	@viewInfo({ containerName: "Options" })
	Filter = createSingle(TransferFilter);

	@viewInfo({ containerName: "Fixed Assets" })
	Assets = createCollection(FixedAsset);

}

export class TransferFilter extends PXView {

	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	TransferDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	Reason: PXFieldState;
	BranchFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DepartmentFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchTo: PXFieldState<PXFieldOptions.CommitChanges>;
	DepartmentTo: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassTo: PXFieldState<PXFieldOptions.CommitChanges>;

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
	ParentAssetID: PXFieldState;
	FADetailsTransfer__CurrentCost: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseCuryID: PXFieldState;

	FADetailsTransfer__ReceiptDate: PXFieldState;
	UsefulLife: PXFieldState;
	FADetailsTransfer__TransferPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FAAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FASubID: PXFieldState;

	FADetailsTransfer__TagNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Account__AccountClassID: PXFieldState;

}

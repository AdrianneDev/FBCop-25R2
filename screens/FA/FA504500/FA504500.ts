import {
	PXActionState, createCollection, createSingle, PXScreen, graphInfo,
	viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions,
	columnConfig, GridPreset, GridNoteFilesShowMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.AssetGLTransactions", primaryView: "Filter", })
export class FA504500 extends PXScreen {

	Schedule: PXActionState;

	@viewInfo({ containerName: "Options" })
	Filter = createSingle(GLTranFilter);

	@viewInfo({ containerName: "GL Transactions" })
	GLTransactions = createCollection(FAAccrualTran);

	@viewInfo({ containerName: "Transaction Split Details" })
	FATransactions = createCollection(FATran);
}

export class GLTranFilter extends PXView {

	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowReconciled: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Department: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowDelete: false,
	allowInsert: false,
	autoRepaint: ["FATransactions"],
})
export class FAAccrualTran extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	Department: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Reconciled: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ format: ">AAAAAAAAAA", hideViewLink: true })
	GLTranBranchID: PXFieldState;

	@columnConfig({ format: ">AAAAAAAAAAAA" })
	GLTranInventoryID: PXFieldState;

	GLTranUOM: PXFieldState;

	@columnConfig({ allowFilter: false })
	SelectedQty: PXFieldState;

	@columnConfig({ allowFilter: false })
	SelectedAmt: PXFieldState;

	@columnConfig({ allowFilter: false })
	OpenQty: PXFieldState;

	@columnConfig({ allowFilter: false })
	OpenAmt: PXFieldState;

	GLTranQty: PXFieldState;
	UnitCost: PXFieldState;
	GLTranAmt: PXFieldState;
	GLTranDate: PXFieldState;
	GLTranModule: PXFieldState;
	GLTranBatchNbr: PXFieldState;
	GLTranRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	GLTranReferenceID: PXFieldState;

	GLTranDesc: PXFieldState;

}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoInsert: true,
	pageSize: 200,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class FATran extends PXView {

	NewAsset: PXFieldState<PXFieldOptions.CommitChanges>;

	AssetCD: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	Department: PXFieldState;
	Component: PXFieldState<PXFieldOptions.CommitChanges>;

	TargetAssetID: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState;
	TranAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	ReceiptDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DeprFromDate: PXFieldState;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;

	TranType: PXFieldState;
	TranDesc: PXFieldState;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;

}

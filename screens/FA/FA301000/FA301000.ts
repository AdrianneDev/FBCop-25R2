import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, TextAlign, PXActionState, GridPreset, headerDescription, HeaderDescription } from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FA.TransactionEntry",
	primaryView: "Document",
	showUDFIndicator: true,
	showActivitiesIndicator: true,
	bpEventsIndicator: true
})
export class FA301000 extends PXScreen {

	ViewBatch: PXActionState;
	ViewAsset: PXActionState;
	ViewBook: PXActionState;

	@viewInfo({ containerName: "Transaction Summary" })
	Document = createSingle(FARegister);

	@viewInfo({ containerName: "Transaction Details" })
	Trans = createCollection(FATran);
}

export class FARegister extends PXView {

	@headerDescription(HeaderDescription.ShowKey)
	RefNbr: PXFieldState;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	@headerDescription(HeaderDescription.ShowDescription)
	Origin: PXFieldState<PXFieldOptions.Disabled>;
	Reason: PXFieldState<PXFieldOptions.Disabled>;
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;
	TranAmt: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ initNewRow: true, preset: GridPreset.Details })
export class FATran extends PXView {

	AssetID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	AssetID_FixedAsset_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BookID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	TranType: PXFieldState;

	@columnConfig({ format: ">######", hideViewLink: true })
	DebitAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	DebitAccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DebitSubID: PXFieldState;

	DebitSubID_Sub_description: PXFieldState;

	@columnConfig({ format: ">######", hideViewLink: true })
	CreditAccountID: PXFieldState;

	CreditAccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CreditSubID: PXFieldState;

	CreditSubID_Sub_description: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Right })
	TranAmt: PXFieldState;

	BatchNbr: PXFieldState;
	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SrcBranchID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	MethodDesc: PXFieldState;

}

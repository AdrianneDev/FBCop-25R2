import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions,
	linkCommand, controlConfig, columnConfig, TextAlign, PXActionState, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.FACostDetailsInq", primaryView: "Filter", })
export class FA404000 extends PXScreen {

	ViewDocument: PXActionState;
	ViewBatch: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(AccountFilter);

	@viewInfo({ containerName: "Transactions" })
	Transactions = createCollection(FATran);
}

export class AccountFilter extends PXView {

	@controlConfig({ allowEdit: true })
	AssetID: PXFieldState<PXFieldOptions.CommitChanges>;

	StartPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	EndPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	BookID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({
	preset: GridPreset.Inquiry,
	fastFilterByAllFields: false
})
export class FATran extends PXView {

	@columnConfig({ hideViewLink: true })
	BookID: PXFieldState;

	@linkCommand("ViewDocument")
	@columnConfig({ allowFastFilter: true })
	RefNbr: PXFieldState;

	@linkCommand("ViewBatch")
	BatchNbr: PXFieldState;

	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	TranType: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	TranDesc: PXFieldState;

	DebitAmt: PXFieldState;
	CreditAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

}

import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, PXPageLoadBehavior, PXView,
	PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, RowCssHandlerArgs, handleEvent, CustomEventType, GridPreset,
	RowSelectedHandlerArgs, PXViewCollection
} from "client-controls";

@graphInfo({
	graphType: "PX.GLAnomalyDetection.AnomalyTransactionEnq", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class GL406000 extends PXScreen {

	ViewSubspace: PXActionState;
	ViewBatch: PXActionState;
	ViewDocument: PXActionState;
	ViewReclassBatch: PXActionState;
	ViewPMTran: PXActionState;

	Filter = createSingle(AnomalyTransactionFilter);
	Transactions = createCollection(GLTran);
	Subspaces = createCollection(MLSubspaceScore);

	@handleEvent(CustomEventType.GetRowCss, { view: "Transactions" })
	getTransactionsRowCss(args: RowCssHandlerArgs)	{
		if (args?.selector?.row?.MLScoreColor.value === "light")		{
			return "light-highlight";
		}
		if (args?.selector?.row?.MLScoreColor.value === "regular")		{
			return "regular-highlight bad";
		}
		if (args?.selector?.row?.MLScoreColor.value === "dark")		{
			return "dark-highlight";
		}

		return undefined;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Transactions" })
	onTransactionsChanged(args: RowSelectedHandlerArgs<PXViewCollection<GLTran>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (model.Reclassify) model.Reclassify.enabled = !!activeRow;
		if (model.MarkAsCorrect) model.MarkAsCorrect.enabled = !!activeRow;
		if (model.UnMarkCorrected) model.UnMarkCorrected.enabled = !!activeRow;
	}
}

export class AnomalyTransactionFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScoreTreshold: PXFieldState<PXFieldOptions.CommitChanges>;
	AmountTreshold: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	fastFilterByAllFields: false
})
export class GLTran extends PXView {

	Reclassify: PXActionState;
	MarkAsCorrect: PXActionState;
	UnMarkCorrected: PXActionState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, allowCheckAll: true })
	Selected: PXFieldState;

	MLStatusUI: PXFieldState;

	@linkCommand("ViewSubspace")
	MLScore: PXFieldState;

	Module: PXFieldState;

	@linkCommand("ViewBatch")
	BatchNbr: PXFieldState;

	TranDate: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	TranDesc: PXFieldState;

	@linkCommand("ViewDocument")
	@columnConfig({ allowFastFilter: true })
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	DebitAmt: PXFieldState;
	CreditAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReferenceID: PXFieldState;

	LineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TranPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@linkCommand("ViewReclassBatch")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ReclassBatchNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	IncludedInReclassHistory: PXFieldState<PXFieldOptions.Hidden>;

	@linkCommand("ViewPMTran")
	@columnConfig({ hideViewLink: true })
	PMTranID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	MLScoreColor: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	statusField: "TextForSubspacesGrid",
	allowUpdate: false
})
export class MLSubspaceScore extends PXView {

	MLScore: PXFieldState;
	SubspaceDescr: PXFieldState;
	AnomalyType: PXFieldState;
	Reason: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	TextForSubspacesGrid: PXFieldState<PXFieldOptions.Hidden>;
}

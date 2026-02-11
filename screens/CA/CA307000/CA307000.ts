import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, PXActionState, headerDescription, columnConfig, GridPreset, actionConfig, linkCommand, handleEvent, CustomEventType, RowCssHandlerArgs } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CCBatchMaint", primaryView: "BatchView", showActivitiesIndicator: true })
export class CA307000 extends PXScreen {

	@viewInfo({ containerName: "Settlement Batches" })
	BatchView = createSingle(CCBatch);

	@viewInfo({ containerName: "All Transactions" })
	Transactions = createCollection(CCBatchTransaction);

	@viewInfo({ containerName: "Missing Transactions" })
	MissingTransactions = createCollection(CCBatchTransaction2); //duplicated class causes by separated grids

	@viewInfo({ containerName: "Transactions Excluded from Deposit" })
	ExcludedFromDepositTransactions = createCollection(CCBatchTransaction3); //duplicated class causes by separated grids

	@viewInfo({ containerName: "Card Type Summary" })
	CardTypeSummary = createCollection(CCBatchStatistics);

	@handleEvent(CustomEventType.GetRowCss, { view: "Transactions" })
	getTransactionsRowCss(args: RowCssHandlerArgs)	{
		if (args?.selector?.row?.SettlementStatus?.value === "RSS")		{
			return "bad";
		}
		return undefined;
	}

}

export class CCBatch extends PXView {
	@headerDescription
	BatchID: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	@headerDescription
	ProcessingCenterID: PXFieldState<PXFieldOptions.Disabled>;
	ExtBatchID: PXFieldState<PXFieldOptions.Disabled>;
	@headerDescription
	SettlementTime: PXFieldState<PXFieldOptions.Disabled>;
	SettlementState: PXFieldState<PXFieldOptions.Disabled>;
	DepositNbr: PXFieldState<PXFieldOptions.Disabled>;
	SettledAmount: PXFieldState<PXFieldOptions.Disabled>;
	SettledCount: PXFieldState<PXFieldOptions.Disabled>;
	RefundAmount: PXFieldState<PXFieldOptions.Disabled>;
	RefundCount: PXFieldState<PXFieldOptions.Disabled>;
	RejectedAmount: PXFieldState<PXFieldOptions.Disabled>;
	RejectedCount: PXFieldState<PXFieldOptions.Disabled>;
	VoidCount: PXFieldState<PXFieldOptions.Disabled>;
	DeclineCount: PXFieldState<PXFieldOptions.Disabled>;
	TransactionCount: PXFieldState<PXFieldOptions.Disabled>;
	ImportedTransactionCount: PXFieldState<PXFieldOptions.Disabled>;
	ProcessedCount: PXFieldState<PXFieldOptions.Disabled>;
	MissingCount: PXFieldState<PXFieldOptions.Disabled>;
	HiddenCount: PXFieldState<PXFieldOptions.Disabled>;
	ExcludedCount: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class CCBatchTransaction extends PXView {

	Unhide: PXActionState;
	@columnConfig({ allowCheckAll: true })
	SelectedToUnhide: PXFieldState;
	PCTranNumber: PXFieldState;
	SettlementStatus: PXFieldState;
	ProcessingStatus: PXFieldState;
	Amount: PXFieldState;
	DocType: PXFieldState;

	@linkCommand("viewPaymentAll")
	RefNbr: PXFieldState;

	ARPayment__Status: PXFieldState;
	AccountNumber: PXFieldState;
	InvoiceNbr: PXFieldState;
	SubmitTime: PXFieldState;
	DisplayCardType: PXFieldState;
	FixedFee: PXFieldState;
	PercentageFee: PXFieldState;
	TotalFee: PXFieldState;
	FeeType: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class CCBatchTransaction2 extends PXView {

	Record: PXActionState;

	Hide: PXActionState;
	RepeatMatching: PXActionState;

	@columnConfig({ allowCheckAll: true })
	SelectedToHide: PXFieldState;

	PCTranNumber: PXFieldState;
	SettlementStatus: PXFieldState;
	Amount: PXFieldState;
	AccountNumber: PXFieldState;
	InvoiceNbr: PXFieldState;
	SubmitTime: PXFieldState;
	DisplayCardType: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class CCBatchTransaction3 extends PXView {
	PCTranNumber: PXFieldState;
	SettlementStatus: PXFieldState;
	SubmitTime: PXFieldState;
	Amount: PXFieldState;
	AccountNumber: PXFieldState;
	InvoiceNbr: PXFieldState;
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	ARPayment__CashAccountID: PXFieldState;
	ARPayment__DepositNbr: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class CCBatchStatistics extends PXView {

	DisplayCardType: PXFieldState;
	SettledAmount: PXFieldState;
	SettledCount: PXFieldState;
	RefundAmount: PXFieldState;
	RefundCount: PXFieldState;
	RejectedAmount: PXFieldState;
	VoidCount: PXFieldState;
	DeclineCount: PXFieldState;
	ErrorCount: PXFieldState;

}

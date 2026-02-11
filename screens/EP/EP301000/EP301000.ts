import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen,
	viewInfo,
	CurrencyInfo
} from "client-controls";

import {
	ExpenseClaim,
	ReceiptsForSubmit,
	CustomerUpdateAsk,
	ExpenseClaimDetailsCurrent,
	Tax_Rows,
	ExpenseClaimCurrent,
	ExpenseClaimDetails,
	Taxes,
	APDocuments
} from "./views";

@graphInfo({
	graphType: "PX.Objects.EP.ExpenseClaimEntry",
	primaryView: "ExpenseClaim",
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class EP301000 extends PXScreen {
	ViewUnsubmitReceipt: PXActionState;
	ViewTaxes: PXActionState;
	ViewProject: PXActionState;
	ViewAPInvoice: PXActionState;
	SubmitReceipt: PXActionState;
	CancelSubmitReceipt: PXActionState;
	ChangeOk: PXActionState;
	ChangeCancel: PXActionState;
	CommitTaxes: PXActionState;
	SaveTaxZone: PXActionState;
	CurrencyView: PXActionState;

	ExpenseClaim = createSingle(ExpenseClaim);

	@viewInfo({containerName: "Receipts"})
	ReceiptsForSubmit = createCollection(ReceiptsForSubmit);
	CustomerUpdateAsk = createSingle(CustomerUpdateAsk);
	ExpenseClaimDetailsCurrent = createSingle(ExpenseClaimDetailsCurrent);
	Tax_Rows = createCollection(Tax_Rows);
	ExpenseClaimCurrent = createSingle(ExpenseClaimCurrent);

	@viewInfo({containerName: "Details"})
	ExpenseClaimDetails = createCollection(ExpenseClaimDetails);
	Taxes = createCollection(Taxes);
	APDocuments = createCollection(APDocuments);
	_EPExpenseClaim_CurrencyInfo_ = createSingle(CurrencyInfo);
}

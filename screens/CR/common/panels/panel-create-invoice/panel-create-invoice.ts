import {
	createSingle,
	viewInfo,
	PXFieldState,
	PXView,
	PXFieldOptions,
} from "client-controls";

export abstract class CreateInvoiceBase {

	@viewInfo({ containerName: "Dialog: Create Invoice" })
	CreateInvoicesParams = createSingle(CreateInvoicesFilter);
}

export class CreateInvoicesFilter extends PXView {
	RefNbr: PXFieldState;
	MakeQuotePrimary: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculatePrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculateDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDocGroupDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	ConfirmManualAmount: PXFieldState<PXFieldOptions.CommitChanges>;
}

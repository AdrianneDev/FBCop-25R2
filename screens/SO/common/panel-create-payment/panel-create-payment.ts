import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
	controlConfig,
	actionConfig
} from "client-controls";

export abstract class CreatePaymentBase {
	@actionConfig({ popupCommand: "CreatePaymentRefund" })
	CreatePaymentRefund: PXActionState;
	@actionConfig({ popupCommand: "SyncPaymentTransaction" })
	CreatePaymentCapture: PXActionState;
	@actionConfig({ popupCommand: "SyncPaymentTransaction" })
	CreatePaymentAuthorize: PXActionState;
	@actionConfig({ popupCommand: "CreatePaymentOK" })
	CreatePaymentOK: PXActionState;

	@viewInfo({ containerName: "Create Payment" })
	QuickPayment = createSingle(SOQuickPayment);
}

export class SOQuickPayment extends PXView {
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRefundAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
	DocDesc: PXFieldState;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefTranExtNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	NewCard: PXFieldState<PXFieldOptions.CommitChanges>;
	SaveCard: PXFieldState<PXFieldOptions.CommitChanges>;
	NewAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	SaveAccount: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;

	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	TerminalID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

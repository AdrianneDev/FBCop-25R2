import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	viewInfo,
} from "client-controls";

export abstract class IncreaseAmountBase {
	IncreaseAuthorizedOK: PXActionState;
	IncreaseAndCaptureAuthorizedOK: PXActionState;

	@viewInfo({ containerName: "Increase Authorized Amount" })
	IncreaseAmount = createSingle(SOIncreaseAuthorizedAmountDialog);
}

export class SOIncreaseAuthorizedAmountDialog extends PXView {

	WarningMessage: PXFieldState;
	InstanceType: PXFieldState;
	ReferenceNumber: PXFieldState;
	CuryID: PXFieldState;
	CuryAuthorizedAmt: PXFieldState;
	CuryOrigAdjAmt: PXFieldState;
	CuryAuthorizedAmtNew: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigAdjAmtNew: PXFieldState;
}

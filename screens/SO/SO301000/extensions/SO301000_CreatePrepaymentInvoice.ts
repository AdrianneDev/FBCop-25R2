import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	featureInstalled,
	viewInfo,
	PXActionState,
	controlConfig
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_CreatePrepaymentInvoice extends SO301000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+VATRecognitionOnPrepaymentsAR")
export class SO301000_CreatePrepaymentInvoice {
	CreatePrepaymentInvoiceOK: PXActionState;

	@viewInfo({ containerName: "Create Prepayment Invoice" })
	QuickPrepaymentInvoice = createSingle(SOQuickPrepaymentInvoice);
}

export class SOQuickPrepaymentInvoice extends PXView {

	@controlConfig({ minValue: 0 })
	PrepaymentPct: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryPrepaymentAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
}

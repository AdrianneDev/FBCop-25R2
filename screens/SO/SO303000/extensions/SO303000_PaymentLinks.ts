import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
	featureInstalled,
} from "client-controls";
import { SO303000, ARInvoiceCurrent } from "../SO303000";

export interface SO303000_PaymentLinks extends SO303000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AcumaticaPayments")
export class SO303000_PaymentLinks {
	CreateLink: PXActionState;
	SyncLink: PXActionState;
	ResendLink: PXActionState;

	@viewInfo({ containerName: "Payment Links" })
	PayLink = createSingle(CCPayLink);
}

export class CCPayLink extends PXView {
	Url: PXFieldState;
	LinkStatus: PXFieldState;
}

export interface ARInvoiceCurrent_PaymentLinks extends ARInvoiceCurrent { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AcumaticaPayments")
export class ARInvoiceCurrent_PaymentLinks {
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeliveryMethod: PXFieldState<PXFieldOptions.CommitChanges>;
}
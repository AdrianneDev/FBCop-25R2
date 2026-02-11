import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
	featureInstalled,
	FeaturesSet,
} from "client-controls";
import { SO301000, SOOrder } from "../SO301000";

export interface SO301000_PaymentLinks extends SO301000 { }
@featureInstalled(FeaturesSet.AcumaticaPayments)
export class SO301000_PaymentLinks {
	CreateLink: PXActionState;
	SyncLink: PXActionState;
	DeactivateLink: PXActionState;
	ResendLink: PXActionState;

	@viewInfo({ containerName: "Payment Links" })
	PayLink = createSingle(CCPayLink);
}

export class CCPayLink extends PXView {
	Url: PXFieldState;
	LinkStatus: PXFieldState;
}

export interface SOOrder_PaymentLinks extends SOOrder { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AcumaticaPayments")
export class SOOrder_PaymentLinks {
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeliveryMethod: PXFieldState<PXFieldOptions.CommitChanges>;
}

import {
	AR301000
} from "../AR301000";

import {
	PXView,
	PXFieldState,
	featureInstalled,
	viewInfo,
	createSingle,
	PXActionState
} from "client-controls";

export interface AR301000_PaymentLinks extends AR301000 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+AcumaticaPayments")
export class AR301000_PaymentLinks {

	CreateLink: PXActionState;
	SyncLink: PXActionState;
	ResendLink: PXActionState;

	@viewInfo({ containerName: "Payment Links" })
	PayLink = createSingle(CCPayLink);
}

export class CCPayLink extends PXView  {
	Url: PXFieldState;
	LinkStatus: PXFieldState;
}

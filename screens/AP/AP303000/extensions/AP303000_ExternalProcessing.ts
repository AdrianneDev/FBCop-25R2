import { PXFieldState, featureInstalled, PXView, createSingle, PXFieldOptions, viewInfo } from "client-controls";
import { AP303000 } from "../AP303000";

export interface AP303000_ExternalProcessing extends AP303000 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+PaymentProcessor")
export class AP303000_ExternalProcessing {

	@viewInfo({ containerName: "Payment -> External Payment Processing" })
	CurrentOrgVendor = createSingle(APPaymentProcessorVendor);
}

export class APPaymentProcessorVendor extends PXView {
	NetworkStatus: PXFieldState;
	PayByType: PXFieldState;
}

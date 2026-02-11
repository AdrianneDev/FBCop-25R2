import { PXFieldState, featureInstalled, PXView, createSingle, PXFieldOptions, viewInfo } from "client-controls";
import { AP303010 } from "../AP303010";

export interface AP303010_ExternalProcessing extends AP303010 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+PaymentProcessor")
export class AP303010_ExternalProcessing {

	@viewInfo({ containerName: "Payment -> External Payment Processing" })
	CurrentOrgVendor = createSingle(APPaymentProcessorVendor);
}

export class APPaymentProcessorVendor extends PXView {
	NetworkStatus: PXFieldState;
	PayByType: PXFieldState;
}

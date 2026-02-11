import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
	controlConfig,
	ISelectorControlConfig
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_CreateShipment extends SO301000 { }
export class SO301000_CreateShipment {
	@viewInfo({ containerName: "Specify Shipment Parameters" })
	soparamfilter = createSingle(SOParamFilter);
}

export class SOParamFilter extends PXView {
	ShipDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig<ISelectorControlConfig>({ displayMode: "both" })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

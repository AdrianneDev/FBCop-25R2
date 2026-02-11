import {
	PXView,
	PXFieldState,

	createSingle,

	viewInfo,
	featureInstalled,
	FeaturesSet,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_PaceJetCarrier extends SO301000 { }

@featureInstalled(FeaturesSet.CarrierIntegration)
export class SO301000_PaceJetCarrier {
	@viewInfo({ containerName: "Pacejet Options" })
	CarrierData = createSingle(SOOrderCarrierData);
}

@featureInstalled(FeaturesSet.CarrierIntegration)
export class SOOrderCarrierData extends PXView {
	AdditionalHandling: PXFieldState;
	LiftGate: PXFieldState;
	InsideDelivery: PXFieldState;
	LimitedAccess: PXFieldState;
}
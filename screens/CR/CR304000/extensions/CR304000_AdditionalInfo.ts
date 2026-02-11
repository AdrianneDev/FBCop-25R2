import { CR304000 } from "../CR304000";
import {
	PXView,
	PXFieldState,
	linkCommand,
	createCollection,
	PXFieldOptions,
	gridConfig,
	viewInfo,
	createSingle,
} from "client-controls";

export interface CR304000_CRMInfo extends CR304000 {}
export class CR304000_CRMInfo {

	@viewInfo({ containerName: "Forecasting" })
	ProbabilityCurrent = createSingle(CROpportunityProbability);

	@viewInfo({ containerName: "Activity Statistics" })
	ActivityStatistics = createSingle(CRActivityStatistics);

	@viewInfo({ containerName: "Shipping Options" })
	CarrierData = createSingle(CarrierData);
}

export class CROpportunityProbability extends PXView {
	Probability: PXFieldState<PXFieldOptions.Disabled>;
}

export class CRActivityStatistics extends PXView {
	LastIncomingActivityDate: PXFieldState;
	LastOutgoingActivityDate: PXFieldState;
}

export class CarrierData extends PXView {
	AdditionalHandling: PXFieldState;
	LiftGate: PXFieldState;
	InsideDelivery: PXFieldState;
	LimitedAccess: PXFieldState;
}

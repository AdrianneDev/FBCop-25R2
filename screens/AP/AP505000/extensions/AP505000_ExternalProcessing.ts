import { AP505000 } from "../AP505000";
import {
	PXView, createCollection, PXFieldState, PXFieldOptions, featureInstalled,
	createSingle, gridConfig, GridPreset, PXActionState, columnConfig, fieldConfig,
	viewInfo
} from "client-controls";

export interface AP505000_ExternalProcessing extends AP505000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+PaymentProcessor")
export class AP505000_ExternalProcessing {
	CurrentExternalPaymentProcessor = createSingle(APExternalPaymentProcessor);
}

@featureInstalled("PX.Objects.CS.FeaturesSet+PaymentProcessor")
export class APExternalPaymentProcessor extends PXView  {

	ExternalPaymentProcessorID: PXFieldState<PXFieldOptions.CommitChanges>;
	Name: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	DisclaimerMessage: PXFieldState;
}
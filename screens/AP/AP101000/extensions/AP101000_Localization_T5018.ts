import { PXFieldState, featureInstalled } from "client-controls";
import { AP101000, APSetup } from "../AP101000";

export interface AP101000_Localization_T5018 extends AP101000 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class AP101000_Localization_T5018 {

}

export interface APSetup_Localization_T5018 extends APSetup {}
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class APSetup_Localization_T5018 {
	T5018ThresholdAmount: PXFieldState;
	T4AThresholdAmount: PXFieldState;
}

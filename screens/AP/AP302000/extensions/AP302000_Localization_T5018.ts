import { PXFieldState, featureInstalled } from "client-controls";
import { AP302000, CurrentDocument } from "../AP302000";

export interface AP302000_Localization_T5018 extends AP302000 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class AP302000_Localization_T5018 {

}

export interface CurrentDocument_Localization_T5018 extends CurrentDocument {}
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class CurrentDocument_Localization_T5018 {
	IncludeInT5018Report: PXFieldState;
}

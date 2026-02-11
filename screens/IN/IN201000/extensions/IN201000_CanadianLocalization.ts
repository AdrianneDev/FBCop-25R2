import { PXFieldState, featureInstalled } from "client-controls";
import { IN201000, ItemClassSettings } from "../IN201000";

export interface IN201000_CanadianLocalization extends IN201000 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class IN201000_CanadianLocalization {
}

export interface ItemClassSettings_CanadianLocalization extends ItemClassSettings { }
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class ItemClassSettings_CanadianLocalization {
	T5018Service: PXFieldState;
}

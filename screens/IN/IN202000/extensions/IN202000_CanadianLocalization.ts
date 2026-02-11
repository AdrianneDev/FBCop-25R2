import { IN202000, ItemSettings } from "../IN202000";
import { featureInstalled, PXFieldState } from "client-controls";

export interface IN202000_CanadianLocalization extends IN202000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class IN202000_CanadianLocalization {
}

export interface ItemSettings_CanadianLocalization extends ItemSettings { }
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class ItemSettings_CanadianLocalization {
	T5018Service: PXFieldState;
}

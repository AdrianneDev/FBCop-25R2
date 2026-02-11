import { PXFieldState, featureInstalled, PXView, createSingle, PXFieldOptions } from "client-controls";
import { AP303000 } from "../AP303000";

export interface AP303000_CanadianVendor extends AP303000 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class AP303000_CanadianVendor {
	CanVendor = createSingle(CanadianVendor);
}

export class CanadianVendor extends PXView {
	CRAVendorReportingType: PXFieldState<PXFieldOptions.CommitChanges>;
	CRAVendorType: PXFieldState<PXFieldOptions.CommitChanges>;
	T5018ProgramNumber: PXFieldState;
	SocialInsNum: PXFieldState;
	T4ADefaultBox: PXFieldState<PXFieldOptions.CommitChanges>;
	T4AProgramNumber: PXFieldState;
	EmailT4AConsent: PXFieldState;
}

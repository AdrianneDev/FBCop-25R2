import { AP303000 } from "../AP303000";
import { DefaultContact } from "src/screens/common/form-contact-profile/form-contact-profile";
import { PXFieldState, PXFieldOptions, featureInstalled, } from "client-controls";

export interface AP303000_PersonalDataPrivacy extends AP303000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+GDPRCompliance")
export class AP303000_PersonalDataPrivacy {
}

export interface ContactInfo_PersonalDataPrivacy extends DefaultContact { }
@featureInstalled("PX.Objects.CS.FeaturesSet+GDPRCompliance")
export class ContactInfo_PersonalDataPrivacy {
	ConsentAgreement: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

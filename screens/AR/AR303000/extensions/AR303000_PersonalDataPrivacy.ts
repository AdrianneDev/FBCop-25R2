import { AR303000 } from "../AR303000";
import {
	PXFieldState,
	PXFieldOptions,
	featureInstalled,
} from "client-controls";
import { DefaultContact } from "src/screens/common/form-contact-profile/form-contact-profile";

export interface AR303000_PersonalDataPrivacy extends AR303000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+GDPRCompliance")
export class AR303000_PersonalDataPrivacy {
}

export interface ContactInfo_PersonalDataPrivacy extends DefaultContact { }
@featureInstalled("PX.Objects.CS.FeaturesSet+GDPRCompliance")
export class ContactInfo_PersonalDataPrivacy {
	ConsentAgreement: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

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
	IMailEditorControlConfig,
	controlConfig,
	fieldConfig,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";

export interface CR304000_Contact extends CR304000 {}
export class CR304000_Contact {

	@viewInfo({ containerName: "Contact" })
	Opportunity_Contact = createSingle(ContactDetail);

	@viewInfo({ containerName: "Address" })
	Opportunity_Address = createSingle(Address);
}

export class ContactDetail extends Contact {
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentAgreement: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

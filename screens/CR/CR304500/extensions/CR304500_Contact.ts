import { CR304500 } from "../CR304500";
import {
	PXView,
	PXFieldState,
	linkCommand,
	createCollection,
	PXFieldOptions,
	gridConfig,
	viewInfo,
	createSingle,
	controlConfig,
	IMailEditorControlConfig,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";

export interface CR304500_Contact extends CR304500 {}
export class CR304500_Contact {

	@viewInfo({ containerName: "Contact" })
	Quote_Contact = createSingle(ContactDetail);

	@viewInfo({ containerName: "Address" })
	Quote_Address = createSingle(Address);
}

export class ContactDetail extends Contact {
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;
}

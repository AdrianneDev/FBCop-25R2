import { CR303010 } from "../CR303010";
import {
	PXView,
	PXFieldState,
	createSingle,
	PXFieldOptions,
	viewInfo,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

export interface CR303010_General extends CR303010 {}
export class CR303010_General {

	@viewInfo({ containerName: "Location Address" })
	Address = createSingle(Address);

	@viewInfo({ containerName: "Additional Location Info" })
	Contact = createSingle(Contact);
}

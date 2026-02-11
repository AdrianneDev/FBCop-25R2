import { CR304000 } from "../CR304000";
import {
	viewInfo,
	createSingle,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

export interface CR304000_Addresses extends CR304000 {}
export class CR304000_Addresses {

	@viewInfo({ containerName: "Bill-To Address" })
	Billing_Address = createSingle(Address);

	@viewInfo({ containerName: "Bill-To Contact" })
	Billing_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);
}

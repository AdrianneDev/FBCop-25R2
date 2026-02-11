import { CR304500 } from "../CR304500";
import {
	viewInfo,
	createSingle,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

export interface CR304500_Addresses extends CR304500 {}
export class CR304500_Addresses {

	@viewInfo({ containerName: "Bill-To Address" })
	Billing_Address = createSingle(Address);

	@viewInfo({ containerName: "Bill-To Contact" })
	Billing_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);
}

import {
	createSingle,

	viewInfo,
} from "client-controls";
import { RQ503000 } from "../RQ503000";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

export interface RQ302000_VendorAddress extends RQ503000 { }
export class RQ302000_VendorAddress {
	@viewInfo({ containerName: "Vendor Contact" })
	Remit_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Vendor Address" })
	Remit_Address = createSingle(Address);
}

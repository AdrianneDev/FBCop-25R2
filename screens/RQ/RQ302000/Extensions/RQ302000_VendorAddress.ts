import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { RQ302000 } from "../RQ302000";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

export interface RQ302000_VendorAddress extends RQ302000 { }
export class RQ302000_VendorAddress {
	@viewInfo({ containerName: "Vendor Contact" })
	Bidding_Remit_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Vendor Address" })
	Bidding_Remit_Address = createSingle(Address);
}

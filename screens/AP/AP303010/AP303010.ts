import { Location, Location2, LocationAPPaymentInfo, VendorPaymentMethodDetail, LocationAPAccountSub, LocationBranchSettings } from "./views";
import { PXActionState, graphInfo, PXScreen, createSingle, createCollection, viewInfo } from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.AP.VendorLocationMaint", primaryView: "Location", bpEventsIndicator: true, showUDFIndicator: true })
export class AP303010 extends PXScreen {
	ViewOnMap: PXActionState;
	ViewRemitOnMap: PXActionState;

	@viewInfo({ containerName: "Vendor Location Summary" })
	Location = createSingle(Location);

	@viewInfo({ containerName: "Location Info" })
	LocationCurrent = createSingle(Location2);

	@viewInfo({ containerName: "General -> Location Address" })
	Address = createSingle(Address);

	@viewInfo({ containerName: "General -> Additional Location Info" })
	Contact = createSingle(Contact);

	@viewInfo({ containerName: "Payment -> Remit-To Address" })
	RemitAddress = createSingle(Address);

	@viewInfo({ containerName: "Payment -> Remit-To Info" })
	RemitContact = createSingle(Contact);

	@viewInfo({ containerName: "Payment -> Default Payment Settings" })
	APPaymentInfoLocation = createSingle(LocationAPPaymentInfo);

	@viewInfo({ containerName: "Payment -> Default Payment Settings -> Payment Instructions" })
	PaymentDetails = createCollection(VendorPaymentMethodDetail);

	@viewInfo({ containerName: "GL Accounts" })
	APAccountSubLocation = createSingle(LocationAPAccountSub);

	@viewInfo({ containerName: "Purchase Settings -> Shipping Instructions -> Location Settings for Current Branch" })
	LocationBranchSettings = createSingle(LocationBranchSettings);
}

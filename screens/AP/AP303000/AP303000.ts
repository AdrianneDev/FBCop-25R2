import {
	Vendor, Vendor_SuppliedByVendors, VendorBalanceSummary, Location, VendorPaymentMethodDetail,
	VendorBalanceSummaryByBaseCurrency, CSAnswers, VendorBAccount,
	LocationBranchSettings
} from "./views";
import { PXActionState, PXScreen, createSingle, createCollection, graphInfo, viewInfo } from "client-controls";
import { PrimaryContact } from "src/screens/CR/common/forms/form-primary-contact/form-primary-contact";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact, DefaultContact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.AP.VendorMaint", primaryView: "BAccount", bpEventsIndicator: true, udfTypeField: "VendorClassID", showUDFIndicator: true })
export class AP303000 extends PXScreen {
	ViewMainOnMap: PXActionState;
	ViewRemitOnMap: PXActionState;
	ViewDefLocationAddressOnMap: PXActionState;
	ViewBalanceDetails: PXActionState;

	@viewInfo({containerName: "Vendor Summary"})
	BAccount = createSingle(VendorBAccount);

	@viewInfo({containerName: "Vendor Summary -> Balance"})
	VendorBalance = createSingle(VendorBalanceSummary);

	@viewInfo({containerName: "Vendor Account Info"})
	CurrentVendor = createSingle(Vendor);

	@viewInfo({containerName: "General -> Account Address"})
	DefAddress = createSingle(Address);

	@viewInfo({containerName: "General -> Additional Account Info"})
	DefContact = createSingle(DefaultContact);

	@viewInfo({containerName: "General -> Primary Contact"})
	PrimaryContactCurrent = createSingle(PrimaryContact);

	@viewInfo({containerName: "Vendor Settings"})
	DefLocation = createSingle(Location);

	@viewInfo({ containerName: "Purchase Settings" })
	DefLocationBranchSettings = createSingle(LocationBranchSettings);

	@viewInfo({containerName: "Payment -> Remit-To Address"})
	RemitAddress = createSingle(Address);

	@viewInfo({containerName: "Payment -> Remit-To Info"})
	RemitContact = createSingle(Contact);

	@viewInfo({containerName: "Payment -> Default Payment Settings -> Payment Instructions"})
	PaymentDetails = createCollection(VendorPaymentMethodDetail);

	@viewInfo({containerName: "Purchase Settings -> Ship-From Address"})
	DefLocationAddress = createSingle(Address);

	@viewInfo({containerName: "Purchase Settings -> Ship-From Info"})
	DefLocationContact = createSingle(Contact);

	@viewInfo({containerName: "Balances"})
	VendorBalanceByBaseCurrency = createCollection(VendorBalanceSummaryByBaseCurrency);

	@viewInfo({containerName: "Attributes"})
	Answers = createCollection(CSAnswers);

	@viewInfo({containerName: "Supplied-By Vendors"})
	SuppliedByVendors = createCollection(Vendor_SuppliedByVendors);

}

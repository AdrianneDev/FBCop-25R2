import { APQuickCheck, CurrentAPQuickCheck, APTran, TaxTran, APPaymentChargeTran } from "./views";
import { PXActionState, graphInfo, PXScreen, createSingle, createCollection, viewInfo, CurrencyInfo } from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.AP.APQuickCheckEntry",
	primaryView: "Document",
	bpEventsIndicator: true,
	udfTypeField: "DocType",
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class AP304000 extends PXScreen {

	@viewInfo({containerName: "Document Summary"})
	Document = createSingle(APQuickCheck);

	@viewInfo({containerName: "Current Document"})
	CurrentDocument = createSingle(CurrentAPQuickCheck);

	@viewInfo({containerName: "Details"})
	Transactions = createCollection(APTran);

	@viewInfo({containerName: "Taxes"})
	Taxes = createCollection(TaxTran);

	@viewInfo({containerName: "Remittance -> Remittance Contact"})
	Remittance_Contact = createSingle(Contact);

	@viewInfo({containerName: "Remittance -> Remittance Address"})
	Remittance_Address = createSingle(Address);

	@viewInfo({containerName: "Charges"})
	PaymentCharges = createCollection(APPaymentChargeTran);

	@viewInfo({ containerName: "Document Summary -> Rate Selection" })
	CurrencyInfo = createSingle(CurrencyInfo);

}


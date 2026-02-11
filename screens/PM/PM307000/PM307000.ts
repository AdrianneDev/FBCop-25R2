import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	CurrencyInfo,
	PXScreen, viewInfo
} from "client-controls";

import {
	Document,
	Project,
	Overflow,
	Details,
	Unbilled,
	DocumentSettings,
	ProgressiveLines,
	TransactionLines,
	Taxes,
	Revisions,
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.PM.ProformaEntry",
	primaryView: "Document",
	showActivitiesIndicator: true, showUDFIndicator: true
})
export class PM307000 extends PXScreen {
	ViewTranDocument: PXActionState;
	ViewProgressLineTask: PXActionState;
	ViewProgressLineInventory: PXActionState;
	ViewTransactLineTask: PXActionState;
	ViewTransactLineInventory: PXActionState;
	ViewVendor: PXActionState;
	ViewARDocument: PXActionState;
	AppendSelected: PXActionState;
	AutoApplyPrepayments: PXActionState;

	Document = createSingle(Document);
	Project = createSingle(Project);
	@viewInfo({ syncAlways: true })
	Overflow = createSingle(Overflow);
	Details = createCollection(Details);
	Unbilled = createCollection(Unbilled);
	DocumentSettings = createSingle(DocumentSettings);

	@viewInfo({containerName: "Progress Billing"})
	ProgressiveLines = createCollection(ProgressiveLines);

	@viewInfo({containerName: "Time and Material"})
	TransactionLines = createCollection(TransactionLines);

	Taxes = createCollection(Taxes);
	Revisions = createCollection(Revisions);

	@viewInfo({containerName: "BILL-TO CONTACT"})
	Billing_Contact = createSingle(Contact);

	@viewInfo({containerName: "BILL-TO ADDRESS"})
	Billing_Address = createSingle(Address);

	@viewInfo({containerName: "SHIP-TO CONTACT"})
	Shipping_Contact = createSingle(Contact);

	@viewInfo({containerName: "SHIP-TO ADDRESS"})
	Shipping_Address = createSingle(Address);
	CurrencyInfo = createSingle(CurrencyInfo);
}

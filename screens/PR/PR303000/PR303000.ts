import {
	PXScreen,
	PXActionState,
	createSingle,
	createCollection,
	graphInfo
} from "client-controls";

import {
	Document,
	CurrentDocument,
	StatutoryHolidays,
	OtherMonies,
	InsurableEarnings,
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";

@graphInfo({
	graphType: "PX.Objects.PR.PRRecordOfEmploymentMaint",
	primaryView: "Document"
})
export class PR303000 extends PXScreen {
	Document = createSingle(Document);
	CurrentDocument = createSingle(CurrentDocument);
	Address = createSingle(Address);
	StatutoryHolidays = createCollection(StatutoryHolidays);
	OtherMonies = createCollection(OtherMonies);
	InsurableEarnings = createCollection(InsurableEarnings);
}


import {
	createSingle,
	createCollection,
	viewInfo,
} from "client-controls";
import { OpportunityFilter, AccountsFilter, ContactFilter, PopupAttributes, PopupUDFAttributes } from "../views";

export abstract class CreateOpportunityAllBase {
	@viewInfo({ containerName: "Dialog: Create Opportunity (Summary)" })
	OpportunityInfo = createSingle(OpportunityFilter);

	@viewInfo({ containerName: "Dialog: Create Opportunity (Attributes)" })
	OpportunityInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Opportunity (UDF)" })
	OpportunityInfoUDF = createCollection(PopupUDFAttributes);

	@viewInfo({ containerName: "Dialog: Create Business Account (Summary)", syncAlways: true })
	AccountInfo = createSingle(AccountsFilter);

	@viewInfo({ containerName: "Dialog: Create Business Account (Attributes)" })
	AccountInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Business Account (UDF)" })
	AccountInfoUDF = createCollection(PopupUDFAttributes);

	@viewInfo({ containerName: "Dialog: Create Contact (Summary)", syncAlways: true })
	ContactInfo = createSingle(ContactFilter);

	@viewInfo({ containerName: "Dialog: Create Contact (Attributes)" })
	ContactInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Contact (UDF)" })
	ContactInfoUDF = createCollection(PopupUDFAttributes);
}

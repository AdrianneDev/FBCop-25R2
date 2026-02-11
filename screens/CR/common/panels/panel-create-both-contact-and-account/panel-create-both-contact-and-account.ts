import { createSingle, createCollection, viewInfo } from "client-controls";
import { AccountsFilter, ContactFilter, PopupAttributes, PopupUDFAttributes } from "../views";

export abstract class CreateBothContactAndAccountBase {
	@viewInfo({ containerName: "Dialog: Create Business Account (Summary)" })
	AccountInfo = createSingle(AccountsFilter);

	@viewInfo({ containerName: "Dialog: Create Business Account (Attributes)" })
	AccountInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Business Account (UDF)" })
	AccountInfoUDF = createCollection(PopupUDFAttributes);

	@viewInfo({ containerName: "Dialog: Create Contact (Summary)" })
	ContactInfo = createSingle(ContactFilter);

	@viewInfo({ containerName: "Dialog: Create Contact (Attributes)" })
	ContactInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Contact (UDF)" })
	ContactInfoUDF = createCollection(PopupUDFAttributes);
}

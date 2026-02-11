import { createSingle, createCollection, viewInfo, PXActionState } from "client-controls";
import { ContactFilter, PopupAttributes, PopupUDFAttributes } from "../views";

export abstract class CreateContactBase {
	CreateContactFinishRedirect: PXActionState;
	CreateContactFinish: PXActionState;
	CreateContactCancel: PXActionState;

	@viewInfo({ containerName: "Dialog: Create Contact (Summary)" })
	ContactInfo = createSingle(ContactFilter);

	@viewInfo({ containerName: "Dialog: Create Contact (Attributes)" })
	ContactInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Contact (UDF)" })
	ContactInfoUDF = createCollection(PopupUDFAttributes);
}

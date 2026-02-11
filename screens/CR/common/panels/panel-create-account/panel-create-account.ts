import {
	createSingle,
	createCollection,
	viewInfo,
} from "client-controls";
import { AccountsFilter, PopupAttributes, PopupUDFAttributes } from "../views";

export abstract class CreateAccountBase {

	@viewInfo({ containerName: "Dialog: Create Business Account (Summary)" })
	AccountInfo = createSingle(AccountsFilter);

	@viewInfo({ containerName: "Dialog: Create Business Account (Attributes)" })
	AccountInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Business Account (UDF)" })
	AccountInfoUDF = createCollection(PopupUDFAttributes);
}

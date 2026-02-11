import { UpdateParamsBase } from "src/screens/CR/common/panels/panel-update-params/panel-update-params";
import { CR503320 } from "../CR503320";
import { localizable } from "client-controls";

@localizable
class WizardCaptions {
	static Caption = "Update Business Accounts";
}

export interface CR503320_UpdateParams extends CR503320, UpdateParamsBase {}
export class CR503320_UpdateParams extends UpdateParamsBase {
	getUpdateCaption() {
		return WizardCaptions.Caption;
	}
}

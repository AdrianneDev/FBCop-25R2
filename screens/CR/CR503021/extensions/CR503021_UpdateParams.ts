import { UpdateParamsBase } from "src/screens/CR/common/panels/panel-update-params/panel-update-params";
import { CR503021 } from "../CR503021";
import { localizable } from "client-controls";

@localizable
class WizardCaptions {
	static Caption = "Update Contacts";
}

export interface CR503021_UpdateParams extends CR503021, UpdateParamsBase {}
export class CR503021_UpdateParams extends UpdateParamsBase {
	getUpdateCaption() {
		return WizardCaptions.Caption;
	}
}

import { UpdateParamsBase } from "src/screens/CR/common/panels/panel-update-params/panel-update-params";
import { CR503220 } from "../CR503220";
import { localizable } from "client-controls";

@localizable
class WizardCaptions {
	static Caption = "Update Cases";
}

export interface CR503220_UpdateParams extends CR503220, UpdateParamsBase {}
export class CR503220_UpdateParams extends UpdateParamsBase {
	getUpdateCaption() {
		return WizardCaptions.Caption;
	}
}

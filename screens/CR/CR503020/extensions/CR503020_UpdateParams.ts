import { UpdateParamsBase } from "src/screens/CR/common/panels/panel-update-params/panel-update-params";
import { CR503020 } from "../CR503020";
import { localizable } from "client-controls";

@localizable
class WizardCaptions {
	static Caption = "Update Leads";
}

export interface CR503020_UpdateParams extends CR503020, UpdateParamsBase {}
export class CR503020_UpdateParams extends UpdateParamsBase {
	getUpdateCaption() {
		return WizardCaptions.Caption;
	}
}

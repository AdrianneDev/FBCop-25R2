import { UpdateParamsBase } from "src/screens/CR/common/panels/panel-update-params/panel-update-params";
import { CR503120 } from "../CR503120";
import { localizable } from "client-controls";

@localizable
class WizardCaptions {
	static Caption = "Update Opportunities";
}

export interface CR503120_UpdateParams extends CR503120, UpdateParamsBase {}
export class CR503120_UpdateParams extends UpdateParamsBase {
	getUpdateCaption() {
		return WizardCaptions.Caption;
	}
}

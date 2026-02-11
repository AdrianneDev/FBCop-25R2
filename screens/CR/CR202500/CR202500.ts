import { autoinject } from "aurelia-framework";
import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
} from "client-controls";

import { CSAttributeGroup } from "src/screens/CR/common/tabs/tab-attributes/views";

@graphInfo({ graphType: "PX.Objects.CR.CRCampaignClassMaint", primaryView: "CampaignClass", showActivitiesIndicator: true })
export class CR202500 extends PXScreen {
	@viewInfo({ containerName: "Campaign Class" })
	CampaignClass = createSingle(CRCampaignType);

	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(CSAttributeGroup);
}

export class CRCampaignType extends PXView {
	TypeID: PXFieldState;
	Description: PXFieldState;
}

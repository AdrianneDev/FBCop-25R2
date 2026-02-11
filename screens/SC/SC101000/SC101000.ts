import {
	createCollection,
	createSingle,
	graphInfo,
	PXScreen
} from "client-controls";

import {
	Setup,
	SetupApproval,
	Attributes,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.CN.Subcontracts.SC.Graphs.SubcontractSetupMaint",
	primaryView: "Setup"
})
export class SC101000 extends PXScreen {
	Setup = createSingle(Setup);
	SetupApproval = createSingle(SetupApproval);
	Attributes = createCollection(Attributes);
}
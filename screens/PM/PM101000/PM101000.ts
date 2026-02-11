import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Setup,
	Markups,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.SetupMaint",
	primaryView: "Setup"
})
export class PM101000 extends PXScreen {
	Refresh: PXActionState;

	Setup = createSingle(Setup);
	Markups = createCollection(Markups);
	AddNewProjectTemplate: PXActionState;
}

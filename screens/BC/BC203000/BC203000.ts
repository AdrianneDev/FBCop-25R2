import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	actionConfig,
} from "client-controls";

import {
	MasterView,
	OptionMappings,
} from "./views";

@graphInfo({ graphType: "PX.Commerce.Objects.BCMatrixOptionsMappingMaint", primaryView: "MasterView" })
export class BC203000 extends PXScreen {
	@actionConfig({ dialogWidth: "710px"})
	ViewAttributes: PXActionState;

	MasterView = createSingle(MasterView);

	OptionMappings = createCollection(OptionMappings);
}

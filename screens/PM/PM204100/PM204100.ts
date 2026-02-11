import {
	createCollection,
	graphInfo,
	PXScreen
} from "client-controls";

import {
	RateTypes
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.RateTypeMaint",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
	primaryView: "RateTypes"
})
export class PM204100 extends PXScreen {
	RateTypes = createCollection(RateTypes);
}

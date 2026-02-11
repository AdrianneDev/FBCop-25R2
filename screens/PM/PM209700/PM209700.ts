import {
	PXScreen,
	createCollection,
	graphInfo
} from "client-controls";

import {
	Items,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.UnionMaint",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class PM209700 extends PXScreen {
	Items = createCollection(Items);
}

import {
	PXScreen,
	createCollection,
	graphInfo} from "client-controls";

import {
	Items,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.RegisterRelease",
	primaryView: "Items",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class PM501000 extends PXScreen {
	Items = createCollection(Items);
}

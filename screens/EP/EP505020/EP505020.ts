import {
	createCollection,
	graphInfo,
	PXScreen
} from "client-controls";

import {
	FilteredItems
} from "./views";

@graphInfo({
	graphType: "PX.Objects.EP.EquipmentTimeCardRelease",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
	primaryView: "FilteredItems"
})
export class EP505020 extends PXScreen {
	FilteredItems = createCollection(FilteredItems);
}

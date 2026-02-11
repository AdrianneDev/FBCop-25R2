import {
	createCollection,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	FilteredItems
} from "./views";

@graphInfo({
	graphType: "PX.Objects.EP.TimeCardRelease",
	primaryView: "FilteredItems",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class EP505010 extends PXScreen {
	FilteredItems = createCollection(FilteredItems);
}

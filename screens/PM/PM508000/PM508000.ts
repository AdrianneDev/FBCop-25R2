import {
	PXScreen,
	PXActionState,
	createSingle,
	createCollection,
	graphInfo,
	viewInfo,
	PXPageLoadBehavior
} from "client-controls";

import {
	Filter,
	Items,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.ProjectInventoryTransferProcess",
	primaryView: "Filter",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class PM508000 extends PXScreen {
	ViewDocument: PXActionState;

	Filter = createSingle(Filter);
	Items = createCollection(Items);
}


import {
	createCollection,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Items
} from "./views";

@graphInfo({
	graphType: "PX.Objects.EP.EquipmentTimecardPrimary",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class EP407000 extends PXScreen {
	updateDetail: PXActionState;

	Items = createCollection(Items);
}

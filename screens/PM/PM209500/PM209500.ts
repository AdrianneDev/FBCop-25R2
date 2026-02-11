import {
	PXScreen,
	PXActionState,
	createCollection,
	graphInfo
} from "client-controls";

import {
	Items,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.CostCodeMaint",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class PM209500 extends PXScreen {
	Save: PXActionState;
	Cancel: PXActionState;

	Items = createCollection(Items);
}


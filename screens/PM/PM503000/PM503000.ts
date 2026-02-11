import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Filter,
	Items
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.BillingProcess",
	primaryView: "Filter"
})
export class PM503000 extends PXScreen {
	viewDocumentProject: PXActionState;

	Filter = createSingle(Filter);
	Items = createCollection(Items);
}

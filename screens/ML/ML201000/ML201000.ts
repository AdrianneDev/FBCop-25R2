import {
	createSingle,
	createCollection,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	LLMConnection,
	LLMConnectionParameter
} from "./views";

@graphInfo({
	graphType: "PX.AIStudio.Graph.LLMConnectionEntry",
	primaryView: "Document"
})
export class ML201000 extends PXScreen {
	RefreshProviders: PXActionState;

	Document = createSingle(LLMConnection);
	Parameters = createCollection(LLMConnectionParameter);
}

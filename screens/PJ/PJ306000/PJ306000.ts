import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Submittals,
	CurrentSubmittal,
	SubmittalWorkflowItems
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.Submittals.PJ.Graphs.SubmittalEntry",
	primaryView: "Submittals",
	showUDFIndicator: true
})
export class PJ306000 extends PXScreen {
	Submittals = createSingle(Submittals);
	CurrentSubmittal = createSingle(CurrentSubmittal);
	SubmittalWorkflowItems = createCollection(SubmittalWorkflowItems);
}

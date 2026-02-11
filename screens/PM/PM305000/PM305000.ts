import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Document,
	ProjectTotals,
	Details,
	AvailableCostBudget,
	History,
	CopyDialog,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.CN.ProjectAccounting.CostProjectionEntry",
	primaryView: "Document"
})
export class PM305000 extends PXScreen {
	AppendSelectedCostBudget: PXActionState;

	Document = createSingle(Document);
	ProjectTotals = createSingle(ProjectTotals);
	Details = createCollection(Details);
	AvailableCostBudget = createCollection(AvailableCostBudget);
	History = createCollection(History);
	CopyDialog = createSingle(CopyDialog);
}

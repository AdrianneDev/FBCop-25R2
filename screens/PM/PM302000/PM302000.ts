import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Task,
	TaskProperties,
	TaskCampaign,
	BillingItems,
	Answers
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.ProjectTaskEntry",
	primaryView: "Task",
	showUDFIndicator: true
})
export class PM302000 extends PXScreen {

	Task = createSingle(Task);
	TaskProperties = createSingle(TaskProperties);
	TaskCampaign = createSingle(TaskCampaign);
	BillingItems = createCollection(BillingItems);
	Answers = createCollection(Answers);
}

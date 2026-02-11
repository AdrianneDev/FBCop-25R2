import {
	PXView,
	PXFieldState,

	createCollection,

	viewInfo,
	gridConfig,
	GridPreset,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_Risks extends SO301000 { }
export class SO301000_Risks {
	@viewInfo({ containerName: "Risks" })
	OrderRisks = createCollection(OrderRisks);
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowInsert: false,
	allowDelete: false,
	allowUpdate: false,
})
export class OrderRisks extends PXView {
	LineNbr: PXFieldState;
	Score: PXFieldState;
	Recommendation: PXFieldState;
	Message: PXFieldState;
}
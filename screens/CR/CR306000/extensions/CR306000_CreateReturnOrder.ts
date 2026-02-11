import { CR306000 } from "../CR306000";
import {
	PXView,
	PXFieldState,
	createSingle,
	PXFieldOptions,
	viewInfo,
	PXActionState,
} from "client-controls";

export interface CR306000_CreateReturnOrder extends CR306000 { }
export class CR306000_CreateReturnOrder {
	CreateReturnOrderInPanel: PXActionState;

	@viewInfo({ containerName: "Dialog: Create Return Order" })
	CreateOrderParams = createSingle(CreateReturnOrderParams);
}

export class CreateReturnOrderParams extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
}

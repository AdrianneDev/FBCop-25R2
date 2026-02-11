import { CR306000 } from "../CR306000";
import {
	PXView,
	PXFieldState,
	createSingle,
	PXFieldOptions,
	viewInfo,
} from "client-controls";

export interface CR306000_CreateServiceOrder extends CR306000 { }
export class CR306000_CreateServiceOrder {

	@viewInfo({ containerName: "Dialog: Create Service Order" })
	CreateServiceOrderFilter = createSingle(CreateServiceOrderFilter);
}

export class CreateServiceOrderFilter extends PXView {
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	AssignedEmpID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProblemID: PXFieldState<PXFieldOptions.CommitChanges>;
}

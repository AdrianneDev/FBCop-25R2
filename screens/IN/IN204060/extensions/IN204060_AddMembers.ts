import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { IN204060 } from "../IN204060";

export interface IN204060_AddMembers extends IN204060 { }
export class IN204060_AddMembers {
	@viewInfo({ containerName: "Class Info" })
	ClassInfo = createSingle(ClassInfo);
}

export class ClassInfo extends PXView {
	AddItemsTypes: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
}
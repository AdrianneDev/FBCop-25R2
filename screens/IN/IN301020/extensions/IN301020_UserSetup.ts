import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { IN301020 } from "../IN301020";

export interface IN301020_UserSetup extends IN301020 { }
export class IN301020_UserSetup {
	@viewInfo({ containerName: "User Setup" })
	UserSetupView = createSingle(UserSetup);
}

export class UserSetup extends PXView {
	DefaultWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;

	PrintInventoryLabelsAutomatically: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryLabelsReportID: PXFieldState<PXFieldOptions.CommitChanges>;

	UseScale: PXFieldState<PXFieldOptions.CommitChanges>;
	ScaleDeviceID: PXFieldState<PXFieldOptions.CommitChanges>;
}
import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { IN302020 } from "../IN302020";

export interface IN302020_UserSetup extends IN302020 { }
export class IN302020_UserSetup {
	@viewInfo({ containerName: "User Setup" })
	UserSetupView = createSingle(UserSetup);
}

export class UserSetup extends PXView {
	DefaultWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;

	UseScale: PXFieldState<PXFieldOptions.CommitChanges>;
	ScaleDeviceID: PXFieldState<PXFieldOptions.CommitChanges>;
}
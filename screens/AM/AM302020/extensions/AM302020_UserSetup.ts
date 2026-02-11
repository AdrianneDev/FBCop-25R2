import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	viewInfo,
} from "client-controls";
import { AM302020 } from "../AM302020";

export interface AM302020_UserSetup extends AM302020 { }
export class AM302020_UserSetup {
	@viewInfo({ containerName: "Settings" })
	UserSetupView = createSingle(AMScanUserSetup);
}

export class AMScanUserSetup extends PXView {
	DefaultWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultLotSerialNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

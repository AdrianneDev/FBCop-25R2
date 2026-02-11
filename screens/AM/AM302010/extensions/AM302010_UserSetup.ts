import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	viewInfo,
} from "client-controls";
import { AM302010 } from "../AM302010";

export interface AM302010_UserSetup extends AM302010 { }
export class AM302010_UserSetup {
	@viewInfo({ containerName: "Settings" })
	UserSetupView = createSingle(AMScanUserSetup);
}

export class AMScanUserSetup extends PXView {
	DefaultWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultLotSerialNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

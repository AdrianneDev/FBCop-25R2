import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	viewInfo,
} from "client-controls";
import { AM300030 } from "../AM300030";

export interface AM300030_UserSetup extends AM300030 { }
export class AM300030_UserSetup {
	@viewInfo({ containerName: "Settings" })
	UserSetupView = createSingle(AMScanUserSetup);
}

export class AMScanUserSetup extends PXView {
	DefaultWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultLotSerialNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

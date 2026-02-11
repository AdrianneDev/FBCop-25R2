import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { PO302020 } from "../PO302020";

export interface PO302020_UserSetup extends PO302020 { }
export class PO302020_UserSetup {
	@viewInfo({ containerName: "User Setup" })
	UserSetupView = createSingle(UserSetup);
}

export class UserSetup extends PXView {
	DefaultLotSerialNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SingleLocation: PXFieldState<PXFieldOptions.CommitChanges>;

	PrintInventoryLabelsAutomatically: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryLabelsReportID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintPurchaseReceiptAutomatically: PXFieldState<PXFieldOptions.CommitChanges>;

	UseScale: PXFieldState<PXFieldOptions.CommitChanges>;
	ScaleDeviceID: PXFieldState<PXFieldOptions.CommitChanges>;
}
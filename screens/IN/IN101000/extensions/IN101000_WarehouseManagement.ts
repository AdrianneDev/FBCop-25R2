import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
	featureInstalled,
	FeaturesSet,
} from "client-controls";
import { IN101000 } from "../IN101000";

export interface IN101000_WarehouseManagement extends IN101000 { }
@featureInstalled(FeaturesSet.WMSInventory)
export class IN101000_WarehouseManagement {
	@viewInfo({ containerName: "Warehouse Management" })
	ScanSetup = createSingle(ScanSetup);
}

export class ScanSetup extends PXView {
	ExplicitLineConfirmation: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultQtyInReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultReasonCodeInReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestLocationForEachItemInReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultQtyInIssue: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultReasonCodeInIssue: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestLocationForEachItemInIssue: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultQtyInTransfer: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultReasonCodeInTransfer: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultLotSerialNbrInTransfer: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestLocationForEachItemInTransfer: PXFieldState<PXFieldOptions.CommitChanges>;
	UseCartsForTransfers: PXFieldState<PXFieldOptions.CommitChanges>;
	UseDefaultQtyInCount: PXFieldState<PXFieldOptions.CommitChanges>;
}

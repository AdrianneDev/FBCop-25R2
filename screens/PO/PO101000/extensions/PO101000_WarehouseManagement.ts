import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
	featureInstalled,
	FeaturesSet,
} from "client-controls";
import { PO101000 } from "../PO101000";

export interface PO101000_WarehouseManagement extends PO101000 { }
@featureInstalled(FeaturesSet.WMSReceiving)
export class PO101000_WarehouseManagement {
	@viewInfo({ containerName: "Warehouse Management" })
	ReceivePutAwaySetup = createSingle(POReceivePutAwaySetup);
}

export class POReceivePutAwaySetup extends PXView {
	ShowReceivingTab: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowPutAwayTab: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowReturningTab: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowReceiveTransferTab: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowScanLogTab: PXFieldState;
	UseDefaultQty: PXFieldState<PXFieldOptions.CommitChanges>;
	ExplicitLineConfirmation: PXFieldState;
	UseCartsForPutAway: PXFieldState;
	DefaultLotSerialNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SingleLocation: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultReceivingLocation: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestLocationForEachItemInReceive: PXFieldState;
	RequestLocationForEachItemInPutAway: PXFieldState;
	RequestLocationForEachItemInReturn: PXFieldState;
	VerifyReceiptsBeforeRelease: PXFieldState<PXFieldOptions.CommitChanges>;
	KeepZeroLinesOnReceiptConfirmation: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintInventoryLabelsAutomatically: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryLabelsReportID: PXFieldState;
	PrintPurchaseReceiptAutomatically: PXFieldState<PXFieldOptions.CommitChanges>;
}
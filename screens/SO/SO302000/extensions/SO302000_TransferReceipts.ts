import {
	PXView,
	PXFieldState,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";
import { SO302000 } from "../SO302000";

export interface SO302000_TransferReceipts extends SO302000 { }
export class SO302000_TransferReceipts {
	@viewInfo({ containerName: "Transfer Receipts" })
	RelatedTransferReceipts = createCollection(TransferReceipts);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	adjustPageSize: true,
	syncPosition: true,
})
export class TransferReceipts extends PXView {
	ReceiptType: PXFieldState;
	ReceiptNbr: PXFieldState;
	Status: PXFieldState;
	ReceiptDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	OrderQty: PXFieldState;
	SiteID: PXFieldState;
	InvtDocType: PXFieldState;
	InvtRefNbr: PXFieldState;
}

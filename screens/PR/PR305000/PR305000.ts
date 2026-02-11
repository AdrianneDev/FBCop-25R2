import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo
} from "client-controls";

import {
	CABatch,
	CABatchDetail,
	PRPaymentBatchExportHistory,
	PRPayment,
	PRPaymentBatchFilter,
	PRPayment2,
	PRPaymentBatchExportHistory2,
	PRPaymentBatchExportDetails,
	PRPaymentBatchExportHistory3
} from "./views";

@graphInfo({ graphType: "PX.Objects.PR.PRDirectDepositBatchEntry", primaryView: "Document" })
export class PR305000 extends PXScreen {
	ViewPRDocument: PXActionState;

	@viewInfo({ containerName: "Document" })
	Document = createSingle(CABatch);

	@viewInfo({ containerName: "Batch Details" })
	BatchPaymentsDetails = createCollection(CABatchDetail);

	ExportHistory = createCollection(PRPaymentBatchExportHistory);
	PrintingHistory = createCollection(PRPaymentBatchExportHistory);

	@viewInfo({ containerName: "Add Payment" })
	PaymentsToAdd = createCollection(PRPayment);

	@viewInfo({ containerName: "Export Reason" })
	Filter = createSingle(PRPaymentBatchFilter);

	@viewInfo({ containerName: "Print Checks" })
	Payments = createCollection(PRPayment2);

	CurrentExportHistory = createSingle(PRPaymentBatchExportHistory2);

	ExportDetails = createCollection(PRPaymentBatchExportDetails);

	LatestExport = createSingle(PRPaymentBatchExportHistory3);
}

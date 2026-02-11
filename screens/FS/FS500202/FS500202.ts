import {
	graphInfo,
	gridConfig,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	columnConfig,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.ReviewInvoiceBatches", primaryView: "Batches" })
export class FS500202 extends PXScreen {
	Batches = createCollection(FSPostBatch);
}

@gridConfig({
	preset: GridPreset.Processing
})
export class FSPostBatch extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	BatchNbr: PXFieldState;
	PostTo: PXFieldState;
	QtyDoc: PXFieldState;
	UpToDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BillingCycleID: PXFieldState;

	FinPeriodID: PXFieldState;
	InvoiceDate: PXFieldState;
	CreatedDateTime: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

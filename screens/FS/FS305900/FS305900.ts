import {
	graphInfo,
	gridConfig,
	createCollection,
	createSingle,
	linkCommand,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXPageLoadBehavior,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.InventoryPostBatchMaint", primaryView: "BatchRecords", pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord })
export class FS305900 extends PXScreen {
	OpenDocument: PXActionState;
	BatchRecords = createSingle(FSPostBatch);
	BatchDetailsInfo = createCollection(InventoryPostingBatchDetail);
}

export class FSPostBatch extends PXView {
	BatchNbr: PXFieldState;
	CutOffDate: PXFieldState;
	InvoiceDate: PXFieldState;
	FinPeriodID: PXFieldState;
	QtyDoc: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class InventoryPostingBatchDetail extends PXView {
	Mem_DocType: PXFieldState;

	@linkCommand("OpenDocument")
	Mem_DocNbr: PXFieldState;

	SODetID: PXFieldState;
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SrvOrdType: PXFieldState;

	AppointmentID: PXFieldState;
	BillCustomerID: PXFieldState;
	AcctName: PXFieldState;
	SOID: PXFieldState;
}

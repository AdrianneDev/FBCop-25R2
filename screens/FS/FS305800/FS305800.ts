import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	linkCommand,
	PXPageLoadBehavior,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.PostBatchMaint", primaryView: "BatchRecords", pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord })
export class FS305800 extends PXScreen {
	OpenDocument: PXActionState;
	BatchRecords = createSingle(FSPostBatch);
	BatchDetailsInfo = createCollection(FSCreatedDoc);
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class FSCreatedDoc extends PXView {
	PostTo: PXFieldState;
	CreatedDocType: PXFieldState;

	@linkCommand("OpenDocument")
	CreatedRefNbr: PXFieldState;

	PostingBatchDetail__InvoiceRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PostingBatchDetail__SrvOrdType: PXFieldState;

	PostingBatchDetail__AppointmentID: PXFieldState;
	PostingBatchDetail__BillCustomerID: PXFieldState;
	PostingBatchDetail__AcctName: PXFieldState;
	PostingBatchDetail__SOID: PXFieldState;
	PostingBatchDetail__ActualDateTimeBegin_Date: PXFieldState;
	PostingBatchDetail__ActualDateTimeBegin_Time: PXFieldState;
	PostingBatchDetail__ActualDateTimeEnd_Time: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PostingBatchDetail__BranchLocationID: PXFieldState;

	PostingBatchDetail__GeoZoneCD: PXFieldState;
	PostingBatchDetail__DocDesc: PXFieldState;
}

export class FSPostBatch extends PXView {
	BatchNbr: PXFieldState;
	BillingCycleID: PXFieldState;
	UpToDate: PXFieldState;
	InvoiceDate: PXFieldState;
	FinPeriodID: PXFieldState;
	QtyDoc: PXFieldState;
}

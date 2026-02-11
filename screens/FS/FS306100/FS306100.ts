import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	linkCommand,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXPageLoadBehavior,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.ContractPostBatchMaint", primaryView: "ContractBatchRecords", pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord })
export class FS306100 extends PXScreen {
	Save: PXActionState;
	OpenDocument: PXActionState;
	OpenContract: PXActionState;
	ContractBatchRecords = createSingle(FSContractPostBatch);
	ContractPostDocRecords = createCollection(ContractPostBatchDetail);
}

export class FSContractPostBatch extends PXView {
	ContractPostBatchNbr: PXFieldState;
	UpToDate: PXFieldState;
	InvoiceDate: PXFieldState;
	FinPeriodID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class ContractPostBatchDetail extends PXView {
	PostDocType: PXFieldState;

	@linkCommand("openDocument")
	PostRefNbr: PXFieldState;

	@linkCommand("openContract")
	ContractRefNbr: PXFieldState;

	CustomerContractNbr: PXFieldState;
	BillCustomerID: PXFieldState;
	AcctName: PXFieldState;
	BillLocationID: PXFieldState;
	StartDate: PXFieldState;
	NextBillingInvoiceDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchLocationID: PXFieldState;

	DocDesc: PXFieldState;
}

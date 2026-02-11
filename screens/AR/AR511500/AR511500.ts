import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, PXPageLoadBehavior, viewInfo, gridConfig, columnConfig, linkCommand,
	PXFieldOptions,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARPaymentsAutoProcessing", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class AR511500 extends PXScreen {
	EditDetail: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(PaymentFilter);

	@viewInfo({ containerName: "Payment Details" })
	ARDocumentList = createCollection(ARPaymentInfo);
}

export class PaymentFilter extends PXView {
	PayDate: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementCycleId: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	initNewRow: true, preset: GridPreset.Processing,
	quickFilterFields: ["RefNbr", "CustomerID", "CustomerID_BAccountR_acctName"]})
export class ARPaymentInfo extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("EditDetail")
	RefNbr: PXFieldState;

	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	CustomerID_BAccountR_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState;

	DocDesc: PXFieldState;

	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;
	CCPaymentStateDescr: PXFieldState;
	PMInstanceDescr: PXFieldState;
	IsCCExpired: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProcessingCenterID: PXFieldState;

	ProcessingCenterID_CCProcessingCenter_Name: PXFieldState;
	CCTranDescr: PXFieldState;
}

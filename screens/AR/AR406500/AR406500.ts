//Columns in the grid are not displayed on the new UI: https://jira.acumatica.com/browse/AC-297068

import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, GridPreset, GridFilterBarVisibility, columnConfig, linkCommand,
	PXPageLoadBehavior, PXFieldOptions
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.FailedCCPaymentEnq", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR406500 extends PXScreen {
	viewCustomer: PXActionState;
	viewPaymentMethod: PXActionState;
	ViewDocument: PXActionState;

	@viewInfo({containerName: "Selection"})
	Filter = createSingle(CCPaymentFilter);

	@viewInfo({containerName: "Transaction List"})
	PaymentTrans = createCollection(CCProcTran);
}

export class CCPaymentFilter extends PXView  {
	BeginDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Inquiry })
export class CCProcTran extends PXView  {
	@linkCommand("viewCustomer")
	Customer__AcctCD: PXFieldState;

	Customer__AcctName: PXFieldState;

	@linkCommand("viewPaymentMethod")
	ARPayment__PaymentMethodID: PXFieldState;

	ExternalTransaction__CardType: PXFieldState;
	ExternalTransaction__ProcCenterCardTypeCode: PXFieldState;
	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	OrigDocType: PXFieldState;
	OrigRefNbr: PXFieldState;
	ProcessingCenterID: PXFieldState;

	@columnConfig({visible: false})
	TranNbr: PXFieldState;

	TranType: PXFieldState;
	Amount: PXFieldState;
	ProcStatus: PXFieldState;
	TranStatus: PXFieldState;
	RefTranNbr: PXFieldState;
	PCTranNumber: PXFieldState;
	PCResponseReasonText: PXFieldState;
	StartTime: PXFieldState;
}

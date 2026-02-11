import {
	PXScreen,
	PXView,
	PXFieldState,

	createSingle,

	graphInfo,
	viewInfo,
	controlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.RQ.RQSetupMaint",
	primaryView: "Setup",
})
export class RQ101000 extends PXScreen {
	@viewInfo({containerName: "General Settings"})
	Setup = createSingle(RQSetup);
}

export class RQSetup extends PXView {
	RequestNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true, displayMode: "text" })
	RequestAssignmentMapID: PXFieldState;

	MonthRetainRequest: PXFieldState;
	RequestApproval: PXFieldState;
	RequisitionNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true, displayMode: "text" })
	RequisitionAssignmentMapID: PXFieldState;

	MonthRetainRequisition: PXFieldState;
	RequisitionApproval: PXFieldState;
	RequisitionMergeLines: PXFieldState;
	QTOrderType: PXFieldState;
	SOOrderType: PXFieldState;
	POHold: PXFieldState;
	BudgetLedgerId: PXFieldState;
	BudgetCalculation: PXFieldState;
	DefaultReqClassID: PXFieldState;
}

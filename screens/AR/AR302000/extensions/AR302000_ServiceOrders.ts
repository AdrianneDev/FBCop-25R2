import {
	AR302000
} from "../AR302000";

import {
	PXView,
	createCollection,
	PXFieldState,
	featureInstalled,
	PXActionState,
	linkCommand,
	gridConfig,
	GridPreset,
	viewInfo
} from "client-controls";


export interface AR302000_ServiceOrders extends AR302000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+ServiceManagementModule")
export class AR302000_ServiceOrders {

	@viewInfo({containerName: "Service Orders"})
	FSAdjustments = createCollection(FSAdjust);
}

@gridConfig({
	preset: GridPreset.Details
})
export class FSAdjust extends PXView {

	ViewFSDocumentToApply: PXActionState;
	ViewFSAppointmentSource: PXActionState;

	AdjdOrderType: PXFieldState;

	@linkCommand("ViewFSDocumentToApply")
	AdjdOrderNbr: PXFieldState;
	FSServiceOrder__Status: PXFieldState;

	@linkCommand("ViewFSAppointmentSource")
	AdjdAppRefNbr: PXFieldState;
	AdjdOrderDate: PXFieldState;
	FSServiceOrder__DocDesc: PXFieldState;
	FSServiceOrder__CuryDocTotal: PXFieldState;
	SOCuryCompletedBillableTotal: PXFieldState;
	FSServiceOrder__CuryID: PXFieldState;
}

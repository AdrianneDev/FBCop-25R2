import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.RouteSetupMaint", primaryView: "RouteSetupRecord" })
export class FS100400 extends PXScreen {
	SetupRecord = createSingle(FSSetup);
	RouteSetupRecord = createSingle(FSRouteSetup);
}

export class FSSetup extends PXView {
	EquipmentNumberingID: PXFieldState;
	ServiceContractNumberingID: PXFieldState;
	ScheduleNumberingID: PXFieldState;
	ContractPostTo: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractPostOrderType: PXFieldState;
	DfltContractTermIDARSO: PXFieldState;
	ContractSalesAcctSource: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractCombineSubFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	EnableContractPeriodWhenInvoice: PXFieldState;
}

export class FSRouteSetup extends PXView {
	RouteNumberingID: PXFieldState;
	EnableSeasonScheduleContract: PXFieldState;
	DfltSrvOrdType: PXFieldState;
	AutoCalculateRouteStats: PXFieldState;
	GroupINDocumentsByPostingProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	SetFirstManualAppointment: PXFieldState;
	TrackRouteLocation: PXFieldState;
}
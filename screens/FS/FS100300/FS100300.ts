import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.EquipmentSetupMaint", primaryView: "EquipmentSetupRecord" })
export class FS100300 extends PXScreen {
	EquipmentSetupRecord = createSingle(FSEquipmentSetup);
}

export class FSEquipmentSetup extends PXView {
	EquipmentNumberingID: PXFieldState;
	ServiceContractNumberingID: PXFieldState;
	ScheduleNumberingID: PXFieldState;
	EnableAllTargetEquipment: PXFieldState;
	EnableSeasonScheduleContract: PXFieldState;
	EquipmentCalculateWarrantyFrom: PXFieldState;
	ContractPostTo: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractPostOrderType: PXFieldState;
	DfltContractTermIDARSO: PXFieldState;
	ContractSalesAcctSource: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractCombineSubFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	EnableContractPeriodWhenInvoice: PXFieldState;
}
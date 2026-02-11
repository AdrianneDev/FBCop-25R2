import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.ClockEntry", primaryView: "header", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM315000 extends PXScreen {
	@viewInfo({ containerName: "Document Summary" })
	header = createSingle(AMClockItem);
	@viewInfo({ containerName: "transactions" })
	transactions = createCollection(AMClockTran);
}

export class AMClockItem extends PXView {
	FillCurrentUser: PXActionState;

	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShiftCD: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState;
	StartTime: PXFieldState;
	LaborTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class AMClockTran extends PXView {
	LineNbr: PXFieldState;
	TranDate: PXFieldState;
	StartTime: PXFieldState;
	EndTime: PXFieldState;
	LaborTime: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	@columnConfig({ nullText: Labels.Split }) SubItemID: PXFieldState;
	EmployeeID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ShiftCD: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LocationID: PXFieldState;
	CloseFlg: PXFieldState;
}

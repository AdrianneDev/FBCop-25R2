import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.APSRoughCutProcess", primaryView: "OrderList", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM501000 extends PXScreen {
	@viewInfo({ containerName: "Filter" })
	Filter = createSingle(APSRoughCutProcessFilter);
	@viewInfo({ containerName: "Orders" })
	OrderList = createCollection(AMSchdItem);
}

export class APSRoughCutProcessFilter extends PXView {
	ProcessAction: PXFieldState<PXFieldOptions.CommitChanges>;
	ReleaseOrders: PXFieldState;
	ExcludePlanningOrders: PXFieldState<PXFieldOptions.CommitChanges>;
	ExcludeFirmOrders: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class AMSchdItem extends PXView {
	@columnConfig({ allowCheckAll: true	}) Selected: PXFieldState;
	QtytoProd: PXFieldState;
	QtyRemaining: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__UOM: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	InventoryID_description: PXFieldState;
	SchPriority: PXFieldState;
	ConstDate: PXFieldState;
	StartDate_Date: PXFieldState;
	EndDate_Date: PXFieldState;
	AMProdItem__DueDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__ProductOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	AMProdItem__ProductOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) AMProdItem__ParentOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	AMProdItem__ParentOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	SchedulingMethod: PXFieldState;
	ScheduleStatus: PXFieldState;
	FirmSchedule: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	SchdID: PXFieldState;
	AMProdItem__ProdDate: PXFieldState;
	AMProdItem__CustomerID: PXFieldState;
	AMProdItem__OrdNbr: PXFieldState;
	AMProdItem__Descr: PXFieldState;
	AMProdItem__StatusID: PXFieldState;
	StartDate_Time: PXFieldState;
	EndDate_Time: PXFieldState;
	@columnConfig({ hideViewLink: true }) AMProdItem__BranchID: PXFieldState;
}

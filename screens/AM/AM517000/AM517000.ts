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

@graphInfo({ graphType: "PX.Objects.AM.LockOrderProcess", primaryView: "ProductionOrderList", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM517000 extends PXScreen {
	@viewInfo({ containerName: "Filter" })
	Filter = createSingle(Filter);
	@viewInfo({ containerName: "Documents" })
	ProductionOrderList = createCollection(ProductionOrderList);
}

export class Filter extends PXView {
	processAction: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class ProductionOrderList extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteId: PXFieldState;
	QtytoProd: PXFieldState;
	QtyComplete: PXFieldState;
	WIPBalance: PXFieldState;
	@columnConfig({ hideViewLink: true }) WIPVarianceAcctID: PXFieldState;
	@columnConfig({ hideViewLink: true }) WIPVarianceSubID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ProjectID: PXFieldState;
	@columnConfig({ hideViewLink: true }) TaskID: PXFieldState;
	CostCodeID: PXFieldState;
	ProductOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProductOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) BranchID: PXFieldState;
}

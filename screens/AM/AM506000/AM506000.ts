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

@graphInfo({ graphType: "PX.Objects.AM.CloseOrderProcess", primaryView: "CompletedOrders", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM506000 extends PXScreen {
	transactionsByProductionOrderInq: PXActionState;

	FinancialPeriod = createSingle(FinancialPeriod);
	@viewInfo({ containerName: "Documents" })
	CompletedOrders = createCollection(AMProdItem);
}

export class FinancialPeriod extends PXView {
	FinancialPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class AMProdItem extends PXView {
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

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

@graphInfo({ graphType: "PX.Objects.AM.MatlWizard1", primaryView: "OpenOrders", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM300010 extends PXScreen {
	filter = createSingle(Filter);
	OpenOrders = createCollection(OpenOrders);
}

export class Filter extends PXView {
	ExcludeUnreleasedBatchQty: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class OpenOrders extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	QtytoProd: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	QtyComplete: PXFieldState;
	QtyRemaining: PXFieldState;
	ProdDate: PXFieldState;
	StatusID: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	CustomerID: PXFieldState;
	OrdTypeRef: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrdNbr: PXFieldState;
	ParentOrderType: PXFieldState;
	ParentOrdID: PXFieldState;
	ProductOrderType: PXFieldState;
	ProductOrdID: PXFieldState;
	InventoryID_description: PXFieldState;
}

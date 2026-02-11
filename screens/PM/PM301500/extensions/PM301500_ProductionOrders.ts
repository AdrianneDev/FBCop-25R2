import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState, GridFastFilterVisibility, linkCommand, PXFieldOptions, controlConfig, featureInstalled, FeaturesSet, GridNoteFilesShowMode, columnConfig } from "client-controls";
import { PM301500 } from "../PM301500";

export interface PM301500_ProductionOrders extends PM301500 { }
@featureInstalled(FeaturesSet.Manufacturing)
export class PM301500_ProductionOrders {
	ProductionOrders = createCollection(AMProdItem);
	CreateProductionOrderFilter = createSingle(CreateProductionOrderFilter);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class AMProdItem extends PXView {
	CreateProdOrder: PXActionState;

	@columnConfig({hideViewLink: true})
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({hideViewLink: true})
	InventoryID: PXFieldState;
	@columnConfig({hideViewLink: true})
	SiteID: PXFieldState;
	@columnConfig({hideViewLink: true})
	LocationID: PXFieldState;
	ProdDate: PXFieldState;
	QtytoProd: PXFieldState;
	QtyComplete: PXFieldState;
	QtyScrapped: PXFieldState;
	QtyRemaining: PXFieldState;
	@columnConfig({hideViewLink: true})
	TaskID: PXFieldState;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState;
}

export class CreateProductionOrderFilter extends PXView {
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState;
	ProdDate: PXFieldState;
	QtytoProd: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState;
	CreateLinkedOrders: PXFieldState<PXFieldOptions.CommitChanges>;
}
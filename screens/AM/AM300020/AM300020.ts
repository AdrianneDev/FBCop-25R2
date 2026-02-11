import {
	PXScreen,
	viewInfo,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.MatlWizard2", primaryView: "ProcessMatl" })
export class AM300020 extends PXScreen {
	ProcessMatl = createCollection(ProcessMatl);
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class ProcessMatl extends PXView {
	Selected: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	QtyReq: PXFieldState;
	MatlQty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyAvail: PXFieldState;
	BaseQtyAvailPjct: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	LocationID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationCD: PXFieldState;
	IsByproduct: PXFieldState;
	InventoryID_description: PXFieldState;
	UnreleasedBatchQty: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState;
	CostCodeID: PXFieldState;
}

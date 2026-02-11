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
	linkCommand,
	IGridColumn,
	GridColumnShowHideMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.MRPDisplay", primaryView: "Detailrecs" })
export class AM400000 extends PXScreen {
	// to remove the buttons from the screen toolbar
	AMRPDetail$RefNbr$Link: PXActionState;
	AMRPDetail$ParentRefNbr$Link: PXActionState;
	AMRPDetail$ProductRefNbr$Link: PXActionState;

	MRPDisplayFilters = createSingle(MRPDisplayFilters);
	Detailrecs = createCollection(AMRPDetail);
	@viewInfo({ containerName: "Create Purchase Order" })
	PlanPurchaseOrderFilter = createSingle(PlanPurchaseFilter);
	@viewInfo({ containerName: "Create Purchase Order" })
	ProcessRecords = createCollection(AMOrderCrossRef);
	@viewInfo({ containerName: "Create Transfer Order" })
	PlanTransferOrderFilter = createSingle(PlanTransferFilter);

	protected detailrecsOnFilterColumns(column: IGridColumn, show: boolean): boolean {
		if (column.field === "CreateSubAssemblyOrders" || column.field === "OrderType" || column.field === "ProdOrdID") {
			column.allowShowHide = show ? GridColumnShowHideMode.Server : GridColumnShowHideMode.False;
			column.visible = show;
		}
		return true;
	}
}

export class MRPDisplayFilters extends PXView {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ProductRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class AMRPDetail extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	InventoryID: PXFieldState;
	InventoryID_InventoryItem_descr: PXFieldState;
	SubItemID: PXFieldState;
	ReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) PlannedRefNbr: PXFieldState;
	SiteID: PXFieldState;
	BaseQty: PXFieldState;
	PromiseDate: PXFieldState;
	ActionDate: PXFieldState;
	Type: PXFieldState;
	ProductManagerID: PXFieldState;
	PreferredVendorID: PXFieldState;
	Vendor__AcctName: PXFieldState;
	ParentInventoryID: PXFieldState;
	ParentSubItemID: PXFieldState;
	ProductInventoryID: PXFieldState;
	ProductSubItemID: PXFieldState;
	SDFlag: PXFieldState;
	RefType: PXFieldState;
	ActionLeadTime: PXFieldState;
	CreatedDateTime: PXFieldState;
	BOMID: PXFieldState;
	BOMRevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) BaseUOM: PXFieldState;
	RecordID: PXFieldState;
	@linkCommand("AMRPDetail$RefNbr$Link") RefNbr: PXFieldState;
	@linkCommand("AMRPDetail$ParentRefNbr$Link") ParentRefNbr: PXFieldState;
	@linkCommand("AMRPDetail$ProductRefNbr$Link") ProductRefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true }) ItemClassID: PXFieldState;
	@columnConfig({ hideViewLink: true }) BranchID: PXFieldState;
	TransferSiteID: PXFieldState;
	KitRevisionID: PXFieldState;
}

export class PlanPurchaseFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
})
export class AMOrderCrossRef extends PXView {
	CreateSubAssemblyOrders: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	Source: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	PlanDate: PXFieldState;
	GroupNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class PlanTransferFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	FromSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

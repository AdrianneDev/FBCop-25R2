import {
	PXScreen,
	viewInfo,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXActionState,
	columnConfig,
	gridConfig,
	GridPreset,
	linkCommand,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.MRPExcept", primaryView: "ExceptRecs" })
export class AM403000 extends PXScreen {
	// to remove the button from the screen toolbar
	AMRPExceptions$RefNbr$Link: PXActionState;

	ExceptRecs = createCollection(ExceptRecs);
}

@gridConfig({
	preset: GridPreset.Inquiry,
})
export class ExceptRecs extends PXView {
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	InventoryID_InventoryItem_descr: PXFieldState;
	Type: PXFieldState;
	RefType: PXFieldState;
	@linkCommand("AMRPExceptions$RefNbr$Link") RefNbr: PXFieldState;
	Qty: PXFieldState;
	RequiredDate: PXFieldState;
	PromiseDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	SupplyQty: PXFieldState;
	@columnConfig({ hideViewLink: true }) SupplySiteID: PXFieldState;
	RecordID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ProductManagerID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ItemClassID: PXFieldState;
	@columnConfig({ hideViewLink: true }) BranchID: PXFieldState;
}

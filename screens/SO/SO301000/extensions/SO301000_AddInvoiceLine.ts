import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_AddInvoiceLine extends SO301000 { }
export class SO301000_AddInvoiceLine {
	AddInvoiceOK: PXActionState;

	@viewInfo({ containerName: "Add Invoice Filter" })
	AddInvoiceFilter = createSingle(AddInvoiceHeader);

	@viewInfo({ containerName: "Add Invoice Details" })
	invoiceSplits = createCollection(AddInvoiceDetails);
}

export class AddInvoiceHeader extends PXView {
	ARDocType: PXFieldState<PXFieldOptions.CommitChanges>;
	ARRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Expand: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class AddInvoiceDetails extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ComponentID: PXFieldState;
	ComponentDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	LotSerialNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	QtyAvailForReturn: PXFieldState;
	QtyToReturn: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState;
	QtyReturned: PXFieldState;
	SOOrderDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrderType: PXFieldState;

	SOOrderNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARTranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARDocType: PXFieldState;

	ARRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	DropShip: PXFieldState;
}
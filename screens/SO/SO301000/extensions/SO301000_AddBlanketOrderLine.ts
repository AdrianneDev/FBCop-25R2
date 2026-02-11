import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_AddBlanketOrderLine extends SO301000 { }
export class SO301000_AddBlanketOrderLine {
	AddBlanketLineOK: PXActionState;

	@viewInfo({ containerName: "Add Blanket Sales Order Line" })
	BlanketSplits = createCollection(OpenBlanketSOLineSplit);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class OpenBlanketSOLineSplit extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	OrderNbr: PXFieldState<PXFieldOptions.Disabled>;

	SchedOrderDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	CustomerOrderNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	BlanketOpenQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxZoneID: PXFieldState;
}
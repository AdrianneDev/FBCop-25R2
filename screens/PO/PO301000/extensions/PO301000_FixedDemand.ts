import {
	PXView,
	PXFieldState,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	linkCommand,
} from "client-controls";
import { PO301000 } from "../PO301000";

export interface PO301000_FixedDemand extends PO301000 { }
export class PO301000_FixedDemand {
	@viewInfo({ containerName: "Demand" })
	FixedDemand = createCollection(SOLineSplit3);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
})
export class SOLineSplit3 extends PXView {
	OrderType: PXFieldState;
	@linkCommand("ViewDemandPnl")
	OrderNbr: PXFieldState;
	ProdOrderType: PXFieldState;
	@linkCommand("ViewDemandPnl")
	ProdOrdID: PXFieldState;
	RequestDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	OrderQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	POUOM: PXFieldState;

	POUOMOrderQty: PXFieldState;
	Active: PXFieldState;
	MatlStatus: PXFieldState;
	QtyRemaining: PXFieldState;
}
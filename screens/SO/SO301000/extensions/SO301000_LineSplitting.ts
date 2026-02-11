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
	linkCommand,
	GridPreset,
} from "client-controls";

import { SO301000 } from "../SO301000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface SO301000_LineSplitting extends SO301000, LineSplittingBase { }
export class SO301000_LineSplitting extends LineSplittingBase {
	SOOrderLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	SOOrderLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(SOLineSplit);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class SOLineSplit extends PXView { // keep in sync with LineSplittingDetails
	@columnConfig({ hideViewLink: true })
	SplitLineNbr: PXFieldState;

	ParentSplitLineNbr: PXFieldState;

	InventoryID: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	SchedOrderDate: PXFieldState;
	SchedShipDate: PXFieldState;
	CustomerOrderNbr: PXFieldState;
	ShipDate: PXFieldState;
	IsAllocated: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Completed: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;

	QtyOnOrders: PXFieldState;
	ShippedQty: PXFieldState;
	ReceivedQty: PXFieldState;
	BlanketOpenQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.Disabled>;

	ExpireDate: PXFieldState;

	POCreate: PXFieldState<PXFieldOptions.CommitChanges>;
	POCreateDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("SOLineSplit$RefNoteID$Link")
	RefNoteID: PXFieldState;
}

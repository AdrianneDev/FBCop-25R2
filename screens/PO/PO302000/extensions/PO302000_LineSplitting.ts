import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	createCollection,
	createSingle,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";

import { PO302000 } from "../PO302000";
import { SplitLotSerialAttributesBase } from "../../../IN/common/line-splitting/panel-split-lot-serial-attributes/panel-split-lot-serial-attributes";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface PO302000_LineSplitting extends PO302000, SplitLotSerialAttributesBase { }
export class PO302000_LineSplitting extends SplitLotSerialAttributesBase {
	POReceiptLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	POReceiptLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	splits = createCollection(POReceiptLineSplit);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoRepaint: ["lotSerialAttributes"],
})
export class POReceiptLineSplit extends PXView { // keep in sync with LineSplittingDetails
	UseAttributesFromFirstLine: PXActionState; //Use Attributes From First Line button on Line Details Panel

	InventoryID: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	MfgLotSerialNbr: PXFieldState;

	@columnConfig({ allowNull: false })
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;

	ReceivedQty: PXFieldState;

	PutAwayQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.Disabled>;

	ExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;;
}

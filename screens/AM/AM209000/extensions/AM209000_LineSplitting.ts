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

import { AM209000 } from "../AM209000";
import { LineSplittingBase } from "../../../IN/common/line-splitting/panel-line-splitting/panel-line-splitting";
import { LineSplittingLotSerOptions, LineSplittingDetails } from "../../../IN/common/line-splitting/views";

export interface AM209000_LineSplitting extends AM209000, LineSplittingBase { }
export class AM209000_LineSplitting extends LineSplittingBase {
	MatlLineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Line Details Header" })
	MatlLineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	@viewInfo({ containerName: "Line Details" })
	ProdMatlSplits = createCollection(AMProdMatlSplit);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class AMProdMatlSplit extends PXView { // keep in sync with LineSplittingDetails class
	IsAllocated: PXFieldState<PXFieldOptions.CommitChanges>;
	SplitLineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	Qty: PXFieldState;

	QtyReceived: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.Disabled>;

	POCreate: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdCreate: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("AMProdMatlSplit$RefNoteID$Link")
	RefNoteID: PXFieldState;
}

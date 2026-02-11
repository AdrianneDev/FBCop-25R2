import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	gridConfig,
	columnConfig,
	GridPreset,
	localizable,
} from "client-controls";

@localizable
export class LSNullText {
	static Split = "<SPLIT>";
}

export class LineSplittingLotSerOptions extends PXView {
	UnassignedQty: PXFieldState<PXFieldOptions.Disabled>;
	Qty: PXFieldState;
	StartNumVal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class LineSplittingDetails extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.Disabled>;

	ExpireDate: PXFieldState;
}

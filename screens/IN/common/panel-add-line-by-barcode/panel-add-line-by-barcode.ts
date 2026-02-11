import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";

export abstract class AddLineByBarcodeBase {
	@viewInfo({ containerName: "Add Line" })
	AddByBarCode = createSingle(INBarCodeItem);
}

export class INBarCodeItem extends PXView {
	BarCode: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.Disabled>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ByOne: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoAddLine: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
}
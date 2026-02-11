import {
	PXScreen,
	PXView,
	PXFieldState,

	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	TextAlign,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POReleaseReceipt",
	primaryView: "Orders",
})
export class PO501000 extends PXScreen {
	@viewInfo({ containerName: "PO Receipts" })
	Orders = createCollection(POReceipt);
}

@gridConfig({
	preset: GridPreset.Processing,
	batchUpdate: true,
})
export class POReceipt extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	ReceiptNbr: PXFieldState;
	ReceiptType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;
	VendorID_Vendor_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	ReceiptDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	WorkgroupID: PXFieldState;

	@columnConfig({ hideViewLink: true, textAlign: TextAlign.Left })
	OwnerID: PXFieldState;
}

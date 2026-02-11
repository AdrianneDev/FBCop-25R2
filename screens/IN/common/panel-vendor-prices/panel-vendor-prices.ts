import {
	PXView,
	PXFieldState,
	createSingle,
	viewInfo,
} from "client-controls";

export abstract class VendorPricesBase {
	@viewInfo({ containerName: "Update Effective Vendor Prices" })
	VendorInventory$UpdatePrice = createSingle(VendorPriceUpdate);
}

export class VendorPriceUpdate extends PXView {
	PendingDate: PXFieldState;
}
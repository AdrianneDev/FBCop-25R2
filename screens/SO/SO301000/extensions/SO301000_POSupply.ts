import {
	PXView,
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

export interface SO301000_POSupply extends SO301000 { }
export class SO301000_POSupply {
	@viewInfo({ containerName: "Purchasing Details" })
	SOLineDemand = createSingle(SOLinePOLink);

	@viewInfo({ containerName: "Purchasing Details" })
	SupplyPOLines = createCollection(LinkedPOLines);

	@viewInfo({ containerName: "Legacy Purchasing Details" })
	posupply = createCollection(LinkedPOLines);
}

export class SOLinePOLink extends PXView {
	POSource: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	POSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
})
export class LinkedPOLines extends PXView {
	Selected: PXFieldState;
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	VendorRefNbr: PXFieldState;
	LineType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	VendorID: PXFieldState;
	VendorID_Vendor_AcctName: PXFieldState;

	PromisedDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	OrderQty: PXFieldState;
	OpenQty: PXFieldState;
	TranDesc: PXFieldState;
}
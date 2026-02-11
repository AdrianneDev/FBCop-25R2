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
import { PO302000 } from "../PO302000";

export interface PO302000_AddTransferOrder extends PO302000 { }
export class PO302000_AddTransferOrder {
	AddTransfer2: PXActionState;

	@viewInfo({ containerName: "Add Transfer Order" })
	openTransfers = createCollection(SOOrderShipment);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class SOOrderShipment extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrderNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ShipmentNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	INTransferInTransitSO__FromSiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	INTransferInTransitSO__ToSiteID: PXFieldState;

	INTransferInTransitSO__TranDate: PXFieldState;
	SOOrder__OrderDesc: PXFieldState;
}
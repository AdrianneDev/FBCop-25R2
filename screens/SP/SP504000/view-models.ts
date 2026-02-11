/* eslint-disable brace-style */
import {
	PXView, columnConfig, linkCommand,
	PXFieldState, PXFieldOptions,
	gridConfig, GridPreset, GridAutoGrowMode, GridNoteFilesShowMode,
	readOnly,
	GridCell,
	controlConfig,
	PXActionState,
} from "client-controls";
import { Messages } from "./SP504000";
import { PayMethodViewBase } from "../sp-paymethod";

export class SOOrderHeader extends PXView {
	OrderNbr: PXFieldState<PXFieldOptions.Disabled>;
	OrderDate: PXFieldState<PXFieldOptions.Disabled>;
	RequestDate: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	CustomerOrderNbr: PXFieldState<PXFieldOptions.Disabled>;
	OrderDesc: PXFieldState<PXFieldOptions.Disabled>;
	OrderQty: PXFieldState<PXFieldOptions.Disabled>;
	OrderType: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineTotal_Text: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot_Text: PXFieldState<PXFieldOptions.Disabled>;
	CuryFreightTot_Text: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal_Text: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrderTotal_Text: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
	CuryFreightTot: PXFieldState<PXFieldOptions.Disabled>;
	CustomerLocationID: PXFieldState<PXFieldOptions.Disabled>;
	ShowShipmentEmptyPanel: PXFieldState;
	ShowAdjustmentEmptyPanel: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: false,
	initNewRow: false,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showRowSelectors: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pageSize: 5,
})
export class SOOrderShipmentView extends PXView {
	@controlConfig({ linkCommand: "printShipment", enabled: false}) ShipmentNbr: PXFieldState;
	@readOnly ShipDate: PXFieldState;
	SOShipment__StatusIsNull: PXFieldState;
	SOShipment__PackageCount: PXFieldState;
	ShipmentQty: PXFieldState;
	@controlConfig({ editCommand: "viewInvoice", displayMode: "id", allowEdit: true }) InvoiceNbr: PXFieldState;
	Tracking: PXFieldState;

	ShippingRefNoteID: PXFieldState<PXFieldOptions.Hidden>;
	OrderType: PXFieldState<PXFieldOptions.Hidden>;
	OrderNbr: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: false,
	initNewRow: false,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showRowSelectors: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pageSize: 5,
})
export class SOAdjustmentView extends PayMethodViewBase {
	@controlConfig({ editCommand: "viewPayment", displayMode: "id", allowEdit: true }) RefNbr: GridCell;
	DocDate: GridCell;
	CuryOrigDocAmt_Text: GridCell;
	Status: GridCell;
	Released: GridCell;
	Voided: GridCell;

	@readOnly CustomerPaymentMethodDescr: GridCell;
	@readOnly @controlConfig({ displayMode: "text", allowEdit: false  }) PaymentMethodID: GridCell;
	get PayMethodDescr() { return this.CustomerPaymentMethodDescr; }
	get PayMethodID() { return this.PaymentMethodID; }

	RecordID: PXFieldState<PXFieldOptions.Hidden>;
	// AdjgDocType: PXFieldState<PXFieldOptions.Hidden>;
	// AdjgRefNbr: PXFieldState<PXFieldOptions.Hidden>;
	// AdjdOrderType: PXFieldState<PXFieldOptions.Hidden>;
	// AdjdOrderNbr: PXFieldState<PXFieldOptions.Hidden>;

	get shortStatus() {
		if (this.Released?.value) return "P";
		if (this.Voided?.value) return "V";
		return "I";
	}
	get shortStatusText() {
		if (this.Released?.value) return Messages.Processed;
		if (this.Voided?.value) return Messages.Voided;
		return Messages.InProcess;
	}
}

export class ShippingAddressView extends PXView {
	Address: PXFieldState;
	Contact: PXFieldState;
}

export class BillingAddressView extends PXView {
	SameAsShippingLabel: PXFieldState;
	Address: PXFieldState;
	Contact: PXFieldState;
}

export class AddressView extends PXView {
	AddressLine1: PXFieldState;
}

export class ShippingContactView extends PXView {
	Phone1: PXFieldState;
	Email: PXFieldState;
	FullName: PXFieldState;
}

export class BillingContactView extends PXView {
	Phone1: PXFieldState;
	Email: PXFieldState;
	FullName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: false,
	initNewRow: false,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showRowSelectors: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pageSize: 20,
})
export class SOLineView extends PXView {
	ViewDetails: PXActionState;

	ImageUrl: GridCell;
	Data: GridCell;
	@linkCommand("viewDetails") SOLine__TranDesc: GridCell;
	@columnConfig({ hideViewLink: true }) SOLine__UOM: GridCell;
	SOLine__OrderQty: GridCell;
	SOLine__CuryUnitPrice_Text: GridCell;
	SOLine__DiscPct: GridCell;
	SOLine__CuryDiscAmt_Text: GridCell;
	SOLine__CuryLineAmt_Text: GridCell;
	SOLine__CuryExtPrice_Text: GridCell;

	get discount() { return (this.SOLine__DiscPct.value ?? 0).toFixed(1); }
	get description() { return this.SOLine__TranDesc.cellText; }
	get discountAmount() { return this.SOLine__CuryDiscAmt_Text.cellText; }
	get unit() { return this.SOLine__UOM.cellText; }
	get quantity() { return this.SOLine__OrderQty.cellText; }
	get unitPrice() { return this.SOLine__CuryUnitPrice_Text.cellText; }
	get totalPrice() { return this.SOLine__CuryLineAmt_Text.cellText; }
	get extPrice() { return this.SOLine__CuryExtPrice_Text.cellText; }
}

@gridConfig({
	preset: GridPreset.Empty,
	initNewRow: false,
	allowInsert: false,
	allowDelete: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	adjustPageSize: true,
	pageSize: 20,
})
export class PackageDetailView extends PXView {
	@columnConfig({ hideViewLink: true }) LineNbr: PXFieldState;
	TrackNumber: PXFieldState;
}

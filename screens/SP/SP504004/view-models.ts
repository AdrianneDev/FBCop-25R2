import {
	autoRefresh, PXView, gridConfig, PXFieldOptions,
	PXFieldState, columnConfig, GridPreset, GridAutoGrowMode, GridNoteFilesShowMode,
	GridCell,
	linkCommand,
	PXActionState
} from "client-controls";
import { PayMethodViewBase } from "../sp-paymethod";

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
})
export class OrderView extends PXView {
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryFreightAmt_Text: PXFieldState;
	ShipVia: PXFieldState<PXFieldOptions.CommitChanges>;
	RequestDate: PXFieldState;
	Resedential: PXFieldState;
	UseCustomerAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipComplete: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipCompleteComment: PXFieldState<PXFieldOptions.Disabled>;

	OrderQty: PXFieldState;
	CuryLineTotal_Text: PXFieldState;
	CuryDiscTot_Text: PXFieldState;
	CuryTaxTotal_Text: PXFieldState;
	CuryOrderTotal_Text: PXFieldState;
	CuryID: PXFieldState;
	CustomerLocationIDList: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationIDRO: PXFieldState;
	OverrideShipment: PXFieldState<PXFieldOptions.CommitChanges>;

	CustomerOrderNbr: PXFieldState;
	OrderDesc: PXFieldState;
	PMInstanceID: PXFieldState;
	CashAccountID: PXFieldState;
	PaymentMethodID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 5,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	adjustPageSize: true,
})
export class ShippingAddressSectionView extends PXView {
	Contact: PXFieldState;
	Address: PXFieldState;
	IsEdited: PXFieldState;
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 5,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	adjustPageSize: true,
})
export class BillingAddressSectionView extends PXView {
	SameAsShipping: PXFieldState;
	SameAsShippingLabel: PXFieldState;
	Contact: PXFieldState;
	Address: PXFieldState;
	IsEdited: PXFieldState;
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
}

export class ShippingInformationSectionView extends PXView {
}

export class PaymentMethodSectionView extends PayMethodViewBase {
	Descr: PXFieldState;
	ExpirationDate: PXFieldState;
	ProceedNoPaymentLabel: PXFieldState;

	get PayMethodDescr() { return this.Descr; }
}

export class ShippingAddressView extends PXView {
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState;
	PostalCode: PXFieldState;
	IsDefaultAddress: PXFieldState;
}

export class BillingAddressView extends PXView {
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState;
	PostalCode: PXFieldState;
	IsDefaultAddress: PXFieldState;
}

export class ShippingContactView extends PXView {
	FullName: PXFieldState;
	Attention: PXFieldState;
	Phone1: PXFieldState;
	Email: PXFieldState;
	IsDefaultContact: PXFieldState;
}

export class BillingContactView extends PXView {
	FullName: PXFieldState;
	Attention: PXFieldState;
	Phone1: PXFieldState;
	Email: PXFieldState;
	IsDefaultContact: PXFieldState;
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
export class SOLine extends PXView {
	ViewDetails: PXActionState;

	ImageUrl: GridCell;
	Data: GridCell;
	@linkCommand("viewDetails") Descr: GridCell;

	@columnConfig({ hideViewLink: true }) SOLine__UOM: GridCell;
	SOLine__OrderQty: GridCell;
    SOLine__CuryUnitPrice_Text: GridCell;
    SOLine__DiscPct: GridCell;
    SOLine__CuryDiscAmt_Text: GridCell;
    SOLine__CuryLineAmt_Text: GridCell;
	SOLine__CuryExtPrice_Text: GridCell;

	get discount() { return (this.SOLine__DiscPct.value ?? 0).toFixed(1); }
	get discountAmount() { return this.SOLine__CuryDiscAmt_Text.cellText; }
	get description() { return this.Descr.cellText; }
	get unit() { return this.SOLine__UOM.cellText; }
	get quantity() { return this.SOLine__OrderQty.cellText; }
	get unitPrice() { return this.SOLine__CuryUnitPrice_Text.cellText; }
	get totalPrice() { return this.SOLine__CuryLineAmt_Text.cellText; }
	get extPrice() { return this.SOLine__CuryExtPrice_Text.cellText; }
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: false,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showRowSelectors: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pageSize: 5,
})
export class InventoryItemView extends PXView {
	SPInventoryItem__Descr: PXFieldState;
	@linkCommand("viewDetails") InventoryCD: PXFieldState;

	Qty: PXFieldState;
	@autoRefresh @columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	SPInventoryItem__CuryUnitPriceWithSymbol: PXFieldState;
	SPInventoryItem__ImageUrl: PXFieldState;
	SPInventoryItem__CuryUnitPriceWithSymbolTotal: PXFieldState<PXFieldOptions.Hidden>;
}

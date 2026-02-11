import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	gridConfig,
	GridPreset,
	TextAlign,
	GridAutoGrowMode,
	GridPagerMode,
} from "client-controls";
import { shortListGridConfig } from "../common/bc-gridconfig";

export class Bindings extends PXView {
	ConnectorType: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	BindingName: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	IsDefault: PXFieldState;
}

export class CurrentBindingAmazon extends PXView {
	AmazonFulfilledOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ReleaseInvoices: PXFieldState;
	Region: PXFieldState<PXFieldOptions.CommitChanges>;
	Marketplace: PXFieldState<PXFieldOptions.CommitChanges>;
	SellerPartnerId: PXFieldState<PXFieldOptions.CommitChanges>;
	SellerFulfilledOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippingAccount: PXFieldState;
	ShippingPriceItem: PXFieldState;
	ShippingSubAccount: PXFieldState;
	ShipViaCodesToCarriers: PXFieldState;
	ShipViaCodesToCarrierServices: PXFieldState;
	Warehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultTaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	SellerReturnOrderType: PXFieldState;
	AmazonReturnOrderType: PXFieldState;
	ReturnChargeItem: PXFieldState;
	TransferOrderType: PXFieldState;
	EarliestShipmentDate: PXFieldState;
	CarriersToShipViaCodes: PXFieldState;
	SourceWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	SettlementReportStartDate: PXFieldState;
}

export class CurrentBinding extends PXView {
	LocaleName: PXFieldState;
	BindingAdministrator: PXFieldState;
	AllowedStores: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
})
export class Entities extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 180 })
	@linkCommand("Navigate")
	EntityType: PXFieldState;

	Direction: PXFieldState<PXFieldOptions.CommitChanges>;
	PrimarySystem: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		width: 120,
		textAlign: TextAlign.Left,
	})
	MaxAttemptCount: PXFieldState;
}


@shortListGridConfig
export class ExportLocations extends PXView {
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	adjustPageSize: true,
	autoRepaint: ["FeeMappings"],
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	preset: GridPreset.Details,
})
export class PaymentMethods extends PXView {
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	StorePaymentMethod: PXFieldState;

	@columnConfig({ hideViewLink: true, })
	StoreCurrency: PXFieldState<PXFieldOptions.CommitChanges>;

	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReleasePayments: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	autoAdjustColumns: true,
})
export class FeeMappings extends PXView {
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	FeeType: PXFieldState<PXFieldOptions.CommitChanges>;
	FeeDescription: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryDescription: PXFieldState;
	TransactionType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.False
})
export class ShippingMappings extends PXView {
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippingZone: PXFieldState;
	ShippingMethod: PXFieldState;
	CarrierID: PXFieldState;
	ZoneID: PXFieldState;
	ShipTermsID: PXFieldState;
}

export class CurrentStore extends PXView {
	AvailabilityCalcRule: PXFieldState<PXFieldOptions.CommitChanges>;
	WarehouseMode: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderTimeZone: PXFieldState;
	PostDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	SyncOrdersFrom: PXFieldState;
	GiftWrappingItemID: PXFieldState;
	GuestCustomerID: PXFieldState;
	TaxSynchronization: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultTaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
}

@shortListGridConfig
export class TaxMappings extends PXView {
	Active: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("NavigateToTaxZone")
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("NavigateToTax")
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxZoneBasedOn: PXFieldState;
	CountryID: PXFieldState;
}

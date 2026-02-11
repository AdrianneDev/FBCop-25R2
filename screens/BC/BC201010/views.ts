import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	gridConfig,
	GridPagerMode,
	TextAlign,
	GridPreset,
	GridAutoGrowMode,
} from "client-controls";

export class Bindings extends PXView {
	ConnectorType: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	BindingName: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	IsDefault: PXFieldState;
}

export class CurrentBindingShopify extends PXView {
	ShopifyApiBaseUrl: PXFieldState<PXFieldOptions.CommitChanges>;
	ShopifyAccessToken: PXFieldState<PXFieldOptions.CommitChanges>;
	StoreSharedSecret: PXFieldState<PXFieldOptions.CommitChanges>;
	ShopifyStorePlan: PXFieldState;
	ShopifyStoreUrl: PXFieldState;
	ShopifyApiVersion: PXFieldState;
	CombineCategoriesToTags: PXFieldState;
	MandatoryExportPaymentTerms: PXFieldState;
	ShopifyPOS: PXFieldState<PXFieldOptions.CommitChanges>;
	POSDirectOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	POSShippingOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	POSDirectExchangeOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	POSShippingExchangeOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	QuoteOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ExportQuoteOrderTypes: PXFieldState<PXFieldOptions.CommitChanges>;
	EarliestQuoteOrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ImportCompanyContactsAsCustomers: PXFieldState;
}

export class CurrentStore extends PXView {
	DefaultStoreCurrency: PXFieldState;
	SupportedCurrencies: PXFieldState;
	StoreTimeZone: PXFieldState;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerTemplate: PXFieldState;
	CustomerNumberingID: PXFieldState;
	LocationTemplate: PXFieldState;
	LocationNumberingID: PXFieldState;
	InventoryNumberingID: PXFieldState;
	InventoryTemplate: PXFieldState;
	ProductItemClassSubstitutionListID: PXFieldState<PXFieldOptions.CommitChanges>;
	GuestCustomerID: PXFieldState;
	MultipleGuestAccounts: PXFieldState;
	StockItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	NonStockItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Visibility: PXFieldState<PXFieldOptions.CommitChanges>;
	Availability: PXFieldState<PXFieldOptions.CommitChanges>;
	NotAvailMode: PXFieldState<PXFieldOptions.CommitChanges>;
	AvailabilityCalcRule: PXFieldState<PXFieldOptions.CommitChanges>;
	WarehouseMode: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OtherSalesOrderTypes: PXFieldState;
	ReturnOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	RefundAmountItemID: PXFieldState;
	ReasonCode: PXFieldState;
	OrderTimeZone: PXFieldState;
	PostDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	ImportOrderRisks: PXFieldState<PXFieldOptions.CommitChanges>;
	HoldOnRiskStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	GiftCertificateItemID: PXFieldState;
	SyncOrdersFrom: PXFieldState;
	SyncOrderNbrToStore: PXFieldState;
	AllowOrderEdit: PXFieldState;
	TaxSynchronization: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultTaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	UseAsPrimaryTaxZone: PXFieldState;
	TaxSubstitutionListID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCategorySubstitutionListID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippingCarrierListID: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentTermsListID: PXFieldState<PXFieldOptions.CommitChanges>;
	UseExternalCurrencyForOrderImport: PXFieldState<PXFieldOptions.CommitChanges>;
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

	@linkCommand("Navigate")
	EntityType: PXFieldState;

	Direction: PXFieldState<PXFieldOptions.CommitChanges>;
	PrimarySystem: PXFieldState<PXFieldOptions.CommitChanges>;
	ImportRealTimeStatus: PXFieldState;
	ExportRealTimeStatus: PXFieldState;
	RealTimeMode: PXFieldState;

	@columnConfig({
		width: 120,
		textAlign: TextAlign.Left,
	})
	MaxAttemptCount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	initNewRow: true,
	syncPosition: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	allowFilter: true,
	actionsConfig: { adjust: { hidden: false }, exportToExcel: { hidden: false } },
})
export class ExportLocations extends PXView {
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorType: "qp-drop-down" })
	ExternalLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	initNewRow: true,
	syncPosition: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	allowFilter: true,
	actionsConfig: { adjust: { hidden: false }, exportToExcel: { hidden: false } },
})
export class ImportLocations extends PXView {

	@columnConfig({ editorType: "qp-drop-down" })
	ExternalLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

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
	ProcessRefunds: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	autoAdjustColumns: true,
})
export class FeeMappings extends PXView {
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	FeeType: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryDescription: PXFieldState;
	TransactionType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class ShippingMappings extends PXView {
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippingZone: PXFieldState;
	ShippingMethod: PXFieldState;
	CarrierID: PXFieldState;
	ZoneID: PXFieldState;
	ShipTermsID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	syncPosition: true,
	autoAdjustColumns: true,
	allowInsert: false,
	allowDelete: false,
	actionsConfig: { adjust: { hidden: false }, exportToExcel: { hidden: false } },
})
export class PaymentTerms extends PXView {
	PaymentTermsName: PXFieldState;
	PaymentTermsType: PXFieldState;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
}

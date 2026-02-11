import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	PXPageLoadBehavior,
	PXView,
	PXFieldState,
	gridConfig,
	CurrencyInfo,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridPreset,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	headerDescription,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.QuoteMaint",
	primaryView: "Quote",
	pageLoadBehavior: PXPageLoadBehavior.SearchSavedKeys,
	showUDFIndicator: true,
	bpEventsIndicator: true,
})
export class CR304500 extends PXScreen {
	ViewMainOnMap: PXActionState;
	ViewBillingOnMap: PXActionState;
	ViewShippingOnMap: PXActionState;

	@viewInfo({ containerName: "Quote Summary" })
	Quote = createSingle(CRQuoteHeader);

	@viewInfo({ containerName: "Quote" })
	QuoteCurrent = createSingle(CRQuote);

	@viewInfo({ containerName: "Details" })
	Products = createCollection(CROpportunityProducts);

	@viewInfo({ containerName: "Estimates" })
	OpportunityEstimateRecords = createCollection(AMEstimateReference);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(CRTaxTran);

	@viewInfo({ containerName: "Discounts" })
	DiscountDetails = createCollection(CROpportunityDiscountDetail);

	currencyinfo = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Shipping Options" })
	CarrierData = createSingle(CarrierData);

	@handleEvent(CustomEventType.RowSelected, { view: "Products" })
	onProductSelected(args: RowSelectedHandlerArgs<PXViewCollection<CROpportunityProducts>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model?.ConfigureEntry) {
			model.ConfigureEntry.enabled = !!args.viewModel.activeRow?.IsConfigurable?.value;
		}
	}

	@handleEvent(CustomEventType.RowSelected, { view: "OpportunityEstimateRecords" })
	onOpportunityEstimateSelected(args: RowSelectedHandlerArgs<PXViewCollection<AMEstimateReference>>) {
		const model = args.viewModel;

		if (model?.QuickEstimate) {
			model.QuickEstimate.enabled = !!args.viewModel.activeRow?.EstimateID?.value;
		}

		if (model?.RemoveEstimate) {
			model.RemoveEstimate.enabled = !!args.viewModel.activeRow;
		}
	}
}


export class CRQuoteHeader extends PXView {
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	OpportunityID: PXFieldState;
	QuoteNbr: PXFieldState;
	IsPrimary: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	DocumentDate: PXFieldState;
	ExpirationDate: PXFieldState;
	@headerDescription
	Subject: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "CreateContactRedirect" })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualTotalEntry: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineDiscountTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscTot: PXFieldState<PXFieldOptions.CommitChanges>;
	AMCuryEstimateTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryProductsAmount: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CRQuote extends PXView {
	AllowOverrideContactAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalRef: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRegistrationID: PXFieldState;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalTaxExemptionNumber: PXFieldState;
	AvalaraCustomerUsageType: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	CarrierID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipTermsID: PXFieldState;
	ShipZoneID: PXFieldState;
	FOBPointID: PXFieldState;
	Resedential: PXFieldState;
	SaturdayDelivery: PXFieldState;
	Insurance: PXFieldState;
	ShipComplete: PXFieldState;
	CuryOrderDiscTotal: PXFieldState;
	CreatedDateTime: PXFieldState;
	RLastModifiedDateTime: PXFieldState;
}

export class CarrierData extends PXView {
	AdditionalHandling: PXFieldState;
	LiftGate: PXFieldState;
	InsideDelivery: PXFieldState;
	LimitedAccess: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	statusField: "TextForProductsGrid",
	initNewRow: true,
	adjustPageSize: true,
})
export class CROpportunityProducts extends PXView {
	Products$ImportAction: PXActionState;
	ShowMatrixPanel: PXActionState;
	ConfigureEntry: PXActionState;

	IsConfigurable: PXFieldState;
	AMParentLineNbr: PXFieldState;
	AMIsSupplemental: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	IsFree: PXFieldState<PXFieldOptions.CommitChanges>;
	BillingRule: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Quantity: PXFieldState<PXFieldOptions.CommitChanges>;
	EstimatedDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipLineDiscounts: PXFieldState;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	POCreate: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	SortOrder: PXFieldState;
	LineNbr: PXFieldState;
	AMConfigKeyID: PXFieldState<PXFieldOptions.CommitChanges>;
	TextForProductsGrid: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDelete: true,
})
export class AMEstimateReference extends PXView {
	AddEstimate: PXActionState;
	QuickEstimate: PXActionState;
	RemoveEstimate: PXActionState;

	@columnConfig({ hideViewLink: true })
	AMEstimateItem__BranchID: PXFieldState;
	AMEstimateItem__InventoryCD: PXFieldState;
	AMEstimateItem__ItemDesc: PXFieldState;
	AMEstimateItem__SiteID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AMEstimateItem__UOM: PXFieldState;
	OrderQty: PXFieldState;
	CuryUnitPrice: PXFieldState;
	CuryExtPrice: PXFieldState;
	@linkCommand("ViewEstimate")
	EstimateID: PXFieldState;
	RevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AMEstimateItem__OwnerID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AMEstimateItem__EngineerID: PXFieldState;
	AMEstimateItem__RequestDate: PXFieldState;
	AMEstimateItem__PromiseDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AMEstimateItem__EstimateClassID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDelete: true,
	fastFilterByAllFields: false,
})
export class CRTaxTran extends PXView {
	@columnConfig({ allowUpdate: false }) TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false }) TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;
	CuryExemptedAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDelete: true,
	fastFilterByAllFields: false,
})
export class CROpportunityDiscountDetail extends PXView {
	SkipDiscount: PXFieldState;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState;
	IsManual: PXFieldState;
	CuryDiscountableAmt: PXFieldState;
	DiscountableQty: PXFieldState;
	CuryDiscountAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountPct: PXFieldState<PXFieldOptions.CommitChanges>;
	FreeItemID: PXFieldState;
	FreeItemQty: PXFieldState;
	ExtDiscCode: PXFieldState;
	Description: PXFieldState;
}

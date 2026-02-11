import {
	PXView,
	PXFieldState,
	gridConfig,
	headerDescription,
	CurrencyInfo,
	disabled,

	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	PXActionState,
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	GridColumnGeneration,
	TextAlign,
	GridPreset,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.OpportunityMaint",
	primaryView: "Opportunity",
	udfTypeField: "ClassID",
	showUDFIndicator: true,
	bpEventsIndicator: true,
})
export class CR304000 extends PXScreen {
	ViewMainOnMap: PXActionState;
	ViewBillingOnMap: PXActionState;
	ViewShippingOnMap: PXActionState;

	@viewInfo({ containerName: "Opportunity Summary" })
	Opportunity = createSingle(CROpportunityHeader);

	@viewInfo({ containerName: "Details" })
	Products = createCollection(CROpportunityProducts);

	@viewInfo({ containerName: "Quotes" })
	Quotes = createCollection(CRQuote);

	@viewInfo({ containerName: "Estimates" })
	OpportunityEstimateRecords = createCollection(AMEstimateReference);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(CRTaxTran);

	@viewInfo({ containerName: "Discounts" })
	DiscountDetails = createCollection(CROpportunityDiscountDetail);

	@viewInfo({ containerName: "Opportunity" })
	OpportunityCurrent = createSingle(CROpportunity);

	currencyinfo = createSingle(CurrencyInfo);

	@handleEvent(CustomEventType.RowSelected, { view: "Products" })
	onProductSelected(args: RowSelectedHandlerArgs<PXViewCollection<CROpportunityProducts>>) {
		const model = args.viewModel;

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

export class CROpportunityHeader extends PXView {
	OpportunityID: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	StageID: PXFieldState<PXFieldOptions.CommitChanges>;
	CloseDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Subject: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "CreateContactRedirect" })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualTotalEntry: PXFieldState<PXFieldOptions.CommitChanges>;
	AMCuryEstimateTotal: PXFieldState<PXFieldOptions.Disabled>;
	QuotedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineDiscountTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscTot: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	TotalAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryProductsAmount: PXFieldState<PXFieldOptions.Disabled>;
	ChkServiceManagement: PXFieldState;
}

export class CROpportunity extends PXView {
	AllowOverrideContactAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	Resolution: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideSalesTerritory: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTerritoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ParentBAccountID: PXFieldState;
	LanguageID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
	CuryWgtAmount: PXFieldState<PXFieldOptions.Disabled>;
	ClosingDate: PXFieldState<PXFieldOptions.Disabled>;
	Source: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CampaignSourceID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LeadID: PXFieldState<PXFieldOptions.Disabled>;
	Details: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalRef: PXFieldState<PXFieldOptions.CommitChanges>;
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
	AssignDate: PXFieldState;
	CuryOrderDiscTotal: PXFieldState;
	LastModifiedDateTime: PXFieldState;
	CreatedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
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
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	SortOrder: PXFieldState;
	LineNbr: PXFieldState;
	AMConfigKeyID: PXFieldState<PXFieldOptions.CommitChanges>;
}


@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
})
export class CRQuote extends PXView {
	CreateQuote: PXActionState;
	CopyQuote: PXActionState;
	PrimaryQuote: PXActionState;

	@linkCommand("PrimaryQuote")
	@columnConfig({ allowNull: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsPrimary: PXFieldState;
	@linkCommand("ViewQuote")
	QuoteNbr: PXFieldState;
	QuoteType: PXFieldState;
	Subject: PXFieldState;
	Status: PXFieldState;
	DocumentDate: PXFieldState;
	ExpirationDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	ManualTotalEntry: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	CuryAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	CuryDiscTot: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	CuryTaxTotal: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	CuryProductsAmount: PXFieldState;
	BAccountID: PXFieldState;
	LocationID: PXFieldState;
	ContactID: PXFieldState;
	@linkCommand("ViewProject")
	QuoteProjectID: PXFieldState;
	CuryCostTotal: PXFieldState;
	CuryGrossMarginAmount: PXFieldState;
	GrossMarginPct: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class AMEstimateReference extends PXView {
	AddEstimate: PXActionState;
	QuickEstimate: PXActionState;
	RemoveEstimate: PXActionState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	AMEstimateItem__BranchID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	AMEstimateItem__InventoryCD: PXFieldState;
	@columnConfig({ allowUpdate: false })
	AMEstimateItem__ItemDesc: PXFieldState;
	@columnConfig({ allowUpdate: false })
	AMEstimateItem__SiteID: PXFieldState;
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	AMEstimateItem__UOM: PXFieldState;
	@columnConfig({ allowUpdate: false })
	OrderQty: PXFieldState;
	@columnConfig({ allowUpdate: false })
	CuryUnitPrice: PXFieldState;
	@columnConfig({ allowUpdate: false })
	CuryExtPrice: PXFieldState;
	@linkCommand("ViewEstimate")
	@columnConfig({ allowUpdate: false })
	EstimateID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	RevisionID: PXFieldState;
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	TaxCategoryID: PXFieldState;
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	AMEstimateItem__OwnerID: PXFieldState;
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	AMEstimateItem__EngineerID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	AMEstimateItem__RequestDate: PXFieldState;
	@columnConfig({ allowUpdate: false })
	AMEstimateItem__PromiseDate: PXFieldState;
	@columnConfig({ allowUpdate: false, hideViewLink: true })
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
	adjustPageSize: true
})
export class CROpportunityDiscountDetail extends PXView {
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	SkipDiscount: PXFieldState;
	@columnConfig({ allowFastFilter: false })
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowFastFilter: false })
	DiscountSequenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowFastFilter: false })
	Type: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsManual: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	CuryDiscountableAmt: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	DiscountableQty: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	CuryDiscountAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Right })
	DiscountPct: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowFastFilter: false })
	FreeItemID: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	FreeItemQty: PXFieldState;
	@columnConfig({ allowFastFilter: false })
	ExtDiscCode: PXFieldState;
	@columnConfig({ allowFastFilter: false })
	Description: PXFieldState;
}

export class ContactFilter extends PXView {
	FirstName: PXFieldState<PXFieldOptions.CommitChanges>;
	LastName: PXFieldState<PXFieldOptions.CommitChanges>;
	FullName: PXFieldState<PXFieldOptions.CommitChanges>;
	Salutation: PXFieldState<PXFieldOptions.CommitChanges>;
	Phone1Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Phone1: PXFieldState<PXFieldOptions.CommitChanges>;
	Phone2Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Phone2: PXFieldState<PXFieldOptions.CommitChanges>;
	Email: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactClass: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class EntryHeader extends PXView {
	TemplateItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ColAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	RowAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
}

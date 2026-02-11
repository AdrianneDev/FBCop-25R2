import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, PXView, PXFieldState, gridConfig,
	PXFieldOptions, columnConfig, controlConfig, GridPreset, headerDescription
} from "client-controls";

@graphInfo({graphType: "PX.Objects.AR.ARPriceWorksheetMaint", primaryView: "Document", showUDFIndicator: true  })
export class AR202010 extends PXScreen {
   	@viewInfo({containerName: "Worksheet Summary"})
	Document = createSingle(ARPriceWorksheet);
   	@viewInfo({containerName: "Sales Prices"})
	Details = createCollection(ARPriceWorksheetDetail);

   	@viewInfo({containerName: "Copy Prices"})
	CopyPricesSettings = createSingle(CopyPricesFilter);
   	@viewInfo({containerName: "Calculate Pending Prices"})
	CalculatePricesSettings = createSingle(CalculatePricesFilter);
}


export class ARPriceWorksheet extends PXView {

	RefNbr: PXFieldState;
	Status: PXFieldState;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	@controlConfig({ rows: 2 })
	Descr: PXFieldState<PXFieldOptions.Multiline>;

	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	OverwriteOverlapping: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPromotional: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	SkipLineDiscounts: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	IsFairValue: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	IsProrated: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	Discountable: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true, adjustPageSize: true })
export class ARPriceWorksheetDetail extends PXView {

	ShowItems: PXActionState;
	CopyPrices: PXActionState;
	CalculatePrices: PXActionState;

	PriceType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PriceCode: PXFieldState;
	AlternateID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges >;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	BreakQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CurrentPrice: PXFieldState;
	PendingPrice: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;

	SkipLineDiscounts: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;
}

export class CopyPricesFilter extends PXView {

	SourcePriceType: PXFieldState<PXFieldOptions.CommitChanges>;
	SourcePriceCode: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPromotional: PXFieldState<PXFieldOptions.CommitChanges>;
	IsFairValue: PXFieldState<PXFieldOptions.CommitChanges>;
	IsProrated: PXFieldState<PXFieldOptions.CommitChanges>;
	Discountable: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationPriceType: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationPriceCode: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	RateTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CurrencyDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CalculatePricesFilter extends PXView {

	CorrectionPercent: PXFieldState;
	Rounding: PXFieldState;
	UpdateOnZero: PXFieldState<PXFieldOptions.NoLabel>;
	PriceBasis: PXFieldState;
	BaseCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, controlConfig, columnConfig, PXActionState,
	gridConfig, GridPreset, headerDescription
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APPriceWorksheetMaint", primaryView: "Document", showUDFIndicator: true })
export class AP202010 extends PXScreen {

	AddSelectedItems: PXActionState;
	AddAllItems: PXActionState;

	Document = createSingle(APPriceWorksheet);
	Details = createCollection(APPriceWorksheetDetail);
	CopyPricesSettings = createSingle(CopyPricesFilter);
	CalculatePricesSettings = createSingle(CalculatePricesFilter);

}

export class APPriceWorksheet extends PXView {

	RefNbr: PXFieldState;
	Status: PXFieldState;

	@controlConfig({ rows: 3 })
	@headerDescription
	Descr: PXFieldState<PXFieldOptions.Multiline>;

	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPromotional: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	OverwriteOverlapping: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true
})
export class APPriceWorksheetDetail extends PXView {

	ShowItems: PXActionState;
	CopyPrices: PXActionState;
	CalculatePrices: PXActionState;

	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	AlternateID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	BreakQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CurrentPrice: PXFieldState;
	PendingPrice: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState;

}

export class CopyPricesFilter extends PXView {

	SourceVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPromotional: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	RateTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CurrencyDate: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class CalculatePricesFilter extends PXView {

	CorrectionPercent: PXFieldState;
	Rounding: PXFieldState;
	UpdateOnZero: PXFieldState;
	PriceBasis: PXFieldState;
	BaseCuryID: PXFieldState<PXFieldOptions.CommitChanges>;

}

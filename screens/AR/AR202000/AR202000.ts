import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig,
	PXFieldOptions, columnConfig, GridPreset
} from "client-controls";

@graphInfo({graphType: "PX.Objects.AR.ARSalesPriceMaint", primaryView: "Filter" })
export class AR202000 extends PXScreen {

   	@viewInfo({containerName: "Selection"})
	Filter = createSingle(ARSalesPriceFilter);
   	@viewInfo({containerName: "Sales Prices"})
	Records = createCollection(ARSalesPrice);
}

export class ARSalesPriceFilter extends PXView {
	PriceType: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceCode: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	EffectiveAsOfDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassCD: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryPriceClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyWorkGroup: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true
})
export class ARSalesPrice extends PXView {

	@columnConfig({ hideViewLink: true })
	PriceType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PriceCode: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AlternateID: PXFieldState<PXFieldOptions.CommitChanges>;


	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	IsPromotionalPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipLineDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	IsFairValue: PXFieldState<PXFieldOptions.CommitChanges>;
	IsProrated: PXFieldState<PXFieldOptions.CommitChanges>;
	Discountable: PXFieldState<PXFieldOptions.CommitChanges>;
	BreakQty: PXFieldState;
	SalesPrice: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxID: PXFieldState;

	TaxCalcMode: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;

	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpirationDate: PXFieldState;
}

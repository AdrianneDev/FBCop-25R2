import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, controlConfig, columnConfig,
	gridConfig, PXFieldOptions, GridPreset, GridAutoGrowMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.TX.TaxZoneMaint", primaryView: "TxZone", showUDFIndicator: true })
export class TX206000 extends PXScreen {

	TxZone = createSingle(TaxZone);
	Details = createCollection(TaxZoneDet);
	TxZoneCurrent = createSingle(TaxZone2);
	TaxZoneAddressMappings = createCollection(TaxZoneAddressMapping);

}

export class TaxZone extends PXView {

	TaxZoneID: PXFieldState;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	DfltTaxCategoryID: PXFieldState;

	IsExternal: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	TaxPluginID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalAPTaxType: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxID: PXFieldState;
	ShowTaxTabExpr: PXFieldState;

}

export class TaxZone2 extends PXView {

	MappingType: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Details })
export class TaxZoneDet extends PXView {
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>; // TODO: There is no CommitChanges for this field in the old UI but beause of the incorrect test, that put here incorrect value and do not commit the changes we drop other values on the form and it is hard to fix this.
	Tax__Descr: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__TaxCalcRule: PXFieldState;
	Tax__TaxApplyTermsDisc: PXFieldState;
	Tax__DirectTax: PXFieldState;

}


@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill})
export class TaxZoneAddressMapping extends PXView {

	@columnConfig({ hideViewLink: true })
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	StateID: PXFieldState<PXFieldOptions.CommitChanges>;

	FromPostalCode: PXFieldState<PXFieldOptions.CommitChanges>;
	ToPostalCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;

}

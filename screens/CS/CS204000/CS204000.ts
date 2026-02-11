import {
	PXScreen,
	graphInfo,
	PXView,
	createCollection,
	PXFieldState,
	createSingle,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	GridPagerMode,
	GridNoteFilesShowMode,
	controlConfig,
	ISelectorControlConfig
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CS.CountryMaint",
	primaryView: "Country",
})
export class CS204000 extends PXScreen {
	Country = createSingle(Country);
	CountryStates = createCollection(CountryStates);
}

export class Country extends PXView {
	CountryID: PXFieldState;
	Description: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	AddressValidatorPluginID: PXFieldState;
	AutoOverrideAddress: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	SalesTerritoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryValidationMethod: PXFieldState;
	CountryRegexp: PXFieldState;
	StateValidationMethod: PXFieldState;
	ZipCodeMask: PXFieldState;
	ZipCodeRegexp: PXFieldState;
	LanguageID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class CountryStates extends PXView {
	StateID: PXFieldState;
	Name: PXFieldState;
	SalesTerritoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTerritoryID_Description: PXFieldState;
	StateRegexp: PXFieldState<PXFieldOptions.Hidden>;
	NonTaxable: PXFieldState<PXFieldOptions.Hidden>;
	LocationCode: PXFieldState;
}

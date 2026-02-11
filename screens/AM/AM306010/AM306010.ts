import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	CurrencyInfo,
	controlConfig,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.ConfigurationEntryForAPI", primaryView: "Results" })
export class AM306010 extends PXScreen {
	@viewInfo({ containerName: "Results" })
	Results = createSingle(AMConfigurationResults);
	// Classic UI has the following extra view
	//@viewInfo({ containerName: "CurrentResults" })
	//CurrentResults = createSingle(AMConfigurationResults2);
	@viewInfo({ containerName: "Features" })
	CurrentFeatures = createCollection(AMConfigResultsFeature);
	@viewInfo({ containerName: "Attributes" })
	Attributes = createCollection(AMConfigResultsAttribute);
	@viewInfo({ containerName: "Options" })
	Options = createCollection(AMConfigResultsOption);
	_AMConfigurationResults_CurrencyInfo_ = createSingle(CurrencyInfo);
}

export class AMConfigurationResults extends PXView {
	ConfigResultsID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ConfigurationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Revision: PXFieldState;
	@controlConfig({ allowEdit: true }) SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Completed: PXFieldState;
	IsConfigurationTesting: PXFieldState;
	OrdTypeRef: PXFieldState;
	OrdNbrRef: PXFieldState;
	OrdLineRef: PXFieldState;
	OpportunityQuoteID: PXFieldState;
	OpportunityLineNbr: PXFieldState;
	ProdOrderType: PXFieldState;
	ProdOrderNbr: PXFieldState;
	CuryID: PXFieldState;
	DisplayPrice: PXFieldState;
	@controlConfig({ allowEdit: true }) CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true }) CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

// Classic UI has the following extra view
//export class AMConfigurationResults2 extends PXView {
//}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMConfigResultsFeature extends PXView {
	AMConfigurationFeature__Label: PXFieldState;
	MinSelection: PXFieldState;
	MaxSelection: PXFieldState;
	MinQty: PXFieldState;
	MaxQty: PXFieldState;
	LotQty: PXFieldState;
	TotalQty: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMConfigResultsAttribute extends PXView {
	ConfigResultsID: PXFieldState;
	ConfigurationID: PXFieldState;
	Revision: PXFieldState;
	AttributeLineNbr: PXFieldState;
	AMConfigurationAttribute__Label: PXFieldState;
	AMConfigurationAttribute__Descr: PXFieldState;
	Required: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	topBarItems: {
		ShowAll: { index: 0, config: { commandName: "ShowAll", text: Labels.ShowAll } },
	},
})
export class AMConfigResultsOption extends PXView {
	ConfigResultsID: PXFieldState;
	FeatureLineNbr: PXFieldState;
	OptionLineNbr: PXFieldState;
	IsRemovable: PXFieldState;
	Included: PXFieldState<PXFieldOptions.CommitChanges>;
	AMConfigurationOption__Label: PXFieldState;
	AMConfigurationOption__Descr: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
}

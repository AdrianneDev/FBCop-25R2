import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	treeConfig,
	GridPreset,
	CurrencyInfo,
	ControlParameter,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.ConfigurationEntry", primaryView: "Results" })
export class AM306000 extends PXScreen {
	@viewInfo({ containerName: "Features" })
	Features = createCollection(AMConfigTreeNode);
	@viewInfo({ containerName: "Results" })
	Results = createSingle(AMConfigurationResults);
	// Classic UI has the following extra view
	//@viewInfo({ containerName: "CurrentResults" })
	//CurrentResults = createSingle(AMConfigurationResults2);
	@viewInfo({ containerName: "Attributes" })
	Attributes = createCollection(AMConfigResultsAttribute);
	@viewInfo({ containerName: "Feature", parameters: [new ControlParameter("lineNbr", "Features", "LineNbr")] })
	CurrentFeature = createSingle(AMConfigResultsFeature);
	@viewInfo({ containerName: "Selected Option" })
	CurrentOption = createSingle(AMConfigResultsOption);
	@viewInfo({ containerName: "Options" })
	Options = createCollection(AMConfigResultsOption2);
	_AMConfigurationResults_CurrencyInfo_ = createSingle(CurrencyInfo);
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	iconField: "Icon",
	toolTipField: "ToolTip",
	idField: ["LineNbr", "OptionLineNbr"],
	valueField: "LineNbr",
	textField: "Label",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	openedLayers: 4,
	autoRepaint: ["CurrentFeature", "Options"],
})
export class AMConfigTreeNode extends PXView {
	LineNbr: PXFieldState;
	OptionLineNbr: PXFieldState;
	Label: PXFieldState;
	ToolTip: PXFieldState;
	SortOrder: PXFieldState;
	Icon: PXFieldState;
}

export class AMConfigurationResults extends PXView {
	InventoryID: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Completed: PXFieldState;
	IsConfigurationTesting: PXFieldState;
	CuryID: PXFieldState;
	DisplayPrice: PXFieldState;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

// Classic UI has the following extra view
//export class AMConfigurationResults2 extends PXView {
//}

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

export class AMConfigResultsFeature extends PXView {
	MinMaxSelection: PXFieldState;
	MinLotMaxQty: PXFieldState;
	TotalQty: PXFieldState;
}

export class AMConfigResultsOption extends PXView {
	MinLotMaxQty: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	topBarItems: {
		ShowAll: { index: 0, config: { commandName: "ShowAll", text: Labels.ShowAll } },
	},
	// updating via AMConfigTreeNode is not working
	autoRepaint: ["CurrentOption"],
})
export class AMConfigResultsOption2 extends PXView {
	ShowAll: PXActionState;

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

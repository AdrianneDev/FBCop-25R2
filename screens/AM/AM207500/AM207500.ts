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
	GridAutoGrowMode,
	fieldConfig,
	GridPagerMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.ConfigurationMaint", primaryView: "Documents", showUDFIndicator: true })
export class AM207500 extends PXScreen {
	@viewInfo({ containerName: "Documents" })
	Documents = createSingle(AMConfiguration);
	SelectedConfiguration = createSingle(AMConfiguration2);
	@viewInfo({ containerName: "Features" })
	ConfigurationFeatures = createCollection(AMConfigurationFeature);
	@viewInfo({ containerName: "Options" })
	FeatureOptions = createCollection(AMConfigurationOption);
	@viewInfo({ containerName: "Rules" })
	FeatureRules = createCollection(AMConfigurationFeatureRule);
	@viewInfo({ containerName: "Attributes" })
	ConfigurationAttributes = createCollection(AMConfigurationAttribute);
	@viewInfo({ containerName: "Rules" })
	AttributeRules = createCollection(AMConfigurationAttributeRule);
	@viewInfo({ containerName: "Set as Default Level" })
	ConfigurationIDUpdateFilter = createSingle(ConfigurationIDLevels);
}

export class AMConfiguration extends PXView {
	ConfigurationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Revision: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	BOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMRevisionID: PXFieldState;
	InventoryID: PXFieldState;
	IsCompletionRequired: PXFieldState;
}

export class AMConfiguration2 extends PXView {
	KeyFormat: PXFieldState<PXFieldOptions.CommitChanges>;
	KeyNumberingID: PXFieldState;
	@fieldConfig({
		controlType: "qp-formula-editor",
		controlConfig: {
			comboBox: true
		}
	})
	KeyEquation: PXFieldState;
	@fieldConfig({
		controlType: "qp-formula-editor",
		controlConfig: {
			comboBox: true
		}
	})
	KeyDescription: PXFieldState;
	@fieldConfig({
		controlType: "qp-formula-editor",
		controlConfig: {
			comboBox: true
		}
	})
	TranDescription: PXFieldState;
	OnTheFlySubItems: PXFieldState;
	PriceRollup: PXFieldState;
	PriceCalc: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	autoRepaint: ["FeatureOptions", "FeatureRules"],
})
export class AMConfigurationFeature extends PXView {
	ConfigurationID: PXFieldState;
	Revision: PXFieldState;
	LineNbr: PXFieldState;
	@columnConfig({ hideViewLink: true }) FeatureID: PXFieldState<PXFieldOptions.CommitChanges>;
	Label: PXFieldState;
	Descr: PXFieldState;
	SortOrder: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	MinSelection: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	MaxSelection: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	MinQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	MaxQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	LotQty: PXFieldState;
	Visible: PXFieldState;
	ResultsCopy: PXFieldState;
	PrintResults: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMConfigurationOption extends PXView {
	ConfigurationID: PXFieldState;
	Revision: PXFieldState;
	ConfigFeatureLineNbr: PXFieldState;
	LineNbr: PXFieldState;
	Label: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	FixedInclude: PXFieldState;
	QtyEnabled: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	QtyRequired: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	MinQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	MaxQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	LotQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
	})
	ScrapFactor: PXFieldState<PXFieldOptions.CommitChanges>;
	BFlush: PXFieldState;
	MaterialType: PXFieldState<PXFieldOptions.CommitChanges>;
	PhantomRouting: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	SortOrder: PXFieldState;
	PriceFactor: PXFieldState;
	ResultsCopy: PXFieldState;
	QtyRoundUp: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchSize: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractSource: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintResults: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMConfigurationFeatureRule extends PXView {
	RuleType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) SourceOptionLineNbr: PXFieldState;
	@columnConfig({ hideViewLink: true }) TargetFeatureLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) TargetOptionLineNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	autoRepaint: ["AttributeRules"],
})
export class AMConfigurationAttribute extends PXView {
	ConfigurationID: PXFieldState;
	Revision: PXFieldState;
	LineNbr: PXFieldState;
	@columnConfig({ hideViewLink: true }) AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsFormula: PXFieldState;
	Label: PXFieldState;
	Variable: PXFieldState;
	Descr: PXFieldState;
	Enabled: PXFieldState;
	Required: PXFieldState;
	Visible: PXFieldState;
	Value: PXFieldState;
	SortOrder: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMConfigurationAttributeRule extends PXView {
	RuleType: PXFieldState<PXFieldOptions.CommitChanges>;
	Condition: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: {
			comboBox: true,
			applicationFunctions: false,
		},
	})
	Value1: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: {
			comboBox: true,
			applicationFunctions: false,
		},
	})
	Value2: PXFieldState;
	@columnConfig({ hideViewLink: true }) TargetFeatureLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) TargetOptionLineNbr: PXFieldState;
}

export class ConfigurationIDLevels extends PXView {
	Item: PXFieldState<PXFieldOptions.CommitChanges>;
	Warehouse: PXFieldState<PXFieldOptions.CommitChanges>;
}

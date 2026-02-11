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
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.FeatureMaint", primaryView: "Features", showUDFIndicator: true })
export class AM203500 extends PXScreen {
	@viewInfo({ containerName: "Features" })
	Features = createSingle(Features);
	@viewInfo({ containerName: "Options" })
	FeatureOptions = createCollection(FeatureOptions);
	@viewInfo({ containerName: "Attributes" })
	FeatureAttributes = createCollection(FeatureAttributes);
}

export class Features extends PXView {
	FeatureID: PXFieldState;
	Descr: PXFieldState;
	ActiveFlg: PXFieldState;
	AllowNonInventoryOptions: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayOptionAttributes: PXFieldState;
	PrintResults: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class FeatureOptions extends PXView {
	FeatureID: PXFieldState;
	LineNbr: PXFieldState;
	Label: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	FixedInclude: PXFieldState;
	QtyEnabled: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor"
	})
	QtyRequired: PXFieldState;
	UOM: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor"
	})
	MinQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor"
	})
	MaxQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor"
	})
	LotQty: PXFieldState;
	@columnConfig({
		editorType: "qp-formula-editor"
	})
	ScrapFactor: PXFieldState;
	BFlush: PXFieldState;
	MaterialType: PXFieldState;
	PhantomRouting: PXFieldState;
	PriceFactor: PXFieldState;
	ResultsCopy: PXFieldState;
	QtyRoundUp: PXFieldState;
	BatchSize: PXFieldState;
	SubcontractSource: PXFieldState;
	PrintResults: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
})
export class FeatureAttributes extends PXView {
	FeatureID: PXFieldState;
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
}

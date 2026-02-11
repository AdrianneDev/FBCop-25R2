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
	treeConfig,
	GridPreset,
	ControlParameter,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.AsBuiltConfigInq", primaryView: "Filter" })
export class AM401700 extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(AsBuiltConfigFilter);
	@viewInfo({ containerName: "Features" })
	Tree = createCollection(AsBuiltTreeNode);
	@viewInfo({ parameters: [new ControlParameter("selectedValue", "Tree", "SelectedValue")] })
	ProdLotSerialRecs = createCollection(AMProdLotSerial);
}

export class AsBuiltConfigFilter extends PXView {
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrdNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	LevelsToDisplay: PXFieldState<PXFieldOptions.CommitChanges>;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	iconField: "Icon",
	toolTipField: "ToolTip",
	idField: ["ParentID", "MatlLine", "Level"],
	valueField: "SelectedValue",
	textField: "Label",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	openedLayers: 10,
	autoRepaint: ["Filter", "ProdLotSerialRecs"],
})
export class AsBuiltTreeNode extends PXView {
	ParentID: PXFieldState;
	MatlLine: PXFieldState;
	Label: PXFieldState;
	ToolTip: PXFieldState;
	SortOrder: PXFieldState;
	Icon: PXFieldState;
	Level: PXFieldState;
	SelectedValue: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMProdLotSerial extends PXView {
	InventoryID: PXFieldState;
	Descr: PXFieldState;
	LotSerialNbr: PXFieldState;
	ParentInventoryID: PXFieldState;
	ParentDescr: PXFieldState;
	ParentLotSerialNbr: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
}

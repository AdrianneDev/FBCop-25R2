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
	handleEvent,
	CustomEventType,
	CellCssHandlerArgs,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.BOMCompareInq", primaryView: "Filter", showActivitiesIndicator: true })
export class AM410000 extends PXScreen {
	@viewInfo({ containerName: "BOM of Material" })
	Filter = createSingle(BOMCompareFilter);
	@viewInfo({ containerName: "Features Left" })
	Tree1 = createCollection(AMBOMCompareTreeNode);
	@viewInfo({ containerName: "Features Right" })
	Tree2 = createCollection(AMBOMCompareTreeNode2);

	@viewInfo({
		containerName: "Materials",
		parameters: [
			new ControlParameter("detailLineNbr1", "Tree1", "DetailLineNbr"),
			new ControlParameter("detailLineNbr2", "Tree2", "DetailLineNbr")
		],
	})
	BomMatlRecords = createCollection(AMBomMatl);
	@viewInfo({
		containerName: "Steps",
		parameters: [
			new ControlParameter("detailLineNbr1", "Tree1", "DetailLineNbr"),
			new ControlParameter("detailLineNbr2", "Tree2", "DetailLineNbr")
		],
	})
	BomStepRecords = createCollection(AMBomStep);
	@viewInfo({
		containerName: "Tools",
		parameters: [
			new ControlParameter("detailLineNbr1", "Tree1", "DetailLineNbr"),
			new ControlParameter("detailLineNbr2", "Tree2", "DetailLineNbr")
		],
	})
	BomToolRecords = createCollection(AMBomTool);
	@viewInfo({
		containerName: "Overhead",
		parameters: [
			new ControlParameter("detailLineNbr1", "Tree1", "DetailLineNbr"),
			new ControlParameter("detailLineNbr2", "Tree2", "DetailLineNbr")
		],
	})
	BomOvhdRecords = createCollection(AMBomOvhd);

	static getCellCss(currentValue: any, otherValue: any): string | undefined {
		if (currentValue != null && otherValue != null) {
			if (typeof currentValue === "object" && typeof otherValue === "object") {
				const currentKeys = Object.keys(currentValue);
				const otherKeys = Object.keys(otherValue);

				const isEqual = currentKeys.length === otherKeys.length
					&& currentKeys.every(key => otherKeys.includes(key) && currentValue[key] === otherValue[key]);

				return isEqual ? undefined : "yellow";
			}
			else if (currentValue !== otherValue) {
				return "yellow";
			}
		}
		return undefined;
	}

	static highlightDiff(args: CellCssHandlerArgs): string | undefined {
		const model = args?.viewModel;
		if (model?.records?.length === 2) {

			const currentRowIndex = args?.selector?.rowIndex;
			const columnId = args?.selector?.columnId;
			const currentValue = args?.selector?.cellValue;

			if (currentRowIndex === 0) {
				const secondRecord = model.records[1];
				const nextValue = secondRecord[columnId]?.value;
				return AM410000.getCellCss(currentValue, nextValue);
			}
			else {
				const firstRecord = model.records[0];
				const previousValue = firstRecord[columnId]?.value;
				return AM410000.getCellCss(currentValue, previousValue);
			}
		}
		return undefined;
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "BomMatlRecords", allColumns: true })
	getAMBomMatlCellCss(args: CellCssHandlerArgs): string | undefined {
		return AM410000.highlightDiff(args);
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "BomStepRecords", allColumns: true })
	getAMBomStepCellCss(args: CellCssHandlerArgs): string | undefined {
		return AM410000.highlightDiff(args);
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "BomToolRecords", allColumns: true })
	getAMBomToolCellCss(args: CellCssHandlerArgs): string | undefined {
		return AM410000.highlightDiff(args);
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "BomOvhdRecords", allColumns: true })
	getAMBomOvhdCellCss(args: CellCssHandlerArgs): string | undefined {
		return AM410000.highlightDiff(args);
	}
}

export class BOMCompareFilter extends PXView {
	IDType1: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMID1: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID1: PXFieldState<PXFieldOptions.CommitChanges>;
	ECRID1: PXFieldState<PXFieldOptions.CommitChanges>;
	ECOID1: PXFieldState<PXFieldOptions.CommitChanges>;
	IDType2: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMID2: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID2: PXFieldState<PXFieldOptions.CommitChanges>;
	ECRID2: PXFieldState<PXFieldOptions.CommitChanges>;
	ECOID2: PXFieldState<PXFieldOptions.CommitChanges>;
}

@treeConfig({
	dynamic: true,
	hideToolbarSearch: true,
	hideRootNode: true,
	iconField: "Icon",
	toolTipField: "ToolTip",
	idField: ["ParentID", "LineNbr", "CategoryNbr", "DetailLineNbr"],
	valueField: "DetailLineNbr",
	textField: "Label",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	openedLayers: 4,
	autoRepaint: ["BomMatlRecords", "BomStepRecords", "BomToolRecords", "BomOvhdRecords"],
})
export class AMBOMCompareTreeNode extends PXView {
	ParentID: PXFieldState;
	LineNbr: PXFieldState;
	CategoryNbr: PXFieldState;
	DetailLineNbr: PXFieldState;
	Label: PXFieldState;
	ToolTip: PXFieldState;
	SortOrder: PXFieldState;
	Icon: PXFieldState;
}

@treeConfig({
	dynamic: true,
	hideToolbarSearch: true,
	hideRootNode: true,
	iconField: "Icon",
	toolTipField: "ToolTip",
	idField: ["ParentID", "LineNbr", "CategoryNbr", "DetailLineNbr"],
	valueField: "DetailLineNbr",
	textField: "Label",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	openedLayers: 4,
	autoRepaint: ["BomMatlRecords", "BomStepRecords", "BomToolRecords", "BomOvhdRecords"],
})
export class AMBOMCompareTreeNode2 extends PXView {
	ParentID: PXFieldState;
	LineNbr: PXFieldState;
	CategoryNbr: PXFieldState;
	DetailLineNbr: PXFieldState;
	Label: PXFieldState;
	ToolTip: PXFieldState;
	SortOrder: PXFieldState;
	Icon: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class AMBomMatl extends PXView {
	LineID: PXFieldState;
	SortOrder: PXFieldState;
	BOMID: PXFieldState;
	RevisionID: PXFieldState;
	InventoryID: PXFieldState;
	OperationID: PXFieldState;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	QtyReq: PXFieldState;
	BatchSize: PXFieldState;
	UOM: PXFieldState;
	UnitCost: PXFieldState;
	PlanCost: PXFieldState;
	MaterialType: PXFieldState;
	PhantomRouting: PXFieldState;
	BFlush: PXFieldState;
	SiteID: PXFieldState;
	CompBOMID: PXFieldState;
	CompBOMRevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState;
	ScrapFactor: PXFieldState;
	BubbleNbr: PXFieldState;
	EffDate: PXFieldState;
	ExpDate: PXFieldState;
	RowStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowDelete: false,
	allowInsert: false
})
export class AMBomStep extends PXView {
	BOMID: PXFieldState;
	RevisionID: PXFieldState;
	OperationID: PXFieldState;
	Descr: PXFieldState;
	LineID: PXFieldState;
	RowStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class AMBomTool extends PXView {
	BOMID: PXFieldState;
	RevisionID: PXFieldState;
	OperationID: PXFieldState;
	LineID: PXFieldState;
	ToolID: PXFieldState;
	Descr: PXFieldState;
	QtyReq: PXFieldState;
	UnitCost: PXFieldState;
	RowStatus: PXFieldState;
	AMToolMst__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowDelete: false,
	allowInsert: false
})
export class AMBomOvhd extends PXView {
	BOMID: PXFieldState;
	RevisionID: PXFieldState;
	OperationID: PXFieldState;
	LineID: PXFieldState;
	OvhdID: PXFieldState;
	AMOverhead__Descr: PXFieldState;
	AMOverhead__OvhdType: PXFieldState;
	OFactor: PXFieldState;
	RowStatus: PXFieldState;
}

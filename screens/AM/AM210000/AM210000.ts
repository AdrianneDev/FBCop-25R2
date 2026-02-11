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
	GridPreset,
	linkCommand,
	GridAutoGrowMode,
	handleEvent,
	CustomEventType,
	RowCssHandlerArgs,
	GridPagerMode,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.ECRMaint", primaryView: "Documents", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM210000 extends PXScreen {
	@viewInfo({ containerName: "ECR" })
	Documents = createSingle(AMECRItem);
	@viewInfo({ containerName: "Operations" })
	BomOperRecords = createCollection(AMBomOper);
	@viewInfo({ containerName: "Attributes" })
	BomAttributes = createCollection(AMBomAttribute);
	@viewInfo({ containerName: "Materials" })
	BomMatlRecords = createCollection(AMBomMatl);
	@viewInfo({ containerName: "Steps" })
	BomStepRecords = createCollection(AMBomStep);
	@viewInfo({ containerName: "Tools" })
	BomToolRecords = createCollection(AMBomTool);
	@viewInfo({ containerName: "Overhead" })
	BomOvhdRecords = createCollection(AMBomOvhd);
	@viewInfo({ containerName: "Outside Process" })
	OutsideProcessingOperationSelected = createSingle(AMBomOper2);
	@viewInfo({ containerName: "Reference Designators" })
	BomRefRecords = createCollection(AMBomRef);

	static getRowCss(args: RowCssHandlerArgs) {
		const row = args?.selector?.row;
		if (row && row.id && row.RowStatus?.value > 0) {
			return "bold-row";
		}
		return undefined;
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "BomOperRecords" })
	getAMBomOperRowCss(args: RowCssHandlerArgs) {
		return AM210000.getRowCss(args);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "BomMatlRecords" })
	getAMBomMatlRowCss(args: RowCssHandlerArgs) {
		return AM210000.getRowCss(args);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "BomStepRecords" })
	getAMBomStepRowCss(args: RowCssHandlerArgs) {
		return AM210000.getRowCss(args);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "BomToolRecords" })
	getAMBomToolRowCss(args: RowCssHandlerArgs) {
		return AM210000.getRowCss(args);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "BomOvhdRecords" })
	getAMBomOvhdRowCss(args: RowCssHandlerArgs) {
		return AM210000.getRowCss(args);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "BomRefRecords" })
	getAMBomRefRowCss(args: RowCssHandlerArgs) {
		return AM210000.getRowCss(args);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "BomAttributes" })
	getAMBomAttributeRowCss(args: RowCssHandlerArgs) {
		return AM210000.getRowCss(args);
	}
}

export class AMECRItem extends PXView {
	ECRID: PXFieldState;
	RevisionID: PXFieldState;
	BOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMRevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	SiteID: PXFieldState;
	RequestDate: PXFieldState;
	EffectiveDate: PXFieldState;
	Requestor: PXFieldState;
	Priority: PXFieldState;
	ECOID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	autoRepaint: ["BomMatlRecords", "BomStepRecords", "BomToolRecords", "BomOvhdRecords", "OutsideProcessingOperationSelected"],
})
export class AMBomOper extends PXView {
	OperationCD: PXFieldState<PXFieldOptions.CommitChanges>;
	WcID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	SetupTime: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	RunUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnits: PXFieldState<PXFieldOptions.CommitChanges>;
	MachineUnitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	QueueTime: PXFieldState;
	FinishTime: PXFieldState;
	MoveTime: PXFieldState;
	BFlush: PXFieldState;
	ScrapAction: PXFieldState;
	RowStatus: PXFieldState;
	ControlPoint: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	adjustPageSize: true,
})
export class AMBomAttribute extends PXView {
	LineNbr: PXFieldState;
	Level: PXFieldState;
	@columnConfig({ hideViewLink: true }) AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Label: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	Enabled: PXFieldState;
	TransactionRequired: PXFieldState;
	Value: PXFieldState;
	OrderFunction: PXFieldState;
	RowStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
	allowDragRows: true,
	pasteCommand: "PasteLine",
	topBarItems: {
		ReferenceDesignators: {
			index: 0,
			config: {
				popupPanel: "PanelRef",
				text: Labels.ReferenceDesignators,
			}
		},
		ResetOrder: {
			index: 1,
			config: {
				commandName: "ResetOrder",
				text: Labels.ResetLines,
			}
		},
	//	AddNew: { index: 1, config: { commandName: "AddNew", text: "Insert Row" } },
	//	Copy: { index: 2, config: { commandName: "Copy", text: "Cut Row" } },
	//	Paste: { index: 3, config: { commandName: "Paste", text: "Insert Cut Row" } },
	},
})
export class AMBomMatl extends PXView {
	ReferenceDesignators: PXActionState;
	ResetOrder: PXActionState;
	AddNew: PXActionState;
	Copy: PXActionState;
	Paste: PXActionState;

	LineID: PXFieldState;
	SortOrder: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	QtyReq: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchSize: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitCost: PXFieldState;
	PlanCost: PXFieldState;
	MaterialType: PXFieldState<PXFieldOptions.CommitChanges>;
	PhantomRouting: PXFieldState;
	BFlush: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewCompBomID") CompBOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	CompBOMRevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState;
	ScrapFactor: PXFieldState;
	BubbleNbr: PXFieldState;
	EffDate: PXFieldState;
	ExpDate: PXFieldState;
	RowStatus: PXFieldState;
	SubcontractSource: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMBomStep extends PXView {
	Descr: PXFieldState;
	LineID: PXFieldState;
	RowStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMBomTool extends PXView {
	LineID: PXFieldState;
	ToolID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	QtyReq: PXFieldState;
	UnitCost: PXFieldState;
	RowStatus: PXFieldState;
	AMToolMst__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMBomOvhd extends PXView {
	LineID: PXFieldState;
	OvhdID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMOverhead__Descr: PXFieldState;
	AMOverhead__OvhdType: PXFieldState;
	OFactor: PXFieldState;
	RowStatus: PXFieldState;
}

export class AMBomOper2 extends PXView {
	OutsideProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	DropShippedToVendor: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMBomRef extends PXView {
	RefDes: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	BOMID: PXFieldState;
	OperationID: PXFieldState;
	LineID: PXFieldState;
	MatlLineID: PXFieldState;
	RowStatus: PXFieldState;
}

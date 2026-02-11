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
	GridPagerMode,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.BOMMaint", primaryView: "Documents", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM208000 extends PXScreen {
	@viewInfo({ containerName: "BOM of Material" })
	Documents = createSingle(AMBomItem);
	@viewInfo({ containerName: "Operations" })
	BomOperRecords = createCollection(AMBomOper);
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
	@viewInfo({ containerName: "Outside Process" })
	CurySettings_AMBomOper = createSingle(AMBomOperCury);

	@viewInfo({ containerName: "Reference Designators" })
	BomRefRecords = createCollection(AMBomRef);
	@viewInfo({ containerName: "Copy BOM" })
	copyBomFilter = createSingle(CopyBomFilter);
	@viewInfo({ containerName: "Default BOM Levels" })
	DefaultBomLevelsFilter = createSingle(DefaultBomLevels);
	@viewInfo({ containerName: "Planning BOM Levels" })
	PlanningBomLevelsFilter = createSingle(DefaultBomLevels2);
	@viewInfo({ containerName: "BOM Cost Summary" })
	BomCostRecs = createSingle(AMBomCost);
	@viewInfo({ containerName: "BOM Cost Settings" })
	rollsettings = createSingle(RollupSettings);
}

export class AMBomItem extends PXView {
	BOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	EffStartDate: PXFieldState;
	EffEndDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	autoRepaint: ["BomMatlRecords", "BomStepRecords", "BomToolRecords", "BomOvhdRecords", "OutsideProcessingOperationSelected", "CurySettings_AMBomOper"],
})
export class AMBomOper extends PXView {
	OperationID: PXFieldState;
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
	ControlPoint: PXFieldState;
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
	SubcontractSource: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 200,
})
export class AMBomStep extends PXView {
	Descr: PXFieldState;
	LineID: PXFieldState;
	SortOrder: PXFieldState;
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
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
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
}

export class AMBomOper2 extends PXView {
	OutsideProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	DropShippedToVendor: PXFieldState;
}

export class AMBomOperCury extends PXView {
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
}

export class CopyBomFilter extends PXView {
	FromBOMID: PXFieldState;
	FromRevisionID: PXFieldState;
	FromInventoryID: PXFieldState;
	FromSubItemID: PXFieldState;
	FromSiteID: PXFieldState;
	ToBOMID: PXFieldState<PXFieldOptions.CommitChanges>;
	ToRevisionID: PXFieldState;
	ToInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ToSubItemCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ToSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateMaterialWarehouse: PXFieldState;
	CopyNotesItem: PXFieldState;
	CopyNotesOper: PXFieldState;
	CopyNotesMatl: PXFieldState;
	CopyNotesStep: PXFieldState;
	CopyNotesTool: PXFieldState;
	CopyNotesOvhd: PXFieldState;
}

export class DefaultBomLevels extends PXView {
	Item: PXFieldState;
	Warehouse: PXFieldState;
	SubItem: PXFieldState;
}

export class DefaultBomLevels2 extends PXView {
	Item: PXFieldState;
	Warehouse: PXFieldState;
	SubItem: PXFieldState;
}

export class AMBomCost extends PXView {
	LotSize: PXFieldState;
	MultiLevelProcess: PXFieldState;
	FLaborCost: PXFieldState;
	VLaborCost: PXFieldState;
	FOvdCost: PXFieldState;
	VOvdCost: PXFieldState;
	MachCost: PXFieldState;
	ToolCost: PXFieldState;
	MatlCost: PXFieldState;
	SubcontractMaterialCost: PXFieldState;
	UnitCost: PXFieldState;
	TotalCost: PXFieldState;
}

export class RollupSettings extends PXView {
	LotSize: PXFieldState<PXFieldOptions.CommitChanges>;
	SnglMlti: PXFieldState<PXFieldOptions.CommitChanges>;
}

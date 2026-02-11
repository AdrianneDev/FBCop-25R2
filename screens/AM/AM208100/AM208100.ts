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
	linkCommand,
} from "client-controls";
import { Labels } from "../common/localization";
import { Messages } from "src/screens/common/messages";

@graphInfo({ graphType: "PX.Objects.AM.EngineeringWorkbenchMaint", primaryView: "Documents" })
export class AM208100 extends PXScreen {
	ViewCompBomID: PXActionState;

	Documents = createSingle(AMBomItem);
	@viewInfo({ containerName: "Tree" })
	BomTree = createCollection(WorkbenchTreeNode);
	@viewInfo({ containerName: "Selected BOM" })
	SelectedTreeNode = createSingle(TreeNodeEventResult);
	@viewInfo({ containerName: "Material" })
	SelectedBomMatl = createSingle(AMBomMatl);
	@viewInfo({ containerName: "Subassembly" })
	SubassemblyBomItem3 = createSingle(AMBomItem2);
	@viewInfo({ containerName: "Operation" })
	SelectedBomOper = createSingle(AMBomOper);
	@viewInfo({ containerName: "Materials" })
	BomMatlRecords = createCollection(AMBomMatl2);
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

@treeConfig({
	parentIdField: "IDParent",
	iconField: "Icon",
	iconColorField: "IconColor",
	idField: "IDName",
	textField: "Description",
	extraColumnField: "ExtraColumns",
	extraColumns: [{ title: () => Messages.QTY, controlType: "qp-text-editor", width: 115, textAlign: 3}, { title: () => Messages.UOM, controlType: "qp-text-editor", width: 85, textAlign: 1 }],
	modifiable: true,
	mode: "single",
	singleClickSelect: true,
	onSelect: "SelectNode",
	onAdd: "AddNode",
	onDelete: "DeleteNode",
	onChange: "UpdateNode",
	addSiblingNode: "NewSiblingNodeDefault",
	addChildNode: "NewChildNodeDefault",
	actionField: "Actions",
	checkDropCommand: "CheckDropAction",
	syncPosition: true,
})
export class WorkbenchTreeNode extends PXView  {
	IDName: PXFieldState;
	IDNameOriginal: PXFieldState;
	IDParent: PXFieldState;
	Description: PXFieldState;
	Icon: PXFieldState;
	IconColor: PXFieldState;
	Actions: PXFieldState;
	ExtraColumns: PXFieldState;
}

export class AMBomItem2 extends PXView {
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

export class TreeNodeEventResult extends PXView {
	IsOperation: PXFieldState<PXFieldOptions.Hidden>;
	IsSubassembly: PXFieldState<PXFieldOptions.Hidden>;
	OperationCD: PXFieldState<PXFieldOptions.Hidden>;
	WcID: PXFieldState<PXFieldOptions.Hidden>;
	OperationDescription: PXFieldState<PXFieldOptions.Hidden>;
}

export class AMBomMatl extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	QtyReq: PXFieldState;
	UOM: PXFieldState;
	BFlush: PXFieldState;
	BatchSize: PXFieldState;
	ScrapFactor: PXFieldState;
	UnitCost: PXFieldState;
	PlanCost: PXFieldState;
	MaterialType: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractSource: PXFieldState<PXFieldOptions.CommitChanges>;
	PhantomRouting: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState;
	CompBOMID: PXFieldState;
	CompBOMRevisionID: PXFieldState;
	BubbleNbr: PXFieldState;
	EffDate: PXFieldState;
	ExpDate: PXFieldState;
}

export class AMBomOper extends PXView {
	OperationCD: PXFieldState;
	WcID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	SetupTime: PXFieldState;
	RunUnits: PXFieldState;
	RunUnitTime: PXFieldState;
	MachineUnits: PXFieldState;
	MachineUnitTime: PXFieldState;
	BFlush: PXFieldState;
	ControlPoint: PXFieldState;
	QueueTime: PXFieldState;
	FinishTime: PXFieldState;
	MoveTime: PXFieldState;
	ScrapAction: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
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
export class AMBomMatl2 extends PXView {
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
})
export class AMBomStep extends PXView {
	Descr: PXFieldState;
	LineID: PXFieldState;
	SortOrder: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class AMBomTool extends PXView {
	LineID: PXFieldState;
	ToolID: PXFieldState;
	Descr: PXFieldState;
	QtyReq: PXFieldState;
	UnitCost: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMBomOvhd extends PXView {
	LineID: PXFieldState;
	OvhdID: PXFieldState;
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

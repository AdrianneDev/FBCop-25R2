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
	headerDescription,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.DisassemblyEntry", primaryView: "Document", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM301500 extends PXScreen {
	@viewInfo({ containerName: "Document" })
	Document = createSingle(AMDisassembleBatch);
	@viewInfo({ containerName: "Material" })
	MaterialTransactionRecords = createCollection(AMDisassembleTran);
	@viewInfo({ containerName: "Attributes" })
	TransactionAttributes = createCollection(AMDisassembleBatchAttribute);
	@viewInfo({ containerName: "References" })
	CurrentDocument = createSingle(AMDisassembleBatch2);
}

export class AMDisassembleBatch extends PXView {
	BatchNbr: PXFieldState;
	Status: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription Description: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
	statusField: "Availability",
})
export class AMDisassembleTran extends PXView {
	AMDisassembleMaterialTranLineSplittingExtension_ShowSplits: PXActionState;
	copyLine: PXActionState;

	Availability: PXFieldState;
	LineNbr: PXFieldState;
	TranOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	IsScrap: PXFieldState<PXFieldOptions.CommitChanges>;
	TranType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LotSerialNbr: PXFieldState;
	ExpireDate: PXFieldState;
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	TranAmt: PXFieldState;
	TranDesc: PXFieldState;
	ReasonCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	MatlLineId: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentLotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	GLBatNbr: PXFieldState;
	GLLineNbr: PXFieldState;
	INDocType: PXFieldState;
	INBatNbr: PXFieldState;
	INLineNbr: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class AMDisassembleBatchAttribute extends PXView {
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	LineNbr: PXFieldState;
	AttributeID: PXFieldState;
	Label: PXFieldState;
	Descr: PXFieldState;
	TransactionRequired: PXFieldState;
	Value: PXFieldState;
}

export class AMDisassembleBatch2 extends PXView {
	BranchID: PXFieldState;
	INDocType: PXFieldState;
	INBatNbr: PXFieldState;
	TranDesc: PXFieldState;
}

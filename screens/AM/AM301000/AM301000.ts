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

@graphInfo({ graphType: "PX.Objects.AM.LaborEntry", primaryView: "batch", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM301000 extends PXScreen {
	@viewInfo({ containerName: "Document Summary" })
	batch = createSingle(AMBatch);
	@viewInfo({ containerName: "transactions" })
	transactions = createCollection(AMMTran);
	@viewInfo({ containerName: "Production Attributes" })
	TransactionAttributes = createCollection(AMMTranAttribute);
}

export class AMBatch extends PXView {
	BatNbr: PXFieldState;
	Status: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription TranDesc: PXFieldState;
	ControlQty: PXFieldState;
	TotalQty: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
	statusField: "Availability",
})
export class AMMTran extends PXView {
	LineSplittingExtension_ShowSplits: PXActionState;
	ProductionAttributes: PXActionState;
	lateAssignmentEntry: PXActionState;

	// Availability is a field for the status bar. This field is invisible in the grid.
	Availability: PXFieldState;

	LineNbr: PXFieldState;
	LaborType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ nullText: Labels.Split }) SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) LaborCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) ShiftCD: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t" }) StartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t" }) EndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" }) LaborTime: PXFieldState<PXFieldOptions.CommitChanges>;
	LaborRate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtCost: PXFieldState;
	IsScrap: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	QtyScrapped: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScrapAction: PXFieldState<PXFieldOptions.CommitChanges>;
	GLBatNbr: PXFieldState;
	GLLineNbr: PXFieldState;
	INDocType: PXFieldState;
	INBatNbr: PXFieldState;
	INLineNbr: PXFieldState;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState;
	ReceiptNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	TranDate: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class AMMTranAttribute extends PXView {
	DocType: PXFieldState;
	BatNbr: PXFieldState;
	TranLineNbr: PXFieldState;
	LineNbr: PXFieldState;
	AttributeID: PXFieldState;
	Label: PXFieldState;
	Descr: PXFieldState;
	TransactionRequired: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}

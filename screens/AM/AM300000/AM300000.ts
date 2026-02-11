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
	controlConfig,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.MaterialEntry", primaryView: "batch", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM300000 extends PXScreen {
	@viewInfo({ containerName: "Document Summary" })
	batch = createSingle(AMBatch);
	@viewInfo({ containerName: "transactions" })
	transactions = createCollection(AMMTran);
}

export class AMBatch extends PXView {
	BatNbr: PXFieldState;
	Status: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true }) OrigBatNbr: PXFieldState;
	OrigDocType: PXFieldState;
	@headerDescription TranDesc: PXFieldState;
	TotalQty: PXFieldState;
	ControlQty: PXFieldState;
	TotalAmount: PXFieldState;
	ControlAmount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
	statusField: "Availability",
})
export class AMMTran extends PXView {
	LineSplittingExtension_ShowSplits: PXActionState;
	Split: PXActionState;
	ShowAddLotSerialNbrPanel: PXActionState;

	// Availability is a field for the status bar. This field is invisible in the grid.
	Availability: PXFieldState;

	LineNbr: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ nullText: Labels.Split }) SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState;
	UnitCost: PXFieldState;
	TranAmt: PXFieldState;
	GLBatNbr: PXFieldState;
	GLLineNbr: PXFieldState;
	INDocType: PXFieldState;
	INBatNbr: PXFieldState;
	INLineNbr: PXFieldState;
	IsByproduct: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) MatlLineId: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID_description: PXFieldState;
	@columnConfig({ hideViewLink: true, nullText: Labels.Split }) ParentLotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	InventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

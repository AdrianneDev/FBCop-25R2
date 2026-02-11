import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	createCollection,
	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { LSNullText } from "../../IN/common/line-splitting/views";

@graphInfo({
	graphType: "PX.Objects.IN.INProductionEntry",
	primaryView: "Document",
	showUDFIndicator: true,
})
export class IN308000 extends PXScreen {
	LineSplittingExtension_GenerateNumbers: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	Document = createSingle(INRegister);
	@viewInfo({ containerName: "Details" })
	transactions = createCollection(INTran);
	@viewInfo({ containerName: "Costs" })
	TranCosts = createCollection(AMTranCost);
	@viewInfo({ containerName: "LineSplittingExtension_LotSerOptions" })
	LineSplittingExtension_LotSerOptions = createSingle(LotSerOptions);
	@viewInfo({ containerName: "splits" })
	splits = createCollection(INTranSplit);
}

export class INRegister extends PXView {
	RefNbr: PXFieldState;
	Status: PXFieldState;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState;
	TranDesc: PXFieldState;
	TotalQty: PXFieldState;
	ControlQty: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalAmount: PXFieldState;
	ControlAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalCost: PXFieldState;

	BatchNbr: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchBaseCuryID: PXFieldState;
	AMBatNbr: PXFieldState;
	AMDocType: PXFieldState;
}

export class INRegister2 extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchNbr: PXFieldState;
	BranchBaseCuryID: PXFieldState;
	AMBatNbr: PXFieldState;
	AMDocType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
})
export class INTran extends PXView {
	LineSplittingExtension_ShowSplits: PXActionState; //Line Details button on Details tab
	InventorySummary: PXActionState; //Inventory Summary button on Details tab

	Availability: PXFieldState;

	@columnConfig({hideViewLink: true})
	BranchID: PXFieldState;

	TranType: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;


	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	Qty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	UnitPrice: PXFieldState;
	TranAmt: PXFieldState;
	UnitCost: PXFieldState;
	TranCost: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	ExpireDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReasonCode: PXFieldState;
	CostLayerType: PXFieldState<PXFieldOptions.CommitChanges>;
	SpecialOrderCostCenterID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrderType: PXFieldState;

	SOOrderNbr: PXFieldState;
	SOShipmentNbr: PXFieldState;
	POReceiptType: PXFieldState;
	POReceiptNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class AMTranCost extends PXView {
	TranType: PXFieldState;
	TranAmt: PXFieldState;
	@columnConfig({ hideViewLink: true }) AcctID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SubID: PXFieldState;
	TranDesc: PXFieldState;
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	OperationID: PXFieldState;
	LineNbr: PXFieldState;
	GLBatNbr: PXFieldState;
	GLLineNbr: PXFieldState;
	Qty: PXFieldState;
	ReferenceCostID: PXFieldState;
	BranchID: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState;
	CostCodeID: PXFieldState;
}

export class LotSerOptions extends PXView {
	UnassignedQty: PXFieldState;
	Qty: PXFieldState;
	StartNumVal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class INTranSplit extends PXView {
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true }) SubItemID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState;
	LotSerialNbr: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	ExpireDate: PXFieldState;
}

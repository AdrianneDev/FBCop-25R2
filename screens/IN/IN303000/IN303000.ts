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
	GridColumnShowHideMode,
} from "client-controls";
import { LSNullText } from "../../IN/common/line-splitting/views";

@graphInfo({
	graphType: "PX.Objects.IN.INAdjustmentEntry",
	primaryView: "adjustment",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
export class IN303000 extends PXScreen {
	@viewInfo({ containerName: "Adjustment Header" })
	adjustment = createSingle(INRegister);

	@viewInfo({ containerName: "Adjustment" })
	CurrentDocument = createSingle(INRegister2);

	@viewInfo({ containerName: "Details" })
	transactions = createCollection(INTran);
}

export class INRegister extends PXView {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;

	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	ExtRefNbr: PXFieldState;
	PIID: PXFieldState;
	TranDesc: PXFieldState;

	TotalQty: PXFieldState;
	ControlQty: PXFieldState;
	TotalCost: PXFieldState;
	ControlCost: PXFieldState;
}

export class INRegister2 extends PXView {
	BatchNbr: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchBaseCuryID: PXFieldState;
	IgnoreAllocationErrors: PXFieldState;
	//Manufacturing
	AMBatNbr: PXFieldState;
	AMDocType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
})
export class INTran extends PXView {
	Split: PXActionState;
	ShowItems: PXActionState; //Add Items button on Details tab
	InventorySummary: PXActionState; //Inventory Summary button on Details tab
	ShowAddLotSerialNbrPanel: PXActionState; //Add Lot/Serial Nbr. button on Details tab

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	PILineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostLayerType: PXFieldState<PXFieldOptions.CommitChanges>;
	InventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	SpecialOrderCostCenterID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	UnitCost: PXFieldState;
	TranCost: PXFieldState;
	ManualCost: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: "" })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	ExpireDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrigRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrderType: PXFieldState;

	SOOrderNbr: PXFieldState;
	SOShipmentNbr: PXFieldState;
	POReceiptType: PXFieldState;
	POReceiptNbr: PXFieldState;
}

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
	graphType: "PX.Objects.IN.INTransferEntry",
	primaryView: "transfer",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
export class IN304000 extends PXScreen {
	@viewInfo({ containerName: "Transfer Header" })
	transfer = createSingle(INRegister);

	@viewInfo({ containerName: "Transfer" })
	CurrentDocument = createSingle(INRegister2);

	@viewInfo({ containerName: "Details" })
	transactions = createCollection(INTran);
}

export class INRegister extends PXView {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	TransferType: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;

	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ToSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState;
	TranDesc: PXFieldState;

	ControlQty: PXFieldState;
	TotalQty: PXFieldState;
}

export class INRegister2 extends PXView {
	BatchNbr: PXFieldState;
	BranchID: PXFieldState;
	BranchBaseCuryID: PXFieldState;
	POReceiptNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
})
export class INTran extends PXView {
	LineSplittingExtension_ShowSplits: PXActionState; //Line Details button on Details tab
	ShowItems: PXActionState; //Add Items button on Details tab
	InventorySummary: PXActionState; //Inventory Summary button on Details tab
	ShowAddLotSerialNbrPanel: PXActionState; //Add Lot/Serial Nbr. button on Details tab

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostLayerType: PXFieldState<PXFieldOptions.CommitChanges>;
	InventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	SpecialOrderCostCenterID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ToLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	ToCostLayerType: PXFieldState<PXFieldOptions.CommitChanges>;
	ToInventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	ToSpecialOrderCostCenterID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ToProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ToTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	ToCostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	Qty: PXFieldState;
	ReceiptedQty: PXFieldState;
	INTransitQty: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	ExpireDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;
	LineNbr: PXFieldState;
	SOOrderType: PXFieldState;
	SOOrderNbr: PXFieldState;
	SOShipmentNbr: PXFieldState;
}
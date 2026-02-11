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
	graphType: "PX.Objects.IN.INIssueEntry",
	primaryView: "issue",
	udfTypeField: "Status",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
export class IN302000 extends PXScreen {
	@viewInfo({ containerName: "Issue Header" })
	issue = createSingle(INRegister);

	@viewInfo({ containerName: "Issue" })
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
	TranDesc: PXFieldState;

	TotalQty: PXFieldState;
	ControlQty: PXFieldState;
	TotalAmount: PXFieldState;
	ControlAmount: PXFieldState;
	TotalCost: PXFieldState;
}

export class INRegister2 extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchNbr: PXFieldState;
	BranchBaseCuryID: PXFieldState;
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
	LineSplittingExtension_ShowSplits: PXActionState; //Line Details button on Details tab
	ShowItems: PXActionState; //Add Items button on Details tab
	InventorySummary: PXActionState; //Inventory Summary button on Details tab
	ShowAddLotSerialNbrPanel: PXActionState; //Add Lot/Serial Nbr. button on Details tab

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	@columnConfig({hideViewLink: true})
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;


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
	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	CostLayerType: PXFieldState<PXFieldOptions.CommitChanges>;
	InventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	SpecialOrderCostCenterID: PXFieldState;

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

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
	graphType: "PX.Objects.IN.INReceiptEntry",
	primaryView: "receipt",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
export class IN301000 extends PXScreen {
	@viewInfo({ containerName: "Receipt Header" })
	receipt = createSingle(INRegister);

	@viewInfo({ containerName: "Receipt" })
	CurrentDocument = createSingle(INRegister2);

	@viewInfo({ containerName: "Details" })
	transactions = createCollection(INTran);
}

export class INRegister extends PXView {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;

	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	TransferNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState;
	TranDesc: PXFieldState;

	TotalQty: PXFieldState;
	ControlQty: PXFieldState;
	TotalCost: PXFieldState;
	ControlCost: PXFieldState;
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

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

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

	UnitCost: PXFieldState;
	TranCost: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	ExpireDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	CostLayerType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ fullState: true })
	InventorySource: PXFieldState<PXFieldOptions.CommitChanges>;
	SpecialOrderCostCenterID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	POReceiptType: PXFieldState;
	POReceiptNbr: PXFieldState;
}

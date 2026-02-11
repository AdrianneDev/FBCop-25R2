import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	PXViewCollection,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnShowHideMode,
	headerDescription,
	CurrencyInfo,

	handleEvent,
	CustomEventType,
	CurrentRowChangedHandlerArgs,
	RowSelectedHandlerArgs,
	GridAutoGrowMode,
} from "client-controls";
import { LSNullText } from "../../IN/common/line-splitting/views";

@graphInfo({
	graphType: "PX.Objects.PO.POReceiptEntry",
	primaryView: "Document",
	bpEventsIndicator: true,
	udfTypeField: "ReceiptType",
	showActivitiesIndicator: true,
	showUDFIndicator: true,
})
export class PO302000 extends PXScreen {
	@viewInfo({ containerName: "Document Summary" })
	Document = createSingle(POReceiptHeader);

	@viewInfo({ containerName: "Document Summary General" })
	CurrentDocument = createSingle(POReceipt);

	@viewInfo({ containerName: "Currency Info" })
	CurrencyInfo = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Details" })
	transactions = createCollection(POReceiptLine);

	@viewInfo({ containerName: "Orders" })
	ReceiptOrdersLink = createCollection(POOrderReceipt);

	@viewInfo({ containerName: "Put Away" })
	RelatedTransfers = createCollection(INRegister);

	@viewInfo({ containerName: "History" })
	ReceiptHistory = createCollection(POReceiptPOOriginal);

	@viewInfo({ containerName: "Billing" })
	apDocs = createCollection(POReceiptAPDoc);

	@viewInfo({ containerName: "Landed Costs" })
	landedCosts = createCollection(POLandedCostReceipt);

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "transactions" })
	onPOReceiptLineChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<POReceiptLine>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.ResetCorrectionLine) {
			model.ResetCorrectionLine.enabled = !!ar?.AllowResetCorrectionLine.value;
		}
	}
}

export class POReceiptHeader extends PXView {
	ReceiptType: PXFieldState;
	ReceiptNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	ReceiptDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoCreateInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	ReturnInventoryCostMode: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState;
	OrderQty: PXFieldState;
	ControlQty: PXFieldState;
	UnbilledQty: PXFieldState;
	CuryOrderTotal: PXFieldState;

	ShowPurchaseOrdersTab: PXFieldState;
	ShowPutAwayHistoryTab: PXFieldState;
	ShowLandedCostsTab: PXFieldState;
}

export class POReceipt extends PXView {
	InventoryRefNbr: PXFieldState<PXFieldOptions.Disabled>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchBaseCuryID: PXFieldState;
	InvoiceDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderNbr: PXFieldState<PXFieldOptions.Disabled>;
	IntercompanyShipmentNbr: PXFieldState<PXFieldOptions.Disabled>;
	IntercompanySOType: PXFieldState;
	IntercompanySONbr: PXFieldState<PXFieldOptions.Disabled>;
	ExcludeFromIntercompanyProc: PXFieldState;
	OrigReceiptNbr: PXFieldState<PXFieldOptions.Disabled>;
	CorrectionReceiptNbr: PXFieldState<PXFieldOptions.Disabled>;
	ReversalInvtRefNbr: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
	allowDragRows: true,
	pasteCommand: "PasteLine",
	statusField: "Availability",
})
export class POReceiptLine extends PXView {
	ResetCorrectionLine: PXActionState;
	POReceiptLineSplittingExtension_ShowSplits: PXActionState;
	AddPOReceiptLine: PXActionState;
	AddPOOrder: PXActionState;
	AddPOOrderLine: PXActionState;
	AddPOReceiptReturn: PXActionState;
	AddPOReceiptLineReturn: PXActionState;
	AddTransfer: PXActionState;
	ViewPOOrder: PXActionState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	OrigOrderQty: PXFieldState;
	OpenOrderQty: PXFieldState;

	@columnConfig({ allowDragDrop: true })
	ReceiptQty: PXFieldState<PXFieldOptions.CommitChanges>;

	ReceivedToDateQty: PXFieldState;
	BaseReceiptQty: PXFieldState;
	UnassignedQty: PXFieldState;
	OrigReceiptNbr: PXFieldState;
	OrigReceiptLineNbr: PXFieldState;
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAcctID_Account_description: PXFieldState;
	ExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SpecialOrderCostCenterID: PXFieldState;

	ExpireDate: PXFieldState;
	LineNbr: PXFieldState;
	SortOrder: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	POType: PXFieldState;
	PONbr: PXFieldState;
	POLineNbr: PXFieldState;
	SOOrderType: PXFieldState;
	SOOrderNbr: PXFieldState;
	SOOrderLineNbr: PXFieldState;
	SOShipmentNbr: PXFieldState;
	AllowComplete: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOpen: PXFieldState<PXFieldOptions.CommitChanges>;
	ReturnedQty: PXFieldState;
	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowEditUnitCost: PXFieldState;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState<PXFieldOptions.CommitChanges>;
	TranCost: PXFieldState;
	TranCostFinal: PXFieldState;
	IsAdjusted: PXFieldState;

	@columnConfig({
		visible: false,
		allowShowHide: GridColumnShowHideMode.False,
		allowFilter: false,
		allowSort: false,
		suppressExport: true,
	})
	AllowResetCorrectionLine: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
})
export class POOrderReceipt extends PXView {
	POType: PXFieldState;
	PONbr: PXFieldState;
	CuryID: PXFieldState;
	TaxZoneID: PXFieldState;
	TaxCalcMode: PXFieldState;
	PayToVendorID: PXFieldState;
	Status: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
})
export class INRegister extends PXView {
	RefNbr: PXFieldState;
	Status: PXFieldState;
	TransferType: PXFieldState;
	TranDate: PXFieldState;
	FinPeriodID: PXFieldState;
	SiteID: PXFieldState;
	TotalQty: PXFieldState;
	BatchNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	pageSize: 15
})
export class POReceiptPOOriginal extends PXView {
	ReceiptType: PXFieldState;
	ReceiptNbr: PXFieldState;
	DocDate: PXFieldState;
	FinPeriodID: PXFieldState;
	Status: PXFieldState;
	TotalQty: PXFieldState;
	InvtDocType: PXFieldState;
	InvtRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
	statusField: "StatusText",
	autoGrowInHeight: GridAutoGrowMode.Fit,
	pageSize: 15
})
export class POReceiptAPDoc extends PXView {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;

	DocType: PXFieldState;
	RefNbr: PXFieldState;
	DocDate: PXFieldState;
	Status: PXFieldState;
	TotalQty: PXFieldState;
	TotalAmt: PXFieldState;
	AccruedQty: PXFieldState;
	AccruedAmt: PXFieldState;
	TotalPPVAmt: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
})
export class POLandedCostReceipt extends PXView {
	LCDocType: PXFieldState;
	LCRefNbr: PXFieldState;
	DocDate: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LandedCostCodeID: PXFieldState;

	CuryLineAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	INRefNbr: PXFieldState;
}

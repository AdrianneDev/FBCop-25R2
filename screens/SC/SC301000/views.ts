import {
	columnConfig,
	controlConfig,
	gridConfig,
	linkCommand,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridAutoGrowMode,
} from "client-controls";

import { NullTextValues } from "src/screens/common/messages";

export class filter extends PXView {
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class poLinesSelection extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	LineType: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	UOM: PXFieldState;
	OrderQty: PXFieldState;
	OpenQty: PXFieldState;
	TranDesc: PXFieldState;
	RcptQtyMin: PXFieldState;
	RcptQtyMax: PXFieldState;
	RcptQtyAction: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class openOrders extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState;
	OrderDate: PXFieldState;
	ExpirationDate: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Status: PXFieldState;
	CuryID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	CuryOrderTotal: PXFieldState;
	VendorRefNbr: PXFieldState;
	TermsID: PXFieldState;
	OrderDesc: PXFieldState;
	@columnConfig({ allowUpdate: false })
	OpenQty: PXFieldState;
	@columnConfig({ allowUpdate: false })
	CuryLeftToReceiveCost: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class FixedDemand extends PXView {
	OrderNbr: PXFieldState;
	RequestDate: PXFieldState;
	CustomerID: PXFieldState;
	SiteID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	UOM: PXFieldState;
	@columnConfig({ allowUpdate: false })
	OrderQty: PXFieldState;
	@columnConfig({ allowUpdate: false })
	POUOM: PXFieldState;
	@columnConfig({ allowUpdate: false })
	POUOMOrderQty: PXFieldState;
	INItemPlan__Active: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class ReplenishmentLines extends PXView {
	RefNbr: PXFieldState;
	OrderDate: PXFieldState;
	UOM: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Qty: PXFieldState;
}

export class Document extends PXView {
	OrderNbr: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.Hidden>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Behavior: PXFieldState;
	RequestApproval: PXFieldState;
	Approved: PXFieldState;
	OrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpectedDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpirationDate: PXFieldState;
	OrderDesc: PXFieldState<PXFieldOptions.Multiline>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true, nullText: NullTextValues.MultipleProjects })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	VendorRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDetailExtCostTotal: PXFieldState;
	CuryLineDiscTotal: PXFieldState;
	CuryDiscTot: PXFieldState;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrderTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryControlTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageTotal: PXFieldState<PXFieldOptions.Disabled>;
}

export class CurrentDocument extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayToVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageApply: PXFieldState<PXFieldOptions.CommitChanges>;
	DefRetainagePct: PXFieldState;
	OwnerWorkgroupID: PXFieldState;
	UnbilledOrderQty: PXFieldState;
	CuryUnbilledOrderTotal: PXFieldState;
	CuryPrepaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnprepaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	DontPrint: PXFieldState;
	Printed: PXFieldState<PXFieldOptions.Disabled>;
	DontEmail: PXFieldState;
	Emailed: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState;
	CuryDiscTot: PXFieldState;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class Transactions extends PXView {
	AddProjectItem: PXActionState;
	AddNew: PXActionState;
	Copy: PXActionState;
	Paste: PXActionState;

	@columnConfig({
		allowShowHide: GridColumnShowHideMode.Server,
		hideViewLink: true
	})
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState;
	CuryDiscAmt: PXFieldState;
	CuryDiscCost: PXFieldState;
	ManualDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState;
	DisplayReqPrepaidQty: PXFieldState;
	CuryReqPrepaidAmt: PXFieldState;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState;
	AlternateID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	LotSerialNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAcctID_Account_description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ExpenseSubID: PXFieldState;
	SortOrder: PXFieldState<PXFieldOptions.Hidden>;
	RequestedDate: PXFieldState;
	PromisedDate: PXFieldState;
	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceivedQty: PXFieldState<PXFieldOptions.Disabled>;
	CompletePOLine: PXFieldState<PXFieldOptions.Hidden>;
	Completed: PXFieldState;
	Cancelled: PXFieldState;
	Closed: PXFieldState;
	BilledQty: PXFieldState;
	CuryBilledAmt: PXFieldState;
	UnbilledQty: PXFieldState;
	CuryUnbilledAmt: PXFieldState;
	BaseOrderQty: PXFieldState;
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class Taxes extends PXView {
	@columnConfig({ allowUpdate: false })
	TaxID: PXFieldState<PXFieldOptions.NoLabel>;
	@columnConfig({ allowUpdate: false })
	TaxRate: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.NoLabel>;
	CuryTaxableAmt: PXFieldState<PXFieldOptions.NoLabel>;
	CuryTaxAmt: PXFieldState<PXFieldOptions.NoLabel>;
	CuryRetainedTaxableAmt: PXFieldState;
	CuryRetainedTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class DiscountDetails extends PXView {
	SkipDiscount: PXFieldState;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.Disabled>;
	IsManual: PXFieldState;
	CuryDiscountableAmt: PXFieldState;
	DiscountableQty: PXFieldState;
	CuryDiscountAmt: PXFieldState;
	CuryRetainedDiscountAmt: PXFieldState;
	DiscountPct: PXFieldState;
	ExtDiscCode: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	statusField: "StatusText"
})
export class APDocs extends PXView {
	DocType: PXFieldState;
	RefNbr: PXFieldState<PXFieldOptions.NoLabel>;
	DocDate: PXFieldState;
	Status: PXFieldState;
	TotalQty: PXFieldState;
	TotalAmt: PXFieldState;
	TotalPPVAmt: PXFieldState;
	CuryID: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	statusField: "StatusText"
})
export class PrepaymentDocuments extends PXView {
	APDocType: PXFieldState;
	APRefNbr: PXFieldState;
	APRegister__DocDate: PXFieldState;
	CuryAppliedAmt: PXFieldState;
	APRegister__CuryDocBal: PXFieldState;
	APRegister__Status: PXFieldState;
	APRegister__CuryID: PXFieldState;
	PayRefNbr: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StatusText: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class ChangeOrderDetails extends PXView {
	@linkCommand("ViewChangeOrder")
	PMChangeOrder__RefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PMChangeOrder__ClassID: PXFieldState;
	PMChangeOrder__ProjectNbr: PXFieldState;
	PMChangeOrder__Status: PXFieldState;
	PMChangeOrder__Description: PXFieldState;
	PMChangeOrder__Date: PXFieldState;
	PMChangeOrder__CompletionDate: PXFieldState;
	PMChangeOrder__DelayDays: PXFieldState;
	@linkCommand("ViewReversingChangeOrders")
	PMChangeOrder__ReversingRefNbr: PXFieldState;
	@linkCommand("ViewOrigChangeOrder")
	PMChangeOrder__OrigRefNbr: PXFieldState;
	PMChangeOrder__ExtRefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	Description: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	UnitCost: PXFieldState;
	Amount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	syncPosition: true,
})
export class ReversingChangeOrders extends PXView {
	@linkCommand("ViewCurrentReversingChangeOrder")
	RefNbr: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false,
})
export class Answers extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		width: 300,
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({
		allowSort: false,
		allowShowHide: GridColumnShowHideMode.False,
		width: 300,
	})
	Value: PXFieldState;
}

export class ItemFilter extends PXView {
	Inventory: PXFieldState<PXFieldOptions.CommitChanges>;
	BarCode: PXFieldState<PXFieldOptions.CommitChanges>;
	OnlyAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClass: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItem: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class ItemInfo extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	QtySelected: PXFieldState;
	SiteID: PXFieldState;
	ItemClassID: PXFieldState;
	ItemClassDescription: PXFieldState;
	PriceClassID: PXFieldState;
	PriceClassDescription: PXFieldState;
	PreferredVendorID: PXFieldState;
	PreferredVendorDescription: PXFieldState;
	InventoryCD: PXFieldState;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	PurchaseUnit: PXFieldState;
	QtyAvailExt: PXFieldState;
	QtyOnHandExt: PXFieldState;
	QtyPOOrdersExt: PXFieldState;
	QtyPOReceiptsExt: PXFieldState;
	AlternateID: PXFieldState;
	AlternateType: PXFieldState;
	AlternateDescr: PXFieldState;
}

export class recalcdiscountsfilter extends PXView {
	RecalcTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ProjectItemFilter extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false
})
export class AvailableProjectItems extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisedQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRevisedAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	ChangeOrderQty: PXFieldState;
	CuryChangeOrderAmount: PXFieldState;
	CommittedQty: PXFieldState;
	CuryCommittedAmount: PXFieldState;
	CommittedReceivedQty: PXFieldState;
	CommittedInvoicedQty: PXFieldState;
	CuryCommittedInvoicedAmount: PXFieldState;
	CommittedOpenQty: PXFieldState;
	CuryCommittedOpenAmount: PXFieldState;
	ActualQty: PXFieldState;
	CuryActualAmount: PXFieldState;
	CuryActualPlusOpenCommittedAmount: PXFieldState;
	CuryVarianceAmount: PXFieldState;
	Performance: PXFieldState;
	IsProduction: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLastCostToComplete: PXFieldState;
	CuryCostToComplete: PXFieldState;
	LastPercentCompleted: PXFieldState;
	PercentCompleted: PXFieldState;
	CuryLastCostAtCompletion: PXFieldState;
	CuryCostAtCompletion: PXFieldState;
	@columnConfig({ hideViewLink: true })
	RevenueTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	RevenueInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

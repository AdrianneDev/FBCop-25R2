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
	CurrencyInfo,
	GridPreset,
	GridColumnShowHideMode,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.RQ.RQRequestEntry",
	primaryView: "Document",
	udfTypeField: "ReqClassID",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
export class RQ301000 extends PXScreen {
	AddSelectedItems: PXActionState;
	RecalculatePricesAction: PXActionState;
	RecalculatePricesActionOk: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	Document = createSingle(RQRequest);

	@viewInfo({ containerName: "Document" })
	CurrentDocument = createSingle(RQRequest2);

	@viewInfo({ containerName: "Currency" })
	_RQRequest_CurrencyInfo_ = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Details" })
	Lines = createCollection(RQRequestLine);

	@viewInfo({containerName: "Ship-To Contact"})
	Shipping_Contact = createSingle(Contact);

	@viewInfo({containerName: "Ship-To Address"})
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Vendor Contact" })
	Remit_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Vendor Address" })
	Remit_Address = createSingle(Address);

	@viewInfo({ containerName: "Details" })
	Budget = createCollection(RQBudget);

	@viewInfo({ containerName: "Recalculate Prices" })
	recalcPricesFilter = createSingle(RecalcDiscountsParamFilter);
}

export class RQRequest extends PXView {
	OrderNbr: PXFieldState;
	ReqClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	OrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Priority: PXFieldState;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DepartmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	CuryEstExtCostTotal: PXFieldState<PXFieldOptions.Disabled>;
	OpenOrderQty: PXFieldState;
}

export class RQRequest2 extends PXView {
	ShipDestType: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipToLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState;
	VendorHidden: PXFieldState;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	BudgetValidation: PXFieldState;
	WorkgroupID: PXFieldState;
	OwnerID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class RQRequestLine extends PXView {
	ShowItems: PXActionState;
	viewDetails: PXActionState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	OrderQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEstUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEstExtCost: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ExpenseSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorName: PXFieldState;
	VendorRefNbr: PXFieldState;
	VendorDescription: PXFieldState;
	AlternateID: PXFieldState;
	RequestedDate: PXFieldState;
	PromisedDate: PXFieldState;
	IssueStatus: PXFieldState;
	Cancelled: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
})
export class RQBudget extends PXView {
	@columnConfig({ hideViewLink: true })
	ExpenseAcctID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExpenseSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DocRequestAmt: PXFieldState;
	RequestAmt: PXFieldState;
	BudgetAmt: PXFieldState;
	UsageAmt: PXFieldState;
	AprovedAmt: PXFieldState;
	UnaprovedAmt: PXFieldState;
}

export class RecalcDiscountsParamFilter extends PXView {
	RecalcTarget: PXFieldState<PXFieldOptions.Disabled>;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
}

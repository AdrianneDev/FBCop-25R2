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
	PXPageLoadBehavior,
	linkCommand,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.InventoryTranByAcctEnq",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class IN403000 extends PXScreen {
	ViewItem: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(InventoryTranByAcctEnqFilter);

	@viewInfo({ containerName: "Transaction Details" })
	ResultRecords = createCollection(InventoryTranByAcctEnqResult);
}

export class InventoryTranByAcctEnqFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ByFinancialPeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PeriodStartDate: PXFieldState;
	PeriodEndDateInclusive: PXFieldState;
	SummaryByDay: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	batchUpdate: true,
	quickFilterFields: ["InventoryID", "SiteID", "SubID"],
})
export class InventoryTranByAcctEnqResult extends PXView {
	GridLineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	TranType: PXFieldState;
	DocRefNbr: PXFieldState;

	@linkCommand("ViewItem")
	InventoryID: PXFieldState;

	SubItemCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	CostAdj: PXFieldState;
	TranDate: PXFieldState;
	BegBalance: PXFieldState;
	Debit: PXFieldState;
	Credit: PXFieldState;
	EndBalance: PXFieldState;
	FinPerNbr: PXFieldState;
	TranPerNbr: PXFieldState;
	Qty: PXFieldState;
	UnitCost: PXFieldState;

	InventoryID_InventoryItem_Descr: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	INTran__SOOrderType: PXFieldState;

	INTran__SOOrderNbr: PXFieldState;
	INTran__POReceiptNbr: PXFieldState;

	ReceiptNbr: PXFieldState;
	CreatedDateTime: PXFieldState;
}
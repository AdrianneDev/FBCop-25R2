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
	GridNoteFilesShowMode,
	GridColumnShowHideMode,
	PXPageLoadBehavior,
	linkCommand,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POAccrualInquiry",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class PO402000 extends PXScreen {
	ViewDocument: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(POAccrualInquiryFilter);

	@viewInfo({ containerName: "Documents" })
	ResultRecords = createCollection(POAccrualInquiryResult);
}

export class POAccrualInquiryFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	AcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowByLines: PXFieldState<PXFieldOptions.CommitChanges>;
	UnbilledAmt: PXFieldState;
	NotReceivedAmt: PXFieldState;
	NotInvoicedAmt: PXFieldState;
	NotAdjustedAmt: PXFieldState;
	Balance: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class POAccrualInquiryResult extends PXView {
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	DocumentType: PXFieldState;

	@linkCommand("ViewDocument")
	DocumentNbr: PXFieldState;

	LineNbr: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true }) VendorID: PXFieldState;
	VendorName: PXFieldState;

	INDocType: PXFieldState;
	INRefNbr: PXFieldState;
	FinPeriodID: PXFieldState;
	PPVAdjRefNbr: PXFieldState;
	TaxAdjRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	InventoryID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	TranDesc: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	UOM: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	OrderQty: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	UnbilledQty: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	NotReceivedQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AcctID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	UnbilledAmt: PXFieldState;
	NotReceivedAmt: PXFieldState;
	NotInvoicedAmt: PXFieldState;
	NotAdjustedAmt: PXFieldState;
	AccrualAmt: PXFieldState;
}
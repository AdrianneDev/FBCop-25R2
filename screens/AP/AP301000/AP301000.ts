import {
	PXScreen, createSingle, createCollection, graphInfo, PXActionState, PXView, PXFieldState, controlConfig,
	columnConfig, PXFieldOptions, linkCommand, viewInfo, CurrencyInfo, gridConfig, GridPreset, GridColumnDisplayMode, GridAutoGrowMode,
	handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection, CellCssHandlerArgs, ISelectorControlConfig,
} from "client-controls";

import { DuplicateFilter } from "src/screens/common/panel-duplicate-reference/panel-duplicate-reference";

import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.Objects.AP.APInvoiceEntry", primaryView: "Document", udfTypeField: "DocType",
	showActivitiesIndicator: true, bpEventsIndicator: true, showUDFIndicator: true,
})
export class AP301000 extends PXScreen {

	ViewPurchaseOrder: PXActionState;
	ViewSubcontract: PXActionState;
	ViewPayment: PXActionState;
	ViewInvoice: PXActionState;
	ViewRetainageDocument: PXActionState;
	OpenFSDocument: PXActionState;

	VoidInvoice: PXActionState;
	ReverseInvoice: PXActionState;
	ReclassifyBatch: PXActionState;
	VendorRefund: PXActionState;
	VoidDocument: PXActionState;
	ViewBatch: PXActionState;
	ViewOriginalDocument: PXActionState;

	ViewVoucherBatch: PXActionState;
	ViewWorkBook: PXActionState;
	NewVendor: PXActionState;
	EditVendor: PXActionState;
	VendorDocuments: PXActionState;
	AddPOReceipt2: PXActionState;
	AddReceiptLine2: PXActionState;
	AddPOOrder2: PXActionState;
	AddPOOrderLine2: PXActionState;

	AddSubcontracts: PXActionState;
	AddSubcontractLine: PXActionState;
	AddLandedCost2: PXActionState;

	ViewPODocument: PXActionState;
	CurrencyView: PXActionState;
	ViewApPayment: PXActionState;
	AdjustJointAmounts: PXActionState;
	AddPostLandedCostTran: PXActionState;
	RecalcOk: PXActionState;
	ReleaseRetainage: PXActionState;
	ViewSourceDocument: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	Document = createSingle(APInvoice);

	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(APTran);

	@viewInfo({ containerName: "Current Document" })
	CurrentDocument = createSingle(APInvoice_CurrentDocument);

	Taxes = createCollection(APTaxTran);

	@viewInfo({ containerName: "Discounts" })
	DiscountDetails = createCollection(APInvoiceDiscountDetail);

	@viewInfo({ containerName: "Retainage" })
	RetainageDocuments = createCollection(APRetainageInvoice);

	@viewInfo({ containerName: "Applications" })
	Adjustments = createCollection(APAdjust);

	@viewInfo({ containerName: "Applications" })
	Adjustments_1 = createCollection(APAdjust_1);

	@viewInfo({ containerName: "Duplicate Reference Nbr." })
	duplicatefilter = createSingle(DuplicateFilter);

	@viewInfo({ containerName: "Recalculate Prices" })
	recalcdiscountsfilter = createSingle(RecalcDiscountsParamFilter);

	@viewInfo({ containerName: "Document Summary -> Rate Selection" })
	currencyinfo = createSingle(CurrencyInfo);

	@handleEvent(CustomEventType.RowSelected, { view: "Transactions" })
	onAPTranSelected(args: RowSelectedHandlerArgs<PXViewCollection<APTran>>) {
		const model = args.viewModel;
		const row = args.viewModel.activeRow;

		model.ViewSchedule.enabled = !!row;
		model.LinkLine.enabled = !!row;
		model.ViewItem.enabled = !!row;
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "Transactions", allColumns: true })
	setGreenBackgroundForReclassifyBills(args: CellCssHandlerArgs<PXViewCollection<APTran>>) {
		const row = args?.viewModel?.activeRow;
		const columnId = args?.selector?.columnId;
		if (!row || !columnId) return undefined;
		const targetColumns = [
			row.ProjectID?.name,
			row.TaskID?.name,
			row.CostCodeID?.name,
			row.AccountID?.name,
			row.SubID?.name,
			row.POLineNbr?.name,
			row.SubcontractLineNbr?.name
		];
		if (targetColumns.indexOf(columnId) !== -1 && row[columnId]?.enabled === true) {
			const screen = args?.screenModel as AP301000;
			const status = screen?.Document?.Status?.value;
			if (status === "X") return "good"; // see qp-grid.css
		}
		return undefined;
	}
}

export class APInvoice extends PXView {

	DocType: PXFieldState;

	@controlConfig<ISelectorControlConfig>({
		fastFilterFields: ["RefNbr", "APInvoice__InvoiceNbr", "VendorID", "VendorID_Vendor_acctName", "DocDesc"]
	})
	RefNbr: PXFieldState;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ rows: 2 })
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;

	@controlConfig({ allowEdit: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryID: PXFieldState;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({
		allowEdit: true,
		nullText: NullTextValues.MultipleProjects
	})
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	DueDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsRetainageDocument: PXFieldState<PXFieldOptions.Disabled>;
	RetainageApply: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentsByLinesAllowed: PXFieldState<PXFieldOptions.CommitChanges>;
	IsJointPayees: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDetailExtPriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscTot: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineRetainageTotal: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState;
	CuryOrigWhTaxAmt: PXFieldState;
	CuryInitDocBal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRoundDiff: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDocBal_Label: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryOrigDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class APInvoice_CurrentDocument extends PXView {

	@controlConfig({ allowEdit: true })
	BatchNbr: PXFieldState;

	@controlConfig({ allowEdit: true })
	PrebookBatchNbr: PXFieldState;

	@controlConfig({ allowEdit: true })
	VoidBatchNbr: PXFieldState;

	DisplayCuryInitDocBal: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	APAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	APSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentSubID: PXFieldState;
	PrebookAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrebookSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageSubID: PXFieldState;

	@controlConfig({ linkCommand: "ViewOriginalDocument" })
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	EmployeeWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	SeparateCheck: PXFieldState;
	PaySel: PXFieldState<PXFieldOptions.CommitChanges>;
	PayDate: PXFieldState;
	PayLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	TaxCostINAdjRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	CuryVatTaxableTotal: PXFieldState;
	CuryVatExemptTotal: PXFieldState;

	@controlConfig({ allowEdit: true })
	SuppliedByVendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	SuppliedByVendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	IntercompanyInvoiceNoteID: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryDiscountedDocTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscountedTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDiscountedPrice: PXFieldState<PXFieldOptions.Disabled>;

	DefRetainagePct: PXFieldState;
	CuryOrigDocAmtWithRetainageTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageUnreleasedAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageReleased: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainageUnpaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainagePaidTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainedTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRetainedDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoInsert: true })
export class APTran extends PXView {

	ViewSchedule: PXActionState;
	AddPOReceipt: PXActionState;
	AddReceiptLine: PXActionState;
	AddPOOrder: PXActionState;
	AddSubcontracts: PXActionState;
	AddPOOrderLine: PXActionState;
	AddSubcontractLines: PXActionState;
	AddLandedCost: PXActionState;
	LinkLine: PXActionState;
	ViewItem: PXActionState;


	SubcontractLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	LineNbr: PXFieldState;
	SortOrder: PXFieldState;

	@linkCommand("ViewItem")
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	SubItemID: PXFieldState;
	TranDesc: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualDisc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;

	DiscountSequenceID: PXFieldState;
	PrepaymentPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPrepaymentAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryCashDiscBal: PXFieldState;
	CuryRetainageAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRetainageBal: PXFieldState;
	CuryRetainedTaxAmt: PXFieldState;
	CuryTranAmt: PXFieldState;
	CuryTranBal: PXFieldState;
	CuryOrigTaxAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	AccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;

	T5018Service: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	NonBillable: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	Box1099: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;

	DefScheduleID: PXFieldState;
	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	Date: PXFieldState;
	POOrderType: PXFieldState;

	@linkCommand("ViewPurchaseOrder")
	PONbr: PXFieldState;

	@linkCommand("ViewSubcontract")
	SubcontractNbr: PXFieldState;

	POLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	LCDocType: PXFieldState;
	LCRefNbr: PXFieldState;
	LCLineNbr: PXFieldState;
	ReceiptType: PXFieldState;
	ReceiptNbr: PXFieldState;
	ReceiptLineNbr: PXFieldState;
	RelatedEntityType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, fullState: true })
	@linkCommand("OpenFSDocument")
	RelatedDocNoteID: PXFieldState<PXFieldOptions.CommitChanges>;

	PPVDocType: PXFieldState;
	PPVRefNbr: PXFieldState;
	ExpectedPPVAmount: PXFieldState;
	HasExpiredComplianceDocuments: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill, repaintColumns: true })
export class APTaxTran extends PXView {

	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	CuryRetainedTaxableAmt: PXFieldState;
	CuryRetainedTaxAmt: PXFieldState;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
	CuryDiscountedTaxableAmt: PXFieldState;
	CuryDiscountedPrice: PXFieldState;
	CuryAdjustedTaxableAmt: PXFieldState;
	CuryAdjustedTaxAmt: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class APInvoiceDiscountDetail extends PXView {

	SkipDiscount: PXFieldState;
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSequenceID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState;
	IsManual: PXFieldState;
	CuryDiscountableAmt: PXFieldState;
	DiscountableQty: PXFieldState;
	CuryDiscountAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountPct: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtDiscCode: PXFieldState;
	Description: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class APRetainageInvoice extends PXView {

	DocType: PXFieldState;

	@linkCommand("ViewRetainageDocument")
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	Status: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APInvoice__PayTypeID: PXFieldState;

	APInvoice__InvoiceNbr: PXFieldState;
	DocDesc: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class APAdjust extends PXView {

	AutoApply: PXActionState;

	@columnConfig({ hideViewLink: true })
	AdjgBranchID: PXFieldState;

	DisplayDocType: PXFieldState;

	@linkCommand("ViewPayment")
	DisplayRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryAdjdAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjdPPDAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayDocDate: PXFieldState;
	CuryDocBal: PXFieldState;
	DisplayDocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DisplayFinPeriodID: PXFieldState;

	APPayment__ExtRefNbr: PXFieldState;
	AdjdDocType: PXFieldState;
	AdjdRefNbr: PXFieldState;
	DisplayStatus: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class APAdjust_1 extends PXView {

	AutoApply: PXActionState;

	@columnConfig({ hideViewLink: true })
	AdjgBranchID: PXFieldState;

	DisplayDocType: PXFieldState;

	@linkCommand("ViewInvoice")
	DisplayRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryAdjdAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjdPPDAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayDocDate: PXFieldState;
	CuryDocBal: PXFieldState;
	DisplayDocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DisplayFinPeriodID: PXFieldState;

	APPayment__ExtRefNbr: PXFieldState;
	AdjdDocType: PXFieldState;
	AdjdRefNbr: PXFieldState;
	DisplayStatus: PXFieldState;

}

export class RecalcDiscountsParamFilter extends PXView {

	RecalcTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDocGroupDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;

}

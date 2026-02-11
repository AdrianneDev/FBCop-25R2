import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, controlConfig, columnConfig, createCollection,
	linkCommand, PXActionState, GridColumnShowHideMode, gridConfig, GridPreset, GridColumnDisplayMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APSetupMaint", primaryView: "Setup" })
export class AP101000 extends PXScreen {

	ViewAssignmentMap: PXActionState;

	Setup = createSingle(APSetup);
	SetupApproval = createCollection(APSetupApproval);
	Boxes1099 = createCollection(AP1099Box);
}

export class APSetup extends PXView {

	// Numbering Settings

	@controlConfig({ allowEdit: true })
	BatchNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	InvoiceNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	DebitAdjNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CreditAdjNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CheckNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PriceWSNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PrepaymentInvoiceNumberingID: PXFieldState;

	// Posting Settings
	AutoPost: PXFieldState;
	SummaryPost: PXFieldState;
	MigrationMode: PXFieldState<PXFieldOptions.CommitChanges>;
	ReclassifyInvoices: PXFieldState<PXFieldOptions.CommitChanges>;

	// Aging Settings
	PastDue00: PXFieldState;
	PastDue01: PXFieldState;
	PastDue02: PXFieldState;

	// Data Entry Settings
	@controlConfig({ allowEdit: true })
	DfltVendorClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	ExpenseSubMask: PXFieldState;
	IntercompanyExpenseAccountDefault: PXFieldState;
	InvoiceRounding: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoicePrecision: PXFieldState;

	PaymentLeadTime: PXFieldState;

	HoldEntry: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireApprovePayments: PXFieldState;
	EarlyChecks: PXFieldState;
	RequireControlTotal: PXFieldState;
	RequireControlTaxTotal: PXFieldState;
	SuggestPaymentAmount: PXFieldState;
	RequireVendorRef: PXFieldState;
	RaiseErrorOnDoubleInvoiceNbr: PXFieldState;
	TermsInDebitAdjustments: PXFieldState;

	// Retainage Settings
	RetainTaxes: PXFieldState;
	RetainageBillsAutoRelease: PXFieldState;

	// VAT Recalculation Settings
	PPDDebitAdjustmentDescr: PXFieldState;

	// Pricing
	VendorPriceUpdate: PXFieldState;

	LoadVendorsPricesUsingAlternateID: PXFieldState;
	RetentionType: PXFieldState<PXFieldOptions.CommitChanges>;

	NumberOfMonths: PXFieldState<PXFieldOptions.CommitChanges>;

	ApplyQuantityDiscountBy: PXFieldState;

	// 1099
	@controlConfig({ allowEdit: true })
	PrintDirectSalesOn: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class APSetupApproval extends PXView {

	IsActive: PXFieldState;
	DocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewAssignmentMap")
	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AssignmentNotificationID: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class AP1099Box extends PXView {

	@columnConfig({ hideViewLink: true })
	BoxNbr: PXFieldState;

	Descr: PXFieldState;
	MinReportAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

}

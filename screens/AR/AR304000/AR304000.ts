import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo,
	PXView, PXFieldState, gridConfig, CurrencyInfo, PXFieldOptions, columnConfig,
	GridColumnShowHideMode, GridPreset, controlConfig, GridAutoGrowMode, ISelectorControlConfig
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.AR.ARCashSaleEntry", primaryView: "Document",
	udfTypeField: "DocType", showUDFIndicator: true,
	showActivitiesIndicator: true,
	bpEventsIndicator: true,
})
export class AR304000 extends PXScreen {

	SendARInvoiceMemo: PXActionState;
	ViewOriginalDocument: PXActionState;

	@viewInfo({ containerName: "Invoice Summary" })
	Document = createSingle(ARRegister);

	@viewInfo({containerName: "Current Document"})
	CurrentDocument = createSingle(ARRegister2);

	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(ARTran);

	@viewInfo({ containerName: "Addresses -> Bill-To Contact" })
	Billing_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Addresses -> Bill-To Address" })
	Billing_Address = createSingle(Address);

	@viewInfo({ containerName: "Addresses -> Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Addresses -> Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(TaxTran);

	@viewInfo({ containerName: "Commissions" })
	salesPerTrans = createCollection(ARSalesPerTran);

	@viewInfo({ containerName: "Charges" })
	PaymentCharges = createCollection(ARPaymentChargeTran);

	@viewInfo({ containerName: "Card Processing" })
	ccProcTran = createCollection(CCProcTran);

	@viewInfo({ containerName: "Invoice Summary -> Rate Selection" })
	CurrencyInfo = createSingle(CurrencyInfo);

}

export class ARRegister extends PXView {

	DocType: PXFieldState;

	@controlConfig<ISelectorControlConfig>({
		fastFilterFields: ["RefNbr", "ExtRefNbr", "CustomerID", "CustomerID_Customer_acctName"]
	})
	RefNbr: PXFieldState;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	AdjDate: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	DepositAfter: PXFieldState;

	@controlConfig({ rows: 2 })
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;

	@controlConfig({ allowEdit: true })
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	TerminalID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;
	CCPaymentStateDescr: PXFieldState<PXFieldOptions.Disabled>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryDetailExtPriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineDiscTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryRoundDiff: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryChargeAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryConsolidateChargeTotal: PXFieldState<PXFieldOptions.Disabled>;
	RefTranExtNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
}

export class ARRegister2 extends PXView {

	@controlConfig({ allowEdit: true })
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARSubID: PXFieldState;

	@controlConfig({ linkCommand: "ViewOriginalDocument" })
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Printed: PXFieldState<PXFieldOptions.Disabled>;
	DontPrint: PXFieldState;
	Emailed: PXFieldState<PXFieldOptions.Disabled>;
	DontEmail: PXFieldState;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	Cleared: PXFieldState<PXFieldOptions.CommitChanges>;
	ClearDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DepositAsBatch: PXFieldState<PXFieldOptions.CommitChanges>;
	Deposited: PXFieldState;
	DepositDate: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	DepositNbr: PXFieldState;

	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	AvalaraCustomerUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryCommnblAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryCommnAmt: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class ARTran extends PXView {

	ViewSchedule: PXActionState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState;
	CuryDiscAmt: PXFieldState;
	CuryTranAmt: PXFieldState;
	ManualDisc: PXFieldState;
	SkipLineDiscounts: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SalesPersonID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	DefScheduleID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermStartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DRTermEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Commissionable: PXFieldState<PXFieldOptions.CommitChanges>;
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryUnitPriceDR: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	DiscPctDR: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class TaxTran extends PXView {

	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;
	CuryExemptedAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, allowDelete: false, allowInsert: false, autoGrowInHeight: GridAutoGrowMode.Fill })
export class ARSalesPerTran extends PXView {
	SalespersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	CommnPct: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	CommnAmt: PXFieldState<PXFieldOptions.Hidden>;
	CuryCommnAmt: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	CommnblAmt: PXFieldState<PXFieldOptions.Hidden>;
	CuryCommnblAmt: PXFieldState;
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	AdjdDocType: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({ preset: GridPreset.Details })
export class ARPaymentChargeTran extends PXView {

	@columnConfig({ hideViewLink: true })
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	CuryTranAmt: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class CCProcTran extends PXView {

	TranNbr: PXFieldState;
	ProcessingCenterID: PXFieldState;
	TranType: PXFieldState;
	TranStatus: PXFieldState;
	Amount: PXFieldState;
	RefTranNbr: PXFieldState;
	MaskedCardNumber: PXFieldState;
	PCTranNumber: PXFieldState;
	AuthNumber: PXFieldState;
	PCResponseReasonText: PXFieldState;
	StartTime: PXFieldState;
	ProcStatus: PXFieldState;
	CVVVerificationStatus: PXFieldState;
}

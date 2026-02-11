import { observable } from "aurelia-binding";
import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, CurrencyInfo,
	PXFieldOptions, columnConfig, controlConfig, PXActionState, GridPreset, GridAutoGrowMode, headerDescription,
	HeaderDescription, handleEvent, CustomEventType, QpGridCustomElement, RowSelectedHandlerArgs, PXViewCollection,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CATranEntry", primaryView: "CAAdjRecords", udfTypeField: "AdjTranType", showUDFIndicator: true, showActivitiesIndicator: true, bpEventsIndicator: true })
export class CA304000 extends PXScreen {

	CAReversingTransactions: PXActionState;

	@viewInfo({ containerName: "Transaction Summary" })
	CAAdjRecords = createSingle(CAAdj);

	@viewInfo({ containerName: "Current Document" })
	CurrentDocument = createSingle(CAAdj2);

	@viewInfo({ containerName: "Details" })
	CASplitRecords = createCollection(CASplit);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(TaxTran);

	@viewInfo({ containerName: "Transaction Summary -> Rate Selection" })
	Currencyinfo = createSingle(CurrencyInfo);

	@observable
	splitRecordsVM: QpGridCustomElement;

	@handleEvent(CustomEventType.RowSelected, { view: "CASplitRecords" })
	onCASplitSelected(args: RowSelectedHandlerArgs<PXViewCollection<CASplit>>) {
		// Equivalent to AutoInsertField="CuryTranAmt" syntax from ASPX screen
		const row = args.viewModel.activeRow;
		const autoInsert = !!(row?.CuryTranAmt?.value);
		this.splitRecordsVM.config.autoInsert = autoInsert;
	}

}

export class CAAdj extends PXView {

	@headerDescription
	AdjRefNbr: PXFieldState;

	@headerDescription(HeaderDescription.ShowKeyAndDescription)
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	Approved: PXFieldState<PXFieldOptions.Disabled>;
	TranDesc: PXFieldState<PXFieldOptions.Multiline>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	DrCr: PXFieldState<PXFieldOptions.Disabled>;
	ExtRefNbr: PXFieldState;
	EmployeeID: PXFieldState;

	@controlConfig({ allowEdit: true })
	OrigAdjRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ linkCommand: "CAReversingTransactions" })
	ReverseCount: PXFieldState<PXFieldOptions.Disabled>;

	CuryTranAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxRoundDiff: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState;
	CuryControlAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class CAAdj2 extends PXView {

	@controlConfig({ allowEdit: true })
	TranID_CATran_batchNbr: PXFieldState<PXFieldOptions.Disabled>;

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	DepositAfter: PXFieldState<PXFieldOptions.CommitChanges>;
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
	EntityUsageType: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class CASplit extends PXView {

	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	UOM: PXFieldState;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	AccountID_description: PXFieldState;
	@columnConfig({hideViewLink: true})
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	NonBillable: PXFieldState;
	@columnConfig({hideViewLink: true})
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class TaxTran extends PXView {

	@columnConfig({ allowUpdate: false })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false, })
	TaxRate: PXFieldState;

	CuryTaxableAmt: PXFieldState;
	CuryTaxAmt: PXFieldState;
	CuryExemptedAmt: PXFieldState;
	NonDeductibleTaxRate: PXFieldState;
	CuryExpenseAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;

}

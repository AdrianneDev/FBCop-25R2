import {
	PXScreen, createSingle, createCollection, graphInfo, PXPageLoadBehavior, PXView, PXFieldState, PXFieldOptions, columnConfig,
	GridColumnShowHideMode, linkCommand, PXActionState, gridConfig, GridColumnDisplayMode, GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APDocumentEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AP402000 extends PXScreen {

	ViewDocument: PXActionState;
	ViewOriginalDocument: PXActionState;

	Filter = createSingle(APDocumentFilter);
	Documents = createCollection(APDocumentResult);
}

export class APDocumentFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;

	ShowAllDocs: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeUnreleased: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;

	BalanceSummary: PXFieldState;
	VendorBalance: PXFieldState;
	VendorDepositsBalance: PXFieldState;
	Difference: PXFieldState;
	VendorRetainedBalance: PXFieldState;

	BalanceSummary_Label: PXFieldState;
	VendorBalance_Label: PXFieldState;
	VendorDepositsBalance_Label: PXFieldState;
	Difference_Label: PXFieldState;
	VendorRetainedBalance_Label: PXFieldState;

	CuryBalanceSummary: PXFieldState;
	CuryVendorBalance: PXFieldState;
	CuryVendorDepositsBalance: PXFieldState;
	CuryDifference: PXFieldState;
	CuryVendorRetainedBalance: PXFieldState;

	CuryBalanceSummary_Label: PXFieldState;
	CuryVendorBalance_Label: PXFieldState;
	CuryVendorDepositsBalance_Label: PXFieldState;
	CuryDifference_Label: PXFieldState;
	CuryVendorRetainedBalance_Label: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	actionsConfig:
	{
		refresh: { hidden: true }
	}
})
export class APDocumentResult extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true, allowFilter: false, allowSort: false })
	APAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true, allowFilter: false, allowSort: false })
	APSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryBegBalance: PXFieldState;

	CuryDocBal: PXFieldState;
	CuryDiscActTaken: PXFieldState;
	CuryTaxWheld: PXFieldState;
	CuryRetainageTotal: PXFieldState;
	CuryOrigDocAmtWithRetainageTotal: PXFieldState;
	CuryRetainageUnreleasedAmt: PXFieldState;
	OrigDocAmt: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	BegBalance: PXFieldState;

	DocBal: PXFieldState;
	DiscActTaken: PXFieldState;
	TaxWheld: PXFieldState;
	RetainageTotal: PXFieldState;
	OrigDocAmtWithRetainageTotal: PXFieldState;
	RetainageUnreleasedAmt: PXFieldState;
	IsRetainageDocument: PXFieldState;

	@linkCommand("ViewOriginalDocument")
	OrigRefNbr: PXFieldState;

	RGOLAmt: PXFieldState;
	PaymentMethodID: PXFieldState;
	ExtRefNbr: PXFieldState;
	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	SuppliedByVendorID: PXFieldState;

}

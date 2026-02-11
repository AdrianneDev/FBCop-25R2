import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, columnConfig, linkCommand, PXActionState, gridConfig, GridColumnDisplayMode, GridPreset, PXPageLoadBehavior,
	fieldConfig
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AR.ARDocumentEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AR402000 extends PXScreen {

	ViewDocument: PXActionState;
	ViewOriginalDocument: PXActionState;

	Filter = createSingle(ARDocumentFilter);
	Documents = createCollection(ARDocumentResult);
}

export class ARDocumentFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Period: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAllDocs: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeUnreleased: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeChildAccounts: PXFieldState<PXFieldOptions.CommitChanges>;

	BalanceSummary: PXFieldState;
	CustomerBalance: PXFieldState;
	CustomerDepositsBalance: PXFieldState;
	Difference: PXFieldState;
	CustomerRetainedBalance: PXFieldState;

	@fieldConfig({hideInExport: true})
	BalanceSummary_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	CustomerBalance_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	CustomerDepositsBalance_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	Difference_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	CustomerRetainedBalance_Label: PXFieldState;
	CuryBalanceSummary: PXFieldState;
	CuryCustomerBalance: PXFieldState;
	CuryCustomerDepositsBalance: PXFieldState;
	CuryDifference: PXFieldState;
	CuryCustomerRetainedBalance: PXFieldState;

	@fieldConfig({hideInExport: true})
	CuryBalanceSummary_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	CuryCustomerBalance_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	CuryCustomerDepositsBalance_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	CuryDifference_Label: PXFieldState;
	@fieldConfig({hideInExport: true})
	CuryCustomerRetainedBalance_Label: PXFieldState;
}


@gridConfig(
	{
		preset: GridPreset.Inquiry,
		quickFilterFields: ["RefNbr", "ExtRefNbr", "DocDesc"],
		actionsConfig:
		{
			refresh: { hidden: true }
		}
	})
export class ARDocumentResult extends PXView {

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	CustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	DocDate: PXFieldState;
	DueDate: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ hideViewLink: true, allowFilter: false, allowSort: false })
	ARAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true, allowFilter: false, allowSort: false })
	ARSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;
	CuryBegBalance: PXFieldState;
	CuryDocBal: PXFieldState;
	CuryDiscActTaken: PXFieldState;
	CuryWOAmt: PXFieldState;
	CuryRetainageTotal: PXFieldState;
	CuryOrigDocAmtWithRetainageTotal: PXFieldState;
	CuryRetainageUnreleasedAmt: PXFieldState;
	OrigDocAmt: PXFieldState;
	BegBalance: PXFieldState;
	DocBal: PXFieldState;
	DiscActTaken: PXFieldState;
	WOAmt: PXFieldState;
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
}

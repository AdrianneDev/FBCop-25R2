import {
	PXScreen, PXView,
	PXFieldState, PXFieldOptions, GridColumnShowHideMode,
	createCollection, createSingle, gridConfig, graphInfo, PXPageLoadBehavior, columnConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.PaymentReclassifyProcess", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class CA506500 extends PXScreen {
	Filter = createSingle(Filter);
	Adjustments = createCollection(CASplitExt);
}

export class Filter extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeUnreleased: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowReclassified: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyDescriptionfromDetails: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class CASplitExt extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;

	ExtRefNbr: PXFieldState;
	TranDate: PXFieldState;
	AdjRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DrCr: PXFieldState;
	FinPeriodID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReclassCashAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	SubID: PXFieldState;
	CuryTranAmt: PXFieldState;
	TranAmt: PXFieldState;
	Cleared: PXFieldState;
	OrigModule: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ChildOrigTranType: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ChildOrigRefNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ReferenceID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ReferenceID_BAccountR_AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;

	PMInstanceID: PXFieldState;
	TranDesc: PXFieldState;
}

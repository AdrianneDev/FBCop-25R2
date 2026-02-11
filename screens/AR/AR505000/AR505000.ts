import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, PXPageLoadBehavior, PXView,
	PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARCreateWriteOff", primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class AR505000 extends PXScreen {

	showCustomer: PXActionState;
	editDetail: PXActionState;
	editCustomer: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(ARWriteOffFilter);
	@viewInfo({ containerName: "Documents" })
	ARDocumentList = createCollection(ARRegister);
}

export class ARWriteOffFilter extends PXView {

	WOType: PXFieldState<PXFieldOptions.CommitChanges>;
	WODate: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	WOFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	WOLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	SelTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Processing })
export class ARRegister extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DocType: PXFieldState;

	@linkCommand("editDetail")
	RefNbr: PXFieldState;

	@linkCommand("editCustomer")
	CustomerID: PXFieldState;

	CustomerID_BAccountR_acctName: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryDocBal: PXFieldState;

	DocBal: PXFieldState;
	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReasonCode: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryOrigDocAmt: PXFieldState;

	OrigDocAmt: PXFieldState;
}

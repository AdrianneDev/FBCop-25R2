import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, controlConfig,
	PXFieldOptions, gridConfig, columnConfig, GridPreset,
} from "client-controls";

@graphInfo({graphType: "PX.Objects.CM.RevalueGLAccounts", primaryView: "Filter", })
export class CM506000 extends PXScreen {

	Filter = createSingle(RevalueFilter);
	GLAccountList = createCollection(GLHistory);

}

export class RevalueFilter extends PXView  {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEffDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ rows: 2 })
	Description: PXFieldState<PXFieldOptions.Multiline>;

	TotalRevalued_Label: PXFieldState<PXFieldOptions.Disabled>;
	TotalRevalued: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Processing })
export class GLHistory extends PXView  {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	AccountID_Account_Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryRateTypeID: PXFieldState;

	CuryRate: PXFieldState;
	CuryFinYtdBalance: PXFieldState;
	FinYtdBalance: PXFieldState;
	FinYtdRevalued: PXFieldState;
	FinPtdRevalued: PXFieldState;
	LastRevaluedFinPeriodID: PXFieldState;

}

import {
	PXView, createSingle, PXFieldState, graphInfo, PXPageLoadBehavior, PXScreen, createCollection, PXFieldOptions,
	linkCommand, PXActionState, columnConfig, gridConfig, GridPreset, GridColumnShowHideMode,
} from "client-controls";
import { autoinject } from "aurelia-framework";

@graphInfo({ graphType: "PX.Objects.GL.AccountHistoryEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
@autoinject
export class GL401000 extends PXScreen {

	ViewDetails: PXActionState;
	Filter = createSingle(GLHistoryEnqFilter);

	EnqResult = createCollection(GLHistoryEnquiryResult);
}

export class GLHistoryEnqFilter extends PXView {

	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Inquiry })
export class GLHistoryEnquiryResult extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@linkCommand("ViewDetails")
	AccountCD: PXFieldState;

	Type: PXFieldState;
	Description: PXFieldState;
	LastActivityPeriod: PXFieldState;
	SignBegBalance: PXFieldState;
	PtdDebitTotal: PXFieldState;
	PtdCreditTotal: PXFieldState;
	SignEndBalance: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	PtdSaldo: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ConsolAccountCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountClassID: PXFieldState;
}

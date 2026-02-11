import { autoinject } from "aurelia-framework";
import {
	PXScreen, createCollection, graphInfo, PXView, createSingle, PXFieldState, PXFieldOptions,
	PXActionState, gridConfig, GridPreset, columnConfig, GridFilterBarVisibility,
	viewInfo
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.AccountMaint",
	primaryView: "AccountRecords",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
@autoinject
export class GL202500 extends PXScreen {
	AccountRecords = createCollection(AccountRecords);

	@viewInfo({ syncAlways: true })
	AccountTypeChangePrepare = createSingle(AccountTypeChangePrepare);
}

@gridConfig({
	preset: GridPreset.Primary, initNewRow: true, showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["AccountClassID", "Type", "PostOption", "CuryID"]
})
export class AccountRecords extends PXView {

	AccountByPeriodEnq: PXActionState;

	AccountID: PXFieldState;
	AccountCD: PXFieldState;
	AccountClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Active: PXFieldState;
	Description: PXFieldState;
	ControlAccountModule: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowManualEntry: PXFieldState<PXFieldOptions.CommitChanges>;
	PostOption: PXFieldState;
	COAOrder: PXFieldState;
	IsCashAccount: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevalCuryRateTypeId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) GLConsolAccountCD: PXFieldState;
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCategoryID: PXFieldState;
	NoSubDetail: PXFieldState;
	RequireUnits: PXFieldState;
	Secured: PXFieldState;
}

export class AccountTypeChangePrepare extends PXView {
	Message: PXFieldState;
}

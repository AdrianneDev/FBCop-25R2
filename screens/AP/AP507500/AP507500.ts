import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, createCollection, createSingle, PXScreen,
	graphInfo, PXPageLoadBehavior, PXActionState, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AP.MISC1099EFileProcessing",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class AP507500 extends PXScreen {

	Filter = createSingle(MISC1099EFileFilter);
	Records = createCollection(MISC1099EFileProcessingInfo);

}

export class MISC1099EFileFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinYear: PXFieldState<PXFieldOptions.CommitChanges>;
	FileFormat: PXFieldState<PXFieldOptions.CommitChanges>;
	Include: PXFieldState<PXFieldOptions.CommitChanges>;
	Box7: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPriorYear: PXFieldState;
	IsCorrectionReturn: PXFieldState;
	IsLastFiling: PXFieldState;
	ReportingDirectSalesOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	IsTestMode: PXFieldState;
}

@gridConfig({ preset: GridPreset.Processing })
export class MISC1099EFileProcessingInfo extends PXView {

	view1099Summary: PXActionState;

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	VAcctCD: PXFieldState;
	VAcctName: PXFieldState;
	HistAmt: PXFieldState;
	LTaxRegistrationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayerBAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	State: PXFieldState<PXFieldOptions.Hidden>;
}

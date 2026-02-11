import { createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridPreset, GridFilterBarVisibility } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CM.TranslationProcess", primaryView: "TranslationParamsFilter", })
export class CM501000 extends PXScreen {

	TranslationParamsFilter = createSingle(TranslationParams);
	TranslationCurrencyRateRecords = createCollection(CurrencyRate);

}

export class TranslationParams extends PXView {

	TranslDefId: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	LastFinPeriodID: PXFieldState<PXFieldOptions.Disabled>;
	CuryEffDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.Disabled>;
	SourceLedgerId: PXFieldState<PXFieldOptions.Disabled>;
	DestLedgerId: PXFieldState<PXFieldOptions.Disabled>;
	SourceCuryID: PXFieldState<PXFieldOptions.Disabled>;
	DestCuryID: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.OnDemand
})
export class CurrencyRate extends PXView {

	@columnConfig({ hideViewLink: true })
	CuryRateType: PXFieldState;

	CuryRateType_CurrencyRateType_Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FromCuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ToCuryID: PXFieldState;

	CuryEffDate: PXFieldState;
	CuryRate: PXFieldState;
	CuryMultDiv: PXFieldState;
	RateReciprocal: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	CuryRateID: PXFieldState<PXFieldOptions.Hidden>;

}

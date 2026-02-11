import { createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, PXFieldOptions, columnConfig, GridColumnShowHideMode, gridConfig, GridPreset, viewInfo } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CM.CuryRateMaint", primaryView: "Filter", })
export class CM301000 extends PXScreen {

	@viewInfo({containerName: "Currency Selection"})
	Filter = createSingle(CuryRateFilter);

	@viewInfo({containerName: "Currency Rate Entry -> Rate Details"})
	CuryRateRecordsEntry = createCollection(CurrencyRate);

	@viewInfo({containerName: "Effective Currency Rates -> Rate Details"})
	CuryRateRecordsEffDate = createCollection(CurrencyRate2);

}

export class CuryRateFilter extends PXView {
	ToCurrency: PXFieldState<PXFieldOptions.CommitChanges>;
	EffDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ initNewRow: true, preset: GridPreset.Details, syncPosition: false })
export class CurrencyRate extends PXView {
	@columnConfig({ hideViewLink: true })
	FromCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CuryRateType: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEffDate: PXFieldState;
	CuryRate: PXFieldState;
	CuryMultDiv: PXFieldState;
	@columnConfig({ allowUpdate: false })
	RateReciprocal: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	CuryRateID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({ preset: GridPreset.Details })
export class CurrencyRate2 extends PXView {

	@columnConfig({hideViewLink: true})
	FromCuryID: PXFieldState;

	@columnConfig({hideViewLink: true})
	CuryRateType: PXFieldState;

	CuryEffDate: PXFieldState;
	CuryRate: PXFieldState;
	CuryMultDiv: PXFieldState;
	RateReciprocal: PXFieldState;
}

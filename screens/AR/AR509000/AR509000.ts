import {
	createCollection, createSingle, PXScreen, PXView, PXFieldState, PXFieldOptions,
	viewInfo, graphInfo, gridConfig, columnConfig, GridPreset
} from "client-controls";


@graphInfo({
	graphType: "PX.Objects.AR.ARClosingProcess", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR509000 extends PXScreen {
	Filter = createSingle(FinPeriodClosingProcessParameters);

	@viewInfo({containerName: "Financial Periods"})
	FinPeriods = createCollection(FinPeriod);
}

export class FinPeriodClosingProcessParameters extends PXView  {
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	FromYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ToYear: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class FinPeriod extends PXView  {
	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ allowUpdate: false})
	FinPeriodID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Descr: PXFieldState;
}

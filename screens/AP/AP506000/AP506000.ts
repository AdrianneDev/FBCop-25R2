import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions,
	columnConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APClosingProcess", primaryView: "Filter", hideFilesIndicator: true, hideNotesIndicator: true })
export class AP506000 extends PXScreen {

	Filter = createSingle(FinPeriodClosingProcessParameters);
	FinPeriods = createCollection(FinPeriod);

}

export class FinPeriodClosingProcessParameters extends PXView {
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	FromYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ToYear: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class FinPeriod extends PXView {

	@columnConfig({ allowUpdate: false, allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ allowUpdate: false })
	FinPeriodID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Descr: PXFieldState;
}

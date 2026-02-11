import {
	PXScreen, createSingle, createCollection, graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	columnConfig,
	PXFieldOptions,
	PXActionState,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CAClosingProcess", primaryView: "Filter" })
export class CA506000 extends PXScreen {
	Filter = createSingle(FinPeriodClosingProcessParameters);
	FinPeriods = createCollection(FinPeriod);
}

export class FinPeriodClosingProcessParameters extends PXView {

	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	FromYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ToYear: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class FinPeriod extends PXView {
	@columnConfig({ allowCheckAll: true, allowNull: false, allowSort: false })
	Selected: PXFieldState;
	FinPeriodID: PXFieldState;
	Descr: PXFieldState;
}

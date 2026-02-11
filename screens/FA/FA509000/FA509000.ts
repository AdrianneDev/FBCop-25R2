import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, GridPreset, PXFieldOptions, columnConfig, GridColumnType, TextAlign } from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.FAClosingProcess", primaryView: "Filter", })
export class FA509000 extends PXScreen {

	Filter = createSingle(FinPeriodClosingProcessParameters);

	@viewInfo({ containerName: "Financial Periods" })
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

	@columnConfig({ allowCheckAll: true, allowSort: false, allowNull: false, width: 30, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Selected: PXFieldState;

	@columnConfig({ allowUpdate: false, format: "##-####" })
	FinPeriodID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Descr: PXFieldState;

}

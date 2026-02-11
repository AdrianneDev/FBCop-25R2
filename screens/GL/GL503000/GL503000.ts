import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, gridConfig,
	columnConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.FinPeriodStatusProcess", primaryView: "Filter" })
export class GL503000 extends PXScreen {

	Filter = createSingle(FinPeriodStatusProcessParameters);
	FinPeriods = createCollection(FinPeriod);

}

export class FinPeriodStatusProcessParameters extends PXView {
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	FromYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ToYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ReopenInSubledgers: PXFieldState;
}

@gridConfig({ preset: GridPreset.Processing })
export class FinPeriod extends PXView {

	@columnConfig({allowCheckAll: true, allowSort: false})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	FinPeriodID: PXFieldState;
	Descr: PXFieldState;
	Status: PXFieldState;
	APClosed: PXFieldState;
	ARClosed: PXFieldState;
	INClosed: PXFieldState;
	CAClosed: PXFieldState;
	FAClosed: PXFieldState;
}

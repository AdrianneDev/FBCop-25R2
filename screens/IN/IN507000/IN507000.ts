import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	PXPageLoadBehavior,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.Turnover.ManageTurnover",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class IN507000 extends PXScreen {
	@viewInfo({containerName: "Selection"})
	Filter = createSingle(INTurnoverCalcFilter);

	@viewInfo({containerName: "Details"})
	TurnoverCalcs = createCollection(INTurnoverCalc);
}

export class INTurnoverCalcFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ToPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfPeriods: PXFieldState;
	CalculateBy: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	actionsConfig: {
		refresh: { hidden: true }
	}
})
export class INTurnoverCalc extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	BranchID: PXFieldState;

	@columnConfig({ allowNull: false })
	FromPeriodID: PXFieldState;

	@columnConfig({ allowNull: false })
	ToPeriodID: PXFieldState;

	SiteID: PXFieldState;
	ItemClassID: PXFieldState;
	InventoryID: PXFieldState;
	CreatedDateTime: PXFieldState;
}

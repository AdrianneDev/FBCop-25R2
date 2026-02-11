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
	graphType: "PX.Objects.IN.Turnover.TurnoverEnq",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class IN407010 extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(INTurnoverEnqFilter);

	@viewInfo({ containerName: "Turnover Calculation Items" })
	TurnoverCalcItems = createCollection(TurnoverCalcItem);
}

export class INTurnoverEnqFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ToPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	batchUpdate: true,
	repaintColumns: true,
	actionsConfig: {
		refresh: { hidden: true }
	}
})
export class TurnoverCalcItem extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	BegCost: PXFieldState;
	BegQty: PXFieldState;
	YtdCost: PXFieldState;
	YtdQty: PXFieldState;
	AvgCost: PXFieldState;
	AvgQty: PXFieldState;
	SoldCost: PXFieldState;
	SoldQty: PXFieldState;

	@columnConfig({ nullText: "-" })
	CostRatio: PXFieldState;

	@columnConfig({ nullText: "-" })
	QtyRatio: PXFieldState;

	@columnConfig({ nullText: "-" })
	CostSellDays: PXFieldState;
}

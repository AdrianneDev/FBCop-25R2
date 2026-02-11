import {
	PXView,
	PXFieldState,
	gridConfig,
	controlConfig,
	PXFieldOptions,
	columnConfig,
	TextAlign,
	GridPreset,
	linkCommand,
	GridFastFilterVisibility,
	GridFilterBarVisibility,
	GridPagerMode,
} from "client-controls";

export class DateSensitiveDataRevision extends PXView {
	@controlConfig({ allowEdit: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByAccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupByCostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Period: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountGroups: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false,
	showFastFilter: GridFastFilterVisibility.False,
	showFilterBar: GridFilterBarVisibility.False,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: false,
})
export class DateSensitiveDataRevisionLine extends PXView  {
	CurveID: PXFieldState<PXFieldOptions.Hidden>;
	PointNumber: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	@linkCommand("ZoomToYear")
	Year: PXFieldState;
	@linkCommand("ZoomToQuarter")
	Quarter: PXFieldState;
	@linkCommand("ZoomToMonth")
	Month: PXFieldState;
	Date: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right }) ActualQty: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right }) CuryActualAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right }) ActualQtyDiff: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right }) CuryActualAmountDiff: PXFieldState;
}

export class Project extends PXView {
	Description: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Multiline>;
	StartDate: PXFieldState<PXFieldOptions.Disabled>;
	ExpireDate: PXFieldState<PXFieldOptions.Disabled>;
	OwnerID: PXFieldState<PXFieldOptions.Disabled>;
}

export class BudgetTotals extends PXView  {
	CuryActualAmount: PXFieldState<PXFieldOptions.Disabled>;
	CuryRevisedAmount: PXFieldState<PXFieldOptions.Disabled>;
}

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
	GridFastFilterVisibility,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INReplenishmentPolicyMaint",
	primaryView: "Policies",
	showActivitiesIndicator: true
})
export class IN206600 extends PXScreen {
	@viewInfo({ containerName: "Seasonality Summary" })
	Policies = createSingle(INReplenishmentPolicy);

	@viewInfo({ containerName: "Low Seasons" })
	seasons = createCollection(INReplenishmentSeason);
}

export class INReplenishmentPolicy extends PXView {
	ReplenishmentPolicyID: PXFieldState;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	CalendarID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	initNewRow: true,
	allowImport: true,
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
})
export class INReplenishmentSeason extends PXView {
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	Factor: PXFieldState;
}

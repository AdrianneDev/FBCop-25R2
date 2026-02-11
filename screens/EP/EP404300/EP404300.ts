import {
	PXScreen,
	graphInfo,
	PXView,
	createCollection,
	PXFieldState,
	gridConfig,
	linkCommand,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	GridPreset,
	GridFilterBarVisibility,
	viewInfo,
	PXActionState,
} from "client-controls";

import { Messages } from "src/screens/CR/common/messages";
@graphInfo({
	graphType: "PX.Objects.EP.ActivitiesEnq",
	primaryView: "Activities",
})
export class EP404300 extends PXScreen {
	CreateActivity: PXActionState;

	@viewInfo({ containerName: "Activities" })
	Activities = createCollection(Activities);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	initNewRow: true,
	allowUpdate: false,
	preserveSortsAndFilters: true,
	blankFilterHeader: Messages.ActivitiesFilterHeader
})
export class Activities extends PXView {
	@columnConfig({ width: 35 })
	IsCompleteIcon: PXFieldState<PXFieldOptions.Hidden>;
	ClassID: PXFieldState;
	ClassIcon: PXFieldState;

	@linkCommand("ViewActivity")
	Subject: PXFieldState;
	UIStatus: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	DayOfWeek: PXFieldState;
	TimeSpent: PXFieldState;
	OvertimeSpent: PXFieldState;
	TimeBillable: PXFieldState;
	OvertimeBillable: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;

	@linkCommand("viewOwner")
	OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedByID_Creator_Username: PXFieldState<PXFieldOptions.Hidden>;

	@linkCommand("viewEntity")
	@columnConfig({ width: 300 })
	Source: PXFieldState;
}

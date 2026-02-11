import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection, QpGridEventArgs } from "client-controls";
import { EPWeeklyCrewTimeActivity, EPWeeklyCrewTimeActivityFilter, PMTimeActivity, EPTimeActivitiesSummary, EPTimeActivitiesSummary2, PMTimeActivity2 } from "./views";

@graphInfo({ graphType: "PX.Objects.EP.EPWeeklyCrewTimeEntry", primaryView: "Document" })
export class EP307100 extends PXScreen {
	InsertForBulkTimeEntry: PXActionState;

	Document = createSingle(EPWeeklyCrewTimeActivity);

	@viewInfo({ containerName: "Time Activities" })
	TimeActivities = createCollection(PMTimeActivity);

	@viewInfo({ containerName: "Crew Members" })
	WorkgroupTimeSummary = createCollection(EPTimeActivitiesSummary);

	Filter = createSingle(EPWeeklyCrewTimeActivityFilter);

	@viewInfo({ containerName: "Mass Enter Time" })
	CompanyTreeMembers = createCollection(EPTimeActivitiesSummary2);

	@viewInfo({ containerName: "Bulk Entry Time Activities" })
	BulkEntryTimeActivities = createCollection(PMTimeActivity2);

	@handleEvent(CustomEventType.RowSelected, { view: "TimeActivities" })
	onPMTimeActivityChanged(args: RowSelectedHandlerArgs<PXViewCollection<PMTimeActivity>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		/** Ensure that 'Copy Selected Line' action is enabled only when there is at least one row in Time Activities. */
		if (model.CopySelectedActivity) model.CopySelectedActivity.enabled = !!ar;
	}

	onFilterChanged(args: QpGridEventArgs) {
		this.screenService.update("Refresh");
	}
}

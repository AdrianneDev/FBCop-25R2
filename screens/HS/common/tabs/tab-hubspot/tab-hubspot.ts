import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	createCollection,
	gridConfig,
	GridPreset,
	linkCommand,
	GridPagerMode,
	PXActionState,
	columnConfig
} from "client-controls";

export abstract class HubspotBase {

	@viewInfo({ containerName: "HubSpot" })
	HubSpotSyncRecs = createCollection(HSSyncRecord);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	fastFilterByAllFields: false,
})
export class HSSyncRecord extends PXView {
	SyncHubSpot: PXActionState;
	PushToHubSpot: PXActionState;
	PullFromHubSpot: PXActionState;

	SYProvider__Name: PXFieldState;
	@linkCommand("GoToHubSpot")
	RemoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	SyncStatus: PXFieldState;
	LastSource: PXFieldState;
	LastOperation: PXFieldState;
	LastErrorMessageSimplified: PXFieldState;
	LastAttemptTS: PXFieldState;
	@columnConfig({ format: "g" })
	RemoteTS: PXFieldState;
	AttemptCount: PXFieldState;
	HSEntitySetup__ImportScenario: PXFieldState;
	HSEntitySetup__ExportScenario: PXFieldState;
	SyncRecordID: PXFieldState<PXFieldOptions.Hidden>;
	LastErrorMessage: PXFieldState<PXFieldOptions.Hidden>;
}

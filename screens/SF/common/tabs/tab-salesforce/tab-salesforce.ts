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

export abstract class SalesforceBase {

	@viewInfo({ containerName: "Salesforce" })
	SyncRecs = createCollection(SFSyncRecord);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	fastFilterByAllFields: false,
})
export class SFSyncRecord extends PXView {
	SyncSalesforce: PXActionState;

	SYProvider__Name: PXFieldState;
	@linkCommand("GoToSalesforce")
	RemoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	Operation: PXFieldState;
	LastErrorMessage: PXFieldState;
	@columnConfig({ format: "g" })
	LastAttemptTS: PXFieldState;
	AttemptCount: PXFieldState;
	SFEntitySetup__ImportScenario: PXFieldState;
	SFEntitySetup__ExportScenario: PXFieldState;
}

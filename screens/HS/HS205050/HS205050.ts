import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createCollection,
	createSingle,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	PXActionState,
	linkCommand,
	GridPreset,
	GridFilterBarVisibility,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.DataSync.HubSpot.HSMarketingListMembersMaint",
	primaryView: "Filter",
	bpEventsIndicator: false,
	udfTypeField: "",
})
export class HS205050 extends PXScreen {
	GoToHubSpotList: PXActionState;

	Filter = createSingle(HSMarketingListMembersFilter);
	Records = createCollection(HSMarketingListMember);
}

export class HSMarketingListMembersFilter extends PXView {
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	MarketingListID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("goToHubSpotList")
	HubSpotListName: PXFieldState<PXFieldOptions.Disabled>;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	SubscribedOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	DeleteInTarget: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	allowUpdate: false,
	quickFilterFields: [
		"RemoteName",
		"HSSyncRecord__LastErrorMessageSimplified",
	],
})
export class HSMarketingListMember extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35 }) Selected: PXFieldState;
	MarketingListMemberID: PXFieldState<PXFieldOptions.Hidden>;
	IsSubscribed: PXFieldState;
	HSSyncRecord__EntityType: PXFieldState;
	@linkCommand("Contact_ViewDetails") LocalID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("GoToHubSpotContact")
	RemoteName: PXFieldState<PXFieldOptions.CommitChanges>;

	HSSyncRecord__SyncStatus: PXFieldState;
	MembershipSyncStatus: PXFieldState;
	HSSyncRecord__LastErrorMessageSimplified: PXFieldState;
}

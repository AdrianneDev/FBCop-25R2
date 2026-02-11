import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	createCollection,
	gridConfig,
	GridPreset,
	linkCommand,
	PXActionState,
	GridFilterBarVisibility,
} from "client-controls";

export abstract class MarketingListsBase {

	@viewInfo({ containerName: "Marketing Lists" })
	Subscriptions = createCollection(CRMarketingListMember);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CRMarketingListMember extends PXView {
	subscribeAll: PXActionState;
	unsubscribeAll: PXActionState;

	IsSubscribed: PXFieldState;

	@linkCommand("ViewMarketingList") CRMarketingList__MailListCode: PXFieldState;
	CRMarketingList__Name: PXFieldState;
	CRMarketingList__Type: PXFieldState;
	CRMarketingList__Status: PXFieldState<PXFieldOptions.Hidden>;
	CRMarketingList__WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("OwnerID_ViewDetails")
	CRMarketingList__OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	CRMarketingList__Method: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("GIDesignID_ViewDetails")
	CRMarketingList__GIDesignID: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("CreatedByID_ViewDetails")
	CRMarketingList__CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CRMarketingList__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("LastModifiedByID_ViewDetails")
	CRMarketingList__LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	CRMarketingList__LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
}

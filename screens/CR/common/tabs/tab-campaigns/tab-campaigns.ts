import {
	PXView,
	PXFieldState,
	linkCommand,
	createCollection,
	PXFieldOptions,
	gridConfig,
	viewInfo,
	columnConfig,
	GridColumnDisplayMode,
	GridPreset,
	GridFilterBarVisibility,
} from "client-controls";

export abstract class CampaignsBase {

	@viewInfo({ containerName: "Campaigns" })
	Members = createCollection(CRCampaignMembers);
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["CampaignID", "CRCampaign__CampaignName", "CRCampaign__PromoCodeID"]
})
export class CRCampaignMembers extends PXView {
	CampaignID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CRCampaign__CampaignName: PXFieldState;
	@linkCommand("MarketingListID_ViewDetails")
	CRMarketingList__MailListCode: PXFieldState<PXFieldOptions.Hidden>;
	CRCampaign__Status: PXFieldState;
	CRCampaign__StartDate: PXFieldState;
	CRCampaign__EndDate: PXFieldState;
	CRCampaign__PromoCodeID: PXFieldState;
	CRCampaign__OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	CRCampaign__CampaignType: PXFieldState<PXFieldOptions.Hidden>;
	CRCampaignMembers__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("CreatedByID_ViewDetails")
	CRCampaign__CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CRCampaign__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("LastModifiedByID_ViewDetails")
	CRCampaign__LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	CRCampaign__LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
}

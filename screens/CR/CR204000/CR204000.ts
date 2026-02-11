import {
	createSingle,
	createCollection,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	PXActionState,
	linkCommand,
	columnConfig,
	viewInfo,
	headerDescription,
	controlConfig,
	ISelectorControlConfig,
	GridFilterBarVisibility,
} from "client-controls";

@graphInfo({graphType: "PX.Objects.CR.CRMarketingListMaint", primaryView: "MailLists", showUDFIndicator: true })
export class CR204000 extends PXScreen {
	@viewInfo({ containerName: "Marketing List Info" })
	MailLists = createSingle(CRMarketingList);

	@viewInfo({ containerName: "Mailing List Subscribers" })
	ListMembers = createCollection(CRMarketingListMember);

	@viewInfo({ containerName: "Campaign Members" })
	MarketingCampaigns = createCollection(CRCampaignToCRMarketingListLink);

	@viewInfo({ containerName: "Dialog: Processing" })
	ImportMembers = createCollection(CRMarketingListDummy);
}

export class CRMarketingList extends PXView {
	MailListCode: PXFieldState;
	@headerDescription
	Name: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, editCommand: "RedirectToGIResult"})
	GIDesignID: PXFieldState<PXFieldOptions.CommitChanges>;
	SharedGIFilter: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CRMarketingListDummy extends PXView {
	Name: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowInsert: true,
	allowDelete: false,
	allowImport: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["ContactID", "ContactID", "Contact__FullName", "Contact__Salutation", "Contact__BAccountID", "Contact__Email"],
})
export class CRMarketingListMember extends PXView {
	DeleteSelectedMembers: PXActionState;
	AddMembers: PXActionState;
	ManageSubscription: PXActionState;
	CopyMembers: PXActionState;
	ClearMembers: PXActionState;

	IsSubscribed: PXFieldState;
	@linkCommand("ListMembers_Contact_ViewDetails")
	@columnConfig({width: 280})
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Contact__ContactType: PXFieldState;
	Contact__Salutation: PXFieldState;
	@linkCommand("ListMembers_BAccount_ViewDetails")
	Contact__BAccountID: PXFieldState;
	Contact__FullName: PXFieldState;
	Contact__Email: PXFieldState;
	CreatedDateTime: PXFieldState;

	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState<PXFieldOptions.Hidden>;
	Contact__IsActive: PXFieldState<PXFieldOptions.Hidden>;
	Contact__ClassID: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone1: PXFieldState<PXFieldOptions.Hidden>;
	Contact__LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	Contact__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Source: PXFieldState<PXFieldOptions.Hidden>;
	Contact__AssignDate: PXFieldState<PXFieldOptions.Hidden>;
	Contact__DuplicateStatus: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone2: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone3: PXFieldState<PXFieldOptions.Hidden>;
	Contact__DateOfBirth: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Fax: PXFieldState<PXFieldOptions.Hidden>;
	Contact__WebSite: PXFieldState<PXFieldOptions.Hidden>;
	Contact__ConsentAgreement: PXFieldState<PXFieldOptions.Hidden>;
	Contact__ConsentDate: PXFieldState<PXFieldOptions.Hidden>;
	Contact__ConsentExpirationDate: PXFieldState<PXFieldOptions.Hidden>;
	Contact__ParentBAccountID: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Gender: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Method: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoCall: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoEMail: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoFax: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoMail: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoMarketing: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoMassMail: PXFieldState<PXFieldOptions.Hidden>;
	Contact__CampaignID: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone1Type: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone2Type: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone3Type: PXFieldState<PXFieldOptions.Hidden>;
	Contact__FaxType: PXFieldState<PXFieldOptions.Hidden>;
	Contact__MaritalStatus: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Spouse: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Status: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Resolution: PXFieldState<PXFieldOptions.Hidden>;
	Contact__LanguageID: PXFieldState<PXFieldOptions.Hidden>;
	Contact__OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	Contact__OwnerID_description: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
	Address__State: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address__Department: PXFieldState<PXFieldOptions.Hidden>;
	Address__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	Address__StreetName: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingName: PXFieldState<PXFieldOptions.Hidden>;
	Address__Floor: PXFieldState<PXFieldOptions.Hidden>;
	Address__UnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostBox: PXFieldState<PXFieldOptions.Hidden>;
	Address__Room: PXFieldState<PXFieldOptions.Hidden>;
	Address__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	Address__DistrictName: PXFieldState<PXFieldOptions.Hidden>;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	BAccount__ClassID: PXFieldState<PXFieldOptions.Hidden>;
	BAccount__WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	BAccount__OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	BAccount__ParentBAccountID: PXFieldState<PXFieldOptions.Hidden>;
	BAccount__CampaignSourceID: PXFieldState<PXFieldOptions.Hidden>;
	Address2__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address2__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
	Address2__City: PXFieldState<PXFieldOptions.Hidden>;
	Address2__State: PXFieldState<PXFieldOptions.Hidden>;
	Address2__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address2__Department: PXFieldState<PXFieldOptions.Hidden>;
	Address2__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	Address2__StreetName: PXFieldState<PXFieldOptions.Hidden>;
	Address2__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address2__BuildingName: PXFieldState<PXFieldOptions.Hidden>;
	Address2__Floor: PXFieldState<PXFieldOptions.Hidden>;
	Address2__UnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address2__PostBox: PXFieldState<PXFieldOptions.Hidden>;
	Address2__Room: PXFieldState<PXFieldOptions.Hidden>;
	Address2__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	Address2__DistrictName: PXFieldState<PXFieldOptions.Hidden>;
	Address2__CountryID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowDelete: false,
	allowInsert: false,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["CampaignID", "CRCampaign__CampaignName", "CRCampaign__PromoCodeID"]
})
export class CRCampaignToCRMarketingListLink extends PXView {
	@linkCommand("MarketingCampaigns_CRCampaign_ViewDetails")
	CampaignID: PXFieldState<PXFieldOptions.CommitChanges>;
	CRCampaign__CampaignName: PXFieldState;
	CRCampaign__Status: PXFieldState<PXFieldOptions.Hidden>;
	CRCampaign__StartDate: PXFieldState;
	CRCampaign__EndDate: PXFieldState;
	CRCampaign__PromoCodeID: PXFieldState;
	@linkCommand("MarketingCampaigns_OwnerID_ViewDetails")
	CRCampaign__OwnerID: PXFieldState;
	LastUpdateDate: PXFieldState;
	@linkCommand("CreatedByID_ViewDetails")
	CRCampaign__CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CRCampaign__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("LastModifiedByID_ViewDetails")
	CRCampaign__LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	CRCampaign__LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
}

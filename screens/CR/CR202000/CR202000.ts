import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset,
	viewInfo,
	GridColumnShowHideMode,
	GridNoteFilesShowMode,
	controlConfig,
	ISelectorControlConfig,
	GridFilterBarVisibility,
	GridColumnDisplayMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CampaignMaint",
	primaryView: "Campaign",
	udfTypeField: "CampaignType",
	showUDFIndicator: true
})
export class CR202000 extends PXScreen {
	@viewInfo({ containerName: "Campaign" })
	Campaign = createSingle(CRCampaignHeader);

	CalcCampaignCurrent = createSingle(CRCampaignStandalone);

	CampaignCurrent = createSingle(CRCampaign);

	@viewInfo({ containerName: "Campaign Marketing Lists" })
	CampaignMarketingLists = createCollection(CRMarketingList);

	@viewInfo({ containerName: "Campaign Members" })
	CampaignMembers = createCollection(CRCampaignMembers);

	@viewInfo({ containerName: "Leads" })
	Leads = createCollection(CRLead);

	@viewInfo({ containerName: "Opportunities" })
	Opportunities = createCollection(CROpportunity);

	@viewInfo({ containerName: "Answers" })
	Answers = createCollection(CSAnswers);
}

export class CRCampaignHeader extends PXView {
	CampaignID: PXFieldState;
	CampaignType: PXFieldState<PXFieldOptions.CommitChanges>;
	CampaignName: PXFieldState;
	Status: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CRCampaign extends PXView {
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpectedResponse: PXFieldState;
	PlannedBudget: PXFieldState;
	ExpectedRevenue: PXFieldState;
	PromoCodeID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "addNewProjectTask" })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
}

export class CRCampaignStandalone extends PXView {
	Contacts: PXFieldState;
	MembersContacted: PXFieldState<PXFieldOptions.Disabled>;
	MembersResponded: PXFieldState<PXFieldOptions.Disabled>;
	LeadsGenerated: PXFieldState<PXFieldOptions.Disabled>;
	LeadsConverted: PXFieldState<PXFieldOptions.Disabled>;
	Opportunities: PXFieldState<PXFieldOptions.Disabled>;
	ClosedOpportunities: PXFieldState<PXFieldOptions.Disabled>;
	OpportunitiesValue: PXFieldState;
	ClosedOpportunitiesValue: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: true,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["MailListCode", "Name", "OwnerID", "GIDesignID"],
})
export class CRMarketingList extends PXView {
	SelectedForCampaign: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("CampaignMarketingLists_CRMarketingList_ViewDetails")
	MailListCode: PXFieldState;
	Name: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	LastUpdateDate: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Hidden>;
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	Method: PXFieldState<PXFieldOptions.Hidden>;
	Type: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("GIDesignID_ViewDetails")
	GIDesignID: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("CreatedByID_ViewDetails")
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("GIDesignID_ViewDetails")
	LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: true,
	allowUpdate: false,
	adjustPageSize: true,
	syncPosition: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["ContactID", "Contact__Salutation", "Contact__BAccountID", "Contact__FullName", "Contact__EMail", "Contact__Phone1"],
	allowDelete: false,
})
export class CRCampaignMembers extends PXView {
	DeleteAction: PXActionState;
	UpdateListMembers: PXActionState;
	NewCampaignMemberTask: PXActionState;
	NewCampaignMemberEvent: PXActionState;
	NewCampaignMemberMailActivity: PXActionState;
	NewCampaignMemberActivity: PXActionState;
	ClearMembers: PXActionState;

	@columnConfig({ allowUpdate: false, allowCheckAll: true })
	Selected: PXFieldState;
	@linkCommand("Contact_ViewDetails")
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Contact__ContactType: PXFieldState;
	@linkCommand("CampaignMembers_CRMarketingList_ViewDetails")
	CRMarketingList__MailListCode: PXFieldState;
	@linkCommand("CampaignMembers_BAccount_ViewDetails")
	Contact__BAccountID: PXFieldState;
	Contact__FullName: PXFieldState;
	Contact__EMail: PXFieldState;
	Contact__Phone1: PXFieldState;
	OpportunityCreatedCount: PXFieldState;
	ActivitiesLogged: PXFieldState;

	Contact__Salutation: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone1Type: PXFieldState<PXFieldOptions.Hidden>;
	Contact__IsActive: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	CampaignID: PXFieldState<PXFieldOptions.Hidden>;
	EmailSendCount: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone2Type: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone2: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone3Type: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Phone3: PXFieldState<PXFieldOptions.Hidden>;
	Contact__FaxType: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Fax: PXFieldState<PXFieldOptions.Hidden>;
	Contact__WebSite: PXFieldState<PXFieldOptions.Hidden>;
	Contact__DateOfBirth: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Gender: PXFieldState<PXFieldOptions.Hidden>;
	Contact__MaritalStatus: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Spouse: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("CreatedByID_ViewDetails")
	Contact__CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("LastModifiedByID_ViewDetails")
	Contact__LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	Contact__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	Contact__LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	Contact__WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("OwnerID_ViewDetails")
	Contact__OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("CampaignMembers_CRContactClass_ViewDetails")
	Contact__ClassID: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Source: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Title: PXFieldState<PXFieldOptions.Hidden>;
	Contact__FirstName: PXFieldState;
	Contact__MidName: PXFieldState;
	Contact__LastName: PXFieldState;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
	Address__State: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
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
	Contact__Status: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	Contact__IsNotEmployee: PXFieldState;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("CountryID_ViewDetails")
	Contact__ConsentAgreement: PXFieldState<PXFieldOptions.Hidden>;
	Contact__ConsentDate: PXFieldState<PXFieldOptions.Hidden>;
	Contact__ConsentExpirationDate: PXFieldState<PXFieldOptions.Hidden>;
	Contact__Method: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoCall: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoMarketing: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoEMail: PXFieldState<PXFieldOptions.Hidden>;
	Contact__NoMassMail: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("ParentBAccountID_ViewDetails")
	Contact__ParentBAccountID: PXFieldState<PXFieldOptions.Hidden>;
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
	Address2__CountryID: PXFieldState<PXFieldOptions.Hidden>;
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
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	adjustPageSize: true,
	autoAdjustColumns: true,
})
export class CRLead extends PXView {
	AddContact: PXActionState;

	@linkCommand("Leads_ViewDetails")
	DisplayName: PXFieldState;
	Status: PXFieldState;
	Resolution: PXFieldState;
	FullName: PXFieldState;
	@columnConfig({ hideViewLink: false })
	OwnerID: PXFieldState;

	@linkCommand("Leads_CRLeadClass_ViewDetails")
	ClassID: PXFieldState<PXFieldOptions.Hidden>;
	Source: PXFieldState<PXFieldOptions.Hidden>;
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	IsActive: PXFieldState<PXFieldOptions.Hidden>;
	Title: PXFieldState<PXFieldOptions.Hidden>;
	Salutation: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
	EMail: PXFieldState;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
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
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
	Address__State: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	Phone1: PXFieldState<PXFieldOptions.Hidden>;
	Phone2: PXFieldState<PXFieldOptions.Hidden>;
	Phone3: PXFieldState<PXFieldOptions.Hidden>;
	Fax: PXFieldState<PXFieldOptions.Hidden>;
	WebSite: PXFieldState<PXFieldOptions.Hidden>;
	DateOfBirth: PXFieldState<PXFieldOptions.Hidden>;
	CreatedByID_Creator_Username: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByID_Modifier_Username: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	adjustPageSize: true,
	autoAdjustColumns: true,
})
export class CROpportunity extends PXView {
	AddOpportunity: PXActionState;

	OpportunityID: PXFieldState;
	Subject: PXFieldState;
	Status: PXFieldState;
	StageID: PXFieldState;
	@columnConfig({ hideViewLink: false })
	CuryID: PXFieldState;
	CuryProductsAmount: PXFieldState;
	CloseDate: PXFieldState;
	@columnConfig({ hideViewLink: false })
	OwnerID: PXFieldState;

	CROpportunityProbability__Probability: PXFieldState<PXFieldOptions.Hidden>;
	Resolution: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("Opportunities_CROpportunityClass_ViewDetails")
	ClassID: PXFieldState<PXFieldOptions.Hidden>;
	Source: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("Opportunities_BAccount_ViewDetails")
	BAccountID: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("Opportunities_Contact_ViewDetails")
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
	CROpportunityClass__Description: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CSAnswers extends PXView {
	isRequired: PXFieldState;
	@columnConfig({
		width: 300,
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
		allowShowHide: GridColumnShowHideMode.False,
	})
	AttributeID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	Value: PXFieldState;
}

import {
	PXView,
	PXFieldState,
	graphInfo,
	createSingle,
	createCollection,
	PXScreen,
	PXFieldOptions,
	linkCommand,
	PXActionState,
	viewInfo,
	localizable,
	controlConfig,
	gridConfig,
	columnConfig,
	GridColumnShowHideMode,
	GridPreset,
	ISelectorControlConfig,
	GridFilterBarVisibility,
	IMailEditorControlConfig,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.Objects.CR.ContactMaint",
	primaryView: "Contact",
	udfTypeField: "ClassID",
	showUDFIndicator: true,
	bpEventsIndicator: true,
})
export class CR302000 extends PXScreen {
	ViewOnMap: PXActionState;

	@viewInfo({ containerName: "Contact Summary" })
	Contact = createSingle(ContactHeader);

	@viewInfo({ containerName: "Contact" })
	ContactCurrent = createSingle(ContactDetail);

	@viewInfo({ containerName: "Contact Address Override" })
	ContactCurrent2 = createSingle(ContactDetailAddressOverride);

	@viewInfo({ containerName: "Address" })
	AddressCurrent = createSingle(Address);

	@viewInfo({ containerName: "Activity Statistics" })
	ContactActivityStatistics = createSingle(CRActivityStatistics);

	@viewInfo({ containerName: "Leads" })
	Leads = createCollection(CRLeads);

	@viewInfo({ containerName: "Opportunities" })
	Opportunities = createCollection(CROpportunity);

	@viewInfo({ containerName: "Cases" })
	Cases = createCollection(CRCases);

	@viewInfo({ containerName: "Notifications" })
	NWatchers = createCollection(NotificationRecipient);

	@viewInfo({ containerName: "Locations" })
	RoleAssignments = createCollection(RoleAssignment);

}

export class ContactHeader extends PXView {
	@controlConfig<ISelectorControlConfig>({ nullText: NullTextValues.New, displayMode: "text" })
	ContactID: PXFieldState;
	Status: PXFieldState;
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	DuplicateFound: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateStatus: PXFieldState<PXFieldOptions.Disabled>;
}

export class ContactDetail extends Contact {
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;
	TeamsID: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentAgreement: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideSalesTerritory: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTerritoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ParentBAccountID: PXFieldState;
	ExtRefNbr: PXFieldState;
	Source: PXFieldState;
	Synchronize: PXFieldState;
	Method: PXFieldState;
	NoCall: PXFieldState;
	NoMarketing: PXFieldState;
	NoEMail: PXFieldState;
	NoMassMail: PXFieldState;
	LanguageID: PXFieldState;
	Img: PXFieldState;
	DateOfBirth: PXFieldState;
	Gender: PXFieldState;
	MaritalStatus: PXFieldState;
	Spouse: PXFieldState;
	NoFax: PXFieldState;
	Resolution: PXFieldState;
	AssignDate: PXFieldState;
	CreatedDateTime: PXFieldState;
	LastModifiedDateTime: PXFieldState;
	DisplayName: PXFieldState;
	CampaignID: PXFieldState;
	ClassID: PXFieldState<PXFieldOptions.Hidden>;
}

export class ContactDetailAddressOverride extends PXView {
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CRActivityStatistics extends PXView {
	LastIncomingActivityDate: PXFieldState;
	LastOutgoingActivityDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	allowUpdate: false,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["MemberName", "Salutation", "Address__City", "EMail", "Phone1", "Source", "CampaignID", "Status", "OwnerID", "WorkgroupID"],
})
export class CRLeads extends PXView {
	createLead: PXActionState;

	@linkCommand("Leads_ViewDetails")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	MemberName: PXFieldState;
	Salutation: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState;
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
	Address__State: PXFieldState<PXFieldOptions.Hidden>;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
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
	EMail: PXFieldState;
	Phone1: PXFieldState;
	Phone2: PXFieldState<PXFieldOptions.Hidden>;
	Phone3: PXFieldState<PXFieldOptions.Hidden>;
	Source: PXFieldState<PXFieldOptions.Hidden>;
	CampaignID: PXFieldState;
	Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	CRActivityStatistics__LastIncomingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	CRActivityStatistics__LastOutgoingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CROpportunity extends PXView {
	AddOpportunity: PXActionState;

	@linkCommand("Opportunities_ViewDetails")
	OpportunityID: PXFieldState;
	Subject: PXFieldState;
	StageID: PXFieldState;
	CROpportunityProbability__Probability: PXFieldState;
	Status: PXFieldState;
	CuryProductsAmount: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	CloseDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	@linkCommand("Opportunities_CLassID_ViewDetails")
	ClassID: PXFieldState<PXFieldOptions.Hidden>;
	CROpportunityClass__Description: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CRCases extends PXView {
	AddCase: PXActionState;

	@linkCommand("Cases_ViewDetails") CaseCD: PXFieldState;
	Subject: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CaseClassID: PXFieldState;
	Severity: PXFieldState;
	Status: PXFieldState;
	Resolution: PXFieldState;
	ReportedOnDateTime: PXFieldState;
	TimeEstimated: PXFieldState<PXFieldOptions.Hidden>;
	ResolutionDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	WorkgroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowUpdate: false,
	allowInsert: false,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class NotificationRecipient extends PXView {
	NotificationSetup__Module: PXFieldState<PXFieldOptions.Disabled>;
	NotificationSetup__SourceCD: PXFieldState<PXFieldOptions.Disabled>;
	NotificationSetup__NotificationCD: PXFieldState;
	ClassID: PXFieldState<PXFieldOptions.Disabled>;
	EntityDescription: PXFieldState<PXFieldOptions.Disabled>;
	ReportID: PXFieldState;
	NotificationID: PXFieldState;
	Format: PXFieldState;
	Hidden: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class RoleAssignment extends PXView {
	LocationID: PXFieldState;
	Role: PXFieldState;
}

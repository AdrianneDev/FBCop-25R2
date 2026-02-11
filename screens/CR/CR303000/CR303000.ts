import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	PXView,
	PXFieldState,
	gridConfig,

	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	GridPreset,
	GridColumnDisplayMode,
	GridNoteFilesShowMode,
	fieldConfig,
	controlConfig,
	ISelectorControlConfig,
	GridFilterBarVisibility,
	IMailEditorControlConfig,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { PrimaryContact } from "src/screens/CR/common/forms/form-primary-contact/form-primary-contact";
import { Contact, DefaultContact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({
	graphType: "PX.Objects.CR.BusinessAccountMaint",
	primaryView: "BAccount",
	udfTypeField: "ClassID",
	showUDFIndicator: true,
	bpEventsIndicator: true,
})
export class CR303000 extends PXScreen {
	ViewMainOnMap: PXActionState;
	ViewDefLocationAddressOnMap: PXActionState;

	@viewInfo({ containerName: "Account Summary" })
	BAccount = createSingle(BAccountHeader);

	@viewInfo({ containerName: "Account" })
	CurrentBAccount = createSingle(BAccount);

	@viewInfo({ containerName: "Account Address" })
	DefAddress = createSingle(Address);

	@viewInfo({ containerName: "Account Information", syncAlways: true })
	DefContact = createSingle(DefContact);

	@viewInfo({ containerName: "Primary Contact" })
	PrimaryContactCurrent = createSingle(PrimaryContact);

	@viewInfo({ containerName: "Activity Statistics" })
	BAccountActivityStatistics = createSingle(CRActivityStatistics);

	@viewInfo({ containerName: "Shipping" })
	DefLocation = createSingle(Location);

	@viewInfo({ containerName: "Ship-To Address" })
	DefLocationAddress = createSingle(Address);

	@viewInfo({ containerName: "Ship-To Info" })
	DefLocationContact = createSingle(Contact);

	@viewInfo({ containerName: "Leads" })
	Leads = createCollection(CRLead);

	@viewInfo({ containerName: "Opportunities" })
	Opportunities = createCollection(CROpportunity);

	@viewInfo({ containerName: "Cases" })
	Cases = createCollection(CRCase);

	@viewInfo({ containerName: "Contracts" })
	Contracts = createCollection(Contract);

	@viewInfo({ containerName: "Orders" })
	Orders = createCollection(SOOrder);
}

export class BAccountHeader extends PXView {
	@fieldConfig({ pinned: true })
	AcctCD: PXFieldState;
	@fieldConfig({ pinned: false })
	AcctName: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({ pinned: false })
	Status: PXFieldState;
	@fieldConfig({ pinned: false })
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({ pinned: true })
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class BAccount extends PXView {
	AcctName: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.Disabled>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideSalesTerritory: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTerritoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ParentBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AcctReferenceNbr: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CampaignSourceID: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOverrideCury: PXFieldState<PXFieldOptions.CommitChanges>;
	CreatedDateTime: PXFieldState;
	LastModifiedDateTime: PXFieldState;
	LocaleName: PXFieldState;
	@fieldConfig({ pinned: false})
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "AddNewPrimaryContact" })
	PrimaryContactID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class DefContact extends DefaultContact {
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;

	ConsentAgreement: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DuplicateFound: PXFieldState;
	DuplicateStatus: PXFieldState<PXFieldOptions.Disabled>;
	Method: PXFieldState;
	NoCall: PXFieldState;
	NoMarketing: PXFieldState;
	NoEMail: PXFieldState;
	NoMassMail: PXFieldState;
}

export class Location extends PXView {
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CBranchID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CPriceClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CDefProjectID: PXFieldState;
	TaxRegistrationID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CTaxZoneID: PXFieldState;
	CTaxCalcMode: PXFieldState;
	CAvalaraExemptionNumber: PXFieldState;
	CAvalaraCustomerUsageType: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CCarrierID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CShipTermsID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CShipZoneID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CFOBPointID: PXFieldState;
	CResedential: PXFieldState;
	CSaturdayDelivery: PXFieldState;
	CInsurance: PXFieldState;
	CAdditionalHandling: PXFieldState;
	CShipComplete: PXFieldState;
	COrderPriority: PXFieldState;
	CLeadTime: PXFieldState;
	CCalendarID: PXFieldState;
	CLiftGate: PXFieldState;
	CInsideDelivery: PXFieldState;
	CLimitedAccess: PXFieldState;
}

export class Contact4 extends PXView {
	FullName: PXFieldState;
	Attention: PXFieldState;
	Phone1Type: PXFieldState;
	Phone1: PXFieldState;
	Phone2Type: PXFieldState;
	Phone2: PXFieldState;
	FaxType: PXFieldState;
	Fax: PXFieldState;
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;
	WebSite: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["MemberName", "Salutation", "Address__City", "EMail", "Phone1", "Source", "CampaignID", "Status", "OwnerID", "WorkgroupID"],
})
export class CRLead extends PXView {
	createLead: PXActionState;

	@linkCommand("Leads_ViewDetails")
	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
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
	allowUpdate: false,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CROpportunity extends PXView {
	AddOpportunity: PXActionState;

	@linkCommand("Opportunities_ViewDetails")
	OpportunityID: PXFieldState;
	Subject: PXFieldState;
	StageID: PXFieldState;
	CROpportunityProbability__Probability: PXFieldState<PXFieldOptions.Hidden>;
	Status: PXFieldState;
	CuryProductsAmount: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	CloseDate: PXFieldState;
	@linkCommand("Opportunities_BAccount_ViewDetails")
	BAccount__AcctCD: PXFieldState<PXFieldOptions.Hidden>;
	BAccount__AcctName: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("Opportunities_Contact_ViewDetails")
	Contact__DisplayName: PXFieldState<PXFieldOptions.Hidden>;
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	@linkCommand("Opportunities_CLassID_ViewDetails")
	ClassID: PXFieldState<PXFieldOptions.Hidden>;
	CROpportunityClass__Description: PXFieldState<PXFieldOptions.Hidden>;
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
	CRLead__ContactID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	adjustPageSize: true,
	syncPosition: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CRCase extends PXView {
	AddCase: PXActionState;

	@linkCommand("Cases_ViewDetails")
	CaseCD: PXFieldState;
	Subject: PXFieldState;
	CaseClassID: PXFieldState;
	ContractID: PXFieldState<PXFieldOptions.Hidden>;
	Severity: PXFieldState;
	Status: PXFieldState;
	Resolution: PXFieldState;
	@columnConfig({ allowUpdate: false })
	ReportedOnDateTime: PXFieldState;
	@columnConfig({ allowUpdate: false })
	TimeEstimated: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	ResolutionDate: PXFieldState;
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	Contact__ContactID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class Contract extends PXView {
	ContractCD: PXFieldState;
	Description: PXFieldState;
	Status: PXFieldState;
	ExpireDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
})
export class SOOrder extends PXView {
	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState;
	@linkCommand("Orders_ViewDetails")
	OrderNbr: PXFieldState;
	OrderDesc: PXFieldState<PXFieldOptions.Hidden>;
	CustomerOrderNbr: PXFieldState<PXFieldOptions.Hidden>;
	Status: PXFieldState<PXFieldOptions.Hidden>;
	RequestDate: PXFieldState;
	ShipDate: PXFieldState;
	ShipVia: PXFieldState<PXFieldOptions.Hidden>;
	ShipZoneID: PXFieldState<PXFieldOptions.Hidden>;
	OrderWeight: PXFieldState<PXFieldOptions.Hidden>;
	OrderVolume: PXFieldState<PXFieldOptions.Hidden>;
	OrderQty: PXFieldState;
	CuryOrderTotal: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	MarginPct: PXFieldState<PXFieldOptions.Hidden>;
}

export class CRActivityStatistics extends PXView {
	LastIncomingActivityDate: PXFieldState;
	LastOutgoingActivityDate: PXFieldState;
}

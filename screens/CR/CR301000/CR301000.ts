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
	controlConfig,
	gridConfig,
	columnConfig,
	GridPreset,
	ISelectorControlConfig,
	IMailEditorControlConfig,
	GridFilterBarVisibility,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.Objects.CR.LeadMaint",
	primaryView: "Lead",
	udfTypeField: "ClassID",
	showUDFIndicator: true,
	bpEventsIndicator: true,
})
export class CR301000 extends PXScreen {
	ViewOnMap: PXActionState;

	@viewInfo({ containerName: "Lead Summary" })
	Lead = createSingle(CRLeadHeader);

	@viewInfo({ containerName: "Lead" })
	LeadCurrent = createSingle(CRLead);

	@viewInfo({ containerName: "Address" })
	AddressCurrent = createSingle(Address);

	@viewInfo({ containerName: "Activity Statistics" })
	LeadActivityStatistics = createSingle(CRActivityStatistics);

	@viewInfo({ containerName: "Opportunities" })
	Opportunities = createCollection(CROpportunity);
}

export class CRLeadHeader extends PXView {
	@controlConfig<ISelectorControlConfig>({ nullText: NullTextValues.New, displayMode: "text" })
	ContactID: PXFieldState;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Resolution: PXFieldState<PXFieldOptions.CommitChanges>;
	ClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	RefContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Source: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CampaignID: PXFieldState<PXFieldOptions.CommitChanges>;
	DuplicateFound: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateStatus: PXFieldState<PXFieldOptions.Disabled>;
}

export class CRLead extends Contact {
	OverrideRefContact: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayName: PXFieldState;
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentAgreement: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsentExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideSalesTerritory: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTerritoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	Method: PXFieldState;
	NoCall: PXFieldState;
	NoMarketing: PXFieldState;
	NoEMail: PXFieldState;
	NoMassMail: PXFieldState;
	LanguageID: PXFieldState;
	AssignDate: PXFieldState;
	QualificationDate: PXFieldState;
	LastModifiedDateTime: PXFieldState;
	CreatedDateTime: PXFieldState;
	NoFax: PXFieldState;
	MemberName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CROpportunity extends PXView {
	convertToOpportunityAll: PXActionState;

	@linkCommand("Opportunities_ViewDetails")
	OpportunityID: PXFieldState;
	Subject: PXFieldState;
	StageID: PXFieldState;
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

export class CRActivityStatistics extends PXView {
	LastIncomingActivityDate: PXFieldState;
	LastOutgoingActivityDate: PXFieldState;
}

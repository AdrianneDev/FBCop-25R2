import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnShowHideMode,
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	GridPreset,
	GridNoteFilesShowMode,
	fieldConfig,
	headerDescription,
	controlConfig,
	ITreeSelectorConfig,
	treeConfig,
	ISelectorControlConfig,
	GridFilterBarVisibility,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRMassMailMaint",
	primaryView: "MassMails",
})
export class CR308000 extends PXScreen {

	@viewInfo({ containerName: "Mass Email" })
	MassMails = createSingle(CRMassMail);

	@viewInfo({ containerName: "Leads/Contacts/Employees" })
	Leads = createCollection(Contact);

	@viewInfo({ containerName: "Campaigns" })
	Campaigns = createCollection(CRCampaign);

	@viewInfo({ containerName: "Marketing Lists" })
	MailLists = createCollection(CRMarketingList);

	@viewInfo({ containerName: "Messages" })
	History = createCollection(CRActivity);
}

export class CRMassMail extends PXView {
	MassMailCD: PXFieldState;
	MailAccountID: PXFieldState;

	@headerDescription
	@fieldConfig({ controlType: "qp-tree-selector" })
	@controlConfig<ITreeSelectorConfig>({
		treeConfig: {
			idField: "Key",
			valueField: "Path",
			dataMember: "EntityItems",
			textField: "Name",
			iconField: "Icon",
			openedLayers: 1,
			hideRootNode: true,
		},
		allowEditValue: true,
		separator: " ",
		appendSelectedValue: true
	})
	MailSubject: PXFieldState;

	@fieldConfig({ controlType: "qp-tree-selector" })
	@controlConfig<ITreeSelectorConfig>({
		treeConfig: {
			idField: "Key",
			valueField: "Path",
			dataMember: "EntityItems",
			textField: "Name",
			iconField: "Icon",
			openedLayers: 1,
			hideRootNode: true,
		},
		allowEditValue: true,
		separator: " ",
		appendSelectedValue: true
	})
	MailTo: PXFieldState;

	@fieldConfig({ controlType: "qp-tree-selector" })
	@controlConfig<ITreeSelectorConfig>({
		treeConfig: {
			idField: "Key",
			valueField: "Path",
			dataMember: "EntityItems",
			textField: "Name",
			iconField: "Icon",
			openedLayers: 1,
			hideRootNode: true,
		},
		allowEditValue: true,
		separator: " ",
		appendSelectedValue: true
	})
	MailCc: PXFieldState;

	@fieldConfig({ controlType: "qp-tree-selector" })
	@controlConfig<ITreeSelectorConfig>({
		treeConfig: {
			idField: "Key",
			valueField: "Path",
			dataMember: "EntityItems",
			textField: "Name",
			iconField: "Icon",
			openedLayers: 1,
			hideRootNode: true,
		},
		allowEditValue: true,
		separator: " ",
		appendSelectedValue: true
	})
	MailBcc: PXFieldState;

	Source: PXFieldState<PXFieldOptions.CommitChanges>;
	PlannedDate: PXFieldState;
	Status: PXFieldState;
	SentDateTime: PXFieldState<PXFieldOptions.Disabled>;
	MailContent: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	adjustPageSize: true,
})
export class Contact extends PXView {
	@columnConfig({
		allowUpdate: false,
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Selected: PXFieldState;
	@columnConfig({ allowUpdate: false })
	ContactType: PXFieldState;
	@linkCommand("Leads_ViewDetails")
	@columnConfig({ allowUpdate: false })
	DisplayName: PXFieldState;
	@columnConfig({ allowUpdate: false })
	BAccount__AcctCD: PXFieldState;
	@columnConfig({ allowUpdate: false })
	FullName: PXFieldState;
	@columnConfig({ allowUpdate: false })
	BAccount__ClassID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	IsActive: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	ClassID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Source: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Status: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Title: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Salutation: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	EMail: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__Department: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__StreetName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__BuildingName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__Floor: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__UnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__PostBox: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__Room: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Address__DistrictName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Phone1: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Phone2: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Phone3: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	Fax: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	WebSite: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	DateOfBirth: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	CreatedByID_Creator_Username: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	LastModifiedByID_Modifier_Username: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false })
	OwnerID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: true,
	adjustPageSize: true,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class CRCampaign extends PXView {
	Selected: PXFieldState;
	@linkCommand("MassEmailCampaign_CRMarketingCampaign_ViewDetails")
	@columnConfig({ allowUpdate: false })
	CampaignID: PXFieldState;
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	CampaignName: PXFieldState;
	Status: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	SendFilter: PXFieldState;
	@columnConfig({ allowUpdate: false })
	CampaignType: PXFieldState<PXFieldOptions.Hidden>;;
	PromoCodeID: PXFieldState<PXFieldOptions.Hidden>;;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class CRMarketingList extends PXView {
	@columnConfig({ allowUpdate: false, allowCheckAll: true })
	Selected: PXFieldState;
	@linkCommand("MassEmailMarketingLists_CRMarketingList_ViewDetails")
	@columnConfig({ allowUpdate: false })
	MailListCode: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Name: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
})
export class CRActivity extends PXView {
	@linkCommand("History_ViewDetails")
	@columnConfig({ allowUpdate: false })
	Subject: PXFieldState;
	@columnConfig({ allowUpdate: false })
	MailTo: PXFieldState;
	@columnConfig({ allowUpdate: false })
	StartDate: PXFieldState;
	@columnConfig({ allowUpdate: false })
	MPStatus: PXFieldState;
	@linkCommand("ViewEntity")
	@columnConfig({ allowUpdate: false })
	Source: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewDocument")
	@columnConfig({ allowUpdate: false })
	DocumentSource: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("History_Contact_ViewDetails")
	@columnConfig({ allowUpdate: false })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("History_BAccount_ViewDetails")
	@columnConfig({ allowUpdate: false })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
}

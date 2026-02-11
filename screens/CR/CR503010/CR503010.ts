import {
	PXScreen,
	graphInfo,
	PXView,
	createCollection,
	PXFieldState,
	gridConfig,
	GridPagerMode,
	GridFilterBarVisibility,
	PXFieldOptions,
	columnConfig,
	linkCommand,
	GridPreset,
	GridNoteFilesShowMode,
	viewInfo,
	PXPageLoadBehavior,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.AssignLeadMassProcess",
	primaryView: "Items",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class CR503010 extends PXScreen {
	@viewInfo({ containerName: "Matching Records" })
	Items = createCollection(CRLead);
}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["MemberName", "FullName"],
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class CRLead extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("Items_ViewDetails")
	MemberName: PXFieldState;
	Title: PXFieldState<PXFieldOptions.Hidden>;
	FirstName: PXFieldState<PXFieldOptions.Hidden>;
	LastName: PXFieldState<PXFieldOptions.Hidden>;
	Salutation: PXFieldState;
	DuplicateStatus: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("Items_BAccount_ViewDetails")
	BAccount__AcctCD: PXFieldState;
	FullName: PXFieldState;
	@linkCommand("Items_BAccountParent_ViewDetails")
	BAccountParent__AcctCD: PXFieldState<PXFieldOptions.Hidden>;
	BAccountParent__AcctName: PXFieldState<PXFieldOptions.Hidden>;
	Status: PXFieldState;
	Resolution: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	ClassID: PXFieldState;
	Source: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CampaignID: PXFieldState;
	State__name: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
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
	Fax: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	CRActivityStatistics__LastIncomingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	CRActivityStatistics__LastOutgoingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	CreatedByID_Creator_Username: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByID_Modifier_Username: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	SalesTerritoryID: PXFieldState<PXFieldOptions.Hidden>;
}

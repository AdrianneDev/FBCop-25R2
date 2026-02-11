import {
	PXView,
	PXFieldState,
	linkCommand,
	createCollection,
	gridConfig,
	PXActionState,
	viewInfo,
	GridPreset,
	columnConfig,
	PXFieldOptions,
	handleEvent,
	CustomEventType,
	PXViewCollection,
	RowSelectedHandlerArgs,
	GridFilterBarVisibility,
} from "client-controls";

export abstract class ContactsBase {

	@viewInfo({ containerName: "Contacts" })
	Contacts = createCollection(ContactDetail);

	@handleEvent(CustomEventType.RowSelected, { view: "Contacts" })
	onDuplicateSelected(args: RowSelectedHandlerArgs<PXViewCollection<ContactDetail>>) {
		const model = args.viewModel;

		if (model?.MakeContactPrimary) {
			model.MakeContactPrimary.enabled = !!args.viewModel.activeRow?.CanBeMadePrimary?.value;
		}
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["DisplayName", "Salutation", "EMail", "Phone1"],
})
export class ContactDetail extends PXView {
	CreateContactToolBar: PXActionState;
	MakeContactPrimary: PXActionState;

	IsActive: PXFieldState;
	IsPrimary: PXFieldState;
	@linkCommand("ViewContact")
	DisplayName: PXFieldState;
	Salutation: PXFieldState;
	EMail: PXFieldState;
	Phone1: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	FullName: PXFieldState<PXFieldOptions.Hidden>;
	ClassID: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	Source: PXFieldState<PXFieldOptions.Hidden>;
	AssignDate: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateStatus: PXFieldState<PXFieldOptions.Hidden>;
	Phone2: PXFieldState<PXFieldOptions.Hidden>;
	Phone3: PXFieldState<PXFieldOptions.Hidden>;
	DateOfBirth: PXFieldState<PXFieldOptions.Hidden>;
	Fax: PXFieldState<PXFieldOptions.Hidden>;
	Gender: PXFieldState<PXFieldOptions.Hidden>;
	Method: PXFieldState<PXFieldOptions.Hidden>;
	NoCall: PXFieldState<PXFieldOptions.Hidden>;
	NoEMail: PXFieldState<PXFieldOptions.Hidden>;
	NoFax: PXFieldState<PXFieldOptions.Hidden>;
	NoMail: PXFieldState<PXFieldOptions.Hidden>;
	NoMarketing: PXFieldState<PXFieldOptions.Hidden>;
	NoMassMail: PXFieldState<PXFieldOptions.Hidden>;
	CampaignID: PXFieldState<PXFieldOptions.Hidden>;
	Phone1Type: PXFieldState<PXFieldOptions.Hidden>;
	Phone2Type: PXFieldState<PXFieldOptions.Hidden>;
	Phone3Type: PXFieldState<PXFieldOptions.Hidden>;
	FaxType: PXFieldState<PXFieldOptions.Hidden>;
	MaritalStatus: PXFieldState<PXFieldOptions.Hidden>;
	Spouse: PXFieldState<PXFieldOptions.Hidden>;
	Status: PXFieldState<PXFieldOptions.Hidden>;
	Resolution: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	LanguageID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	Address__State: PXFieldState<PXFieldOptions.Hidden>;
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
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
	CanBeMadePrimary: PXFieldState<PXFieldOptions.Hidden>;
}

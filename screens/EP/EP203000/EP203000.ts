import {
	PXScreen,
	graphInfo,
	PXView,
	createCollection,
	PXFieldState,
	gridConfig,
	PXActionState,
	viewInfo,
	createSingle,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	linkCommand,
	GridPreset,
	GridNoteFilesShowMode,
	controlConfig,
	ISelectorControlConfig,
	IMailEditorControlConfig,
	GridFilterBarVisibility,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";

@graphInfo({
	graphType: "PX.Objects.EP.EmployeeMaint",
	primaryView: "Employee",
	bpEventsIndicator: true,
	udfTypeField: "",
})
export class EP203000 extends PXScreen {
	ResetPassword: PXActionState;
	ActivateLogin: PXActionState;
	EnableLogin: PXActionState;
	DisableLogin: PXActionState;
	UnlockLogin: PXActionState;
	ResetPasswordOK: PXActionState;
	ViewMap: PXActionState;
	EmployeeSchedule: PXActionState;
	OpenLicenseDocument: PXActionState;

	@viewInfo({ containerName: "Employee Summary" })
	Employee = createSingle(EPEmployeeHeader);

	@viewInfo({ containerName: "Employee" })
	CurrentEmployee = createSingle(EPEmployee);

	@viewInfo({ containerName: "Contact Info" })
	Contact = createSingle(ContactDetail);

	@viewInfo({ containerName: "Address Info" })
	Address = createSingle(Address);

	@viewInfo({ containerName: "History" })
	EmployeePositions = createCollection(EPEmployeePosition);

	@viewInfo({ containerName: "Financial" })
	DefLocation = createSingle(Location);

	@viewInfo({ containerName: "Payment Instructions" })
	PaymentDetails = createCollection(VendorPaymentMethodDetail);

	@viewInfo({ containerName: "Mailing & Printing" })
	NWatchers = createCollection(NotificationRecipient);

	@viewInfo({ containerName: "Workgroups" })
	CompanyTree = createCollection(EPCompanyTreeMember);

	@viewInfo({ containerName: "Assignment and Approval Maps" })
	AssigmentAndApprovalMaps = createCollection(EPRule);

	@viewInfo({ containerName: "User" })
	User = createSingle(Users);

	@viewInfo({ containerName: "Corporate Cards" })
	EmployeeCorpCards = createCollection(EPEmployeeCorpCardLink);

	@viewInfo({ containerName: "Labor Item Overrides" })
	LaborMatrix = createCollection(EPEmployeeClassLaborMatrix);

	@viewInfo({ containerName: "Skills" })
	EmployeeSkills = createCollection(FSEmployeeSkill);

	@viewInfo({ containerName: "Service Areas" })
	EmployeeGeoZones = createCollection(FSGeoZoneEmp);

	@viewInfo({ containerName: "Licenses" })
	EmployeeLicenses = createCollection(FSLicense);

	@viewInfo({ containerName: "Dialog: Generate Time Cards" })
	GenTimeCardFilter = createSingle(GenTimeCardFilter);
}

export class EPEmployeeHeader extends PXView {
	AcctCD: PXFieldState;
	AcctName: PXFieldState;
	VStatus: PXFieldState;
	ChkServiceManagement: PXFieldState;
}

export class EPEmployee extends PXView {
	AcctReferenceNbr: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ParentBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DepartmentID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	VendorClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CalendarID: PXFieldState;
	DefaultWorkgroupID: PXFieldState;
	HoursValidation: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	SupervisorID: PXFieldState;
	SalesPersonID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	UserID: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CuryID: PXFieldState;
	AllowOverrideCury: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CuryRateTypeID: PXFieldState;
	AllowOverrideRate: PXFieldState;
	BaseCuryID: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LabourItemID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ShiftID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	UnionID: PXFieldState;
	RouteEmails: PXFieldState;
	TimeCardRequired: PXFieldState;
	AMProductionEmployee: PXFieldState;
	SDEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentSubID: PXFieldState;
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseSubID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	SalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesSubID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TermsID: PXFieldState;
	CreatedDateTime: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

export class ContactDetail extends Contact {
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;
	Synchronize: PXFieldState;
	DateOfBirth: PXFieldState;
}

export class Location extends PXView {
	VAPAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	VAPSubID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	VTaxZoneID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	VPaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	VCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Attributes,
	adjustPageSize: true,
})
export class VendorPaymentMethodDetail extends PXView {
	@columnConfig({ allowUpdate: false })
	PaymentMethodDetail__descr: PXFieldState;
	DetailValue: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class EPEmployeePosition extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	PositionID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	StartReason: PXFieldState<PXFieldOptions.CommitChanges>;
	ProbationPeriodEndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsTerminated: PXFieldState<PXFieldOptions.CommitChanges>;
	TermReason: PXFieldState<PXFieldOptions.CommitChanges>;
	IsRehirable: PXFieldState<PXFieldOptions.CommitChanges>;
	SettlementPaycheckRefNoteID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowUpdate: false,
	allowInsert: false,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class NotificationRecipient extends PXView {
	@columnConfig({ allowUpdate: false })
	Active: PXFieldState;
	@columnConfig({ allowUpdate: false })
	NotificationSetup__Module: PXFieldState;
	@columnConfig({ allowUpdate: false })
	NotificationSetup__SourceCD: PXFieldState;
	@columnConfig({ allowUpdate: false })
	NotificationSetup__NotificationCD: PXFieldState;
	@columnConfig({ allowUpdate: false })
	ClassID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	ReportID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	TemplateID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Format: PXFieldState;
	@columnConfig({ allowUpdate: false })
	AddTo: PXFieldState;
	NotificationID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class EPCompanyTreeMember extends PXView {
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	WorkGroupID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	IsOwner: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	fastFilterByAllFields: false,
})
export class EPRule extends PXView {
	@linkCommand<EP203000>("ViewMap")
	@columnConfig({ allowUpdate: false })
	EPAssignmentMap__Name: PXFieldState;
	@columnConfig({ allowUpdate: false })
	StepName: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Name: PXFieldState;
}

export class Users extends PXView {
	State: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LoginTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	Username: PXFieldState<PXFieldOptions.CommitChanges>;
	Password: PXFieldState;
	GeneratePassword: PXFieldState<PXFieldOptions.CommitChanges>;
	NewPassword: PXFieldState;
	ConfirmPassword: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class EPEmployeeCorpCardLink extends PXView {
	@columnConfig({ allowUpdate: false })
	CorpCardID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	CACorpCard__Name: PXFieldState;
	@columnConfig({ allowUpdate: false })
	CACorpCard__CardNumber: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class EPEmployeeClassLaborMatrix extends PXView {
	EarningType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	EPEarningType__Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class FSEmployeeSkill extends PXView {
	@columnConfig({ hideViewLink: true })
	SkillID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	FSSkill__Descr: PXFieldState;
	@columnConfig({ allowUpdate: false })
	FSSkill__IsDriverSkill: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class FSGeoZoneEmp extends PXView {
	@columnConfig({ allowUpdate: false })
	GeoZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	FSGeoZone__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	fastFilterByAllFields: false,
})
export class FSLicense extends PXView {
	@linkCommand<EP203000>("OpenLicenseDocument")
	@columnConfig({ allowUpdate: false })
	RefNbr: PXFieldState;
	@columnConfig({ allowUpdate: false })
	LicenseTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	Descr: PXFieldState;
	@columnConfig({ allowUpdate: false })
	IssueDate: PXFieldState;
	@columnConfig({ allowUpdate: false })
	NeverExpires: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false })
	ExpirationDate: PXFieldState;
}

export class GenTimeCardFilter extends PXView {
	LastDateGenerated: PXFieldState;
	GenerateUntil: PXFieldState<PXFieldOptions.CommitChanges>;
}

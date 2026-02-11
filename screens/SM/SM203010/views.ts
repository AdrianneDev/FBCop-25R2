import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnType, TextAlign, GridPreset, GridColumnDisplayMode, PXActionState } from "client-controls";


// Views

export class Users extends PXView {
	Username: PXFieldState<PXFieldOptions.Disabled>;
	FirstName: PXFieldState;
	LastName: PXFieldState;
	Phone: PXFieldState;
	Email: PXFieldState<PXFieldOptions.Disabled>;
	Password: PXFieldState<PXFieldOptions.Disabled>;
	PasswordQuestion: PXFieldState;
	Comment: PXFieldState;
}

export class UserPreferences extends PXView {
	PdfCertificateName: PXFieldState;
	TimeZone: PXFieldState;
	DefBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltBranchLocationID: PXFieldState;
	DfltSrvOrdType: PXFieldState;
	AskForSrvOrdTypeInCalendars: PXFieldState;
	DefaultSite: PXFieldState;
	DefaultScannerID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultScalesID: PXFieldState<PXFieldOptions.CommitChanges>;
	HomePage: PXFieldState;
	DisableSuggest: PXFieldState;
	EnableSmartSuggest: PXFieldState;
	PacejetWorkstationID: PXFieldState;
	PPSMode: PXFieldState<PXFieldOptions.CommitChanges>;
	RPAMode: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultEMailAccountID: PXFieldState;
	SignatureToNewEmail: PXFieldState;
	SignatureToReplyAndForward: PXFieldState;
	MailSignature: PXFieldState;
	DefaultPrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class PasswordsInfo extends PXView {
	OldPassword: PXFieldState;
	NewPassword: PXFieldState;
	ConfirmPassword: PXFieldState;
}

export class NewEmailInfo extends PXView {
	Email: PXFieldState<PXFieldOptions.CommitChanges>;
	Password: PXFieldState;
}

export class NewAnswerInfo extends PXView {
	PasswordAnswer: PXFieldState;
	Password: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false
})
export class EMailAccount extends PXView {
	CheckEmailAccount: PXActionState;
	EmailAccountSignIn: PXActionState;
	EmailAccountSignOut: PXActionState;
	UpdatePassword: PXActionState;

	@linkCommand("ViewEMailAccount")
	Description: PXFieldState;
	@columnConfig({ width: 350 }) Address: PXFieldState;
	@columnConfig({ width: 80, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	EmailAccountType: PXFieldState;
	@columnConfig({ width: 190 }) AuthenticationMethod: PXFieldState;
	LoginName: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) CanSignIn: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) CanSignOut: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) CanUpdatePassword: PXFieldState;
}

export class AccessToken extends PXView {
	SignInToTeams: PXActionState;
	SignOut: PXActionState;
	TestConnection: PXActionState;

	UserType: PXFieldState;
}

export class Contact extends PXView {
	TeamsID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultTeamsClient: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class EPWingman extends PXView {
	DelegationOf: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 200, displayMode: GridColumnDisplayMode.Text }) WingmanID: PXFieldState<PXFieldOptions.CommitChanges>;
	WingmanID_EPEmployee_acctName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	StartsOn: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpiresOn: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class LocaleFormat extends PXView {
	TemplateLocale: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTimePattern: PXFieldState;
	TimeShortPattern: PXFieldState;
	TimeLongPattern: PXFieldState;
	DateShortPattern: PXFieldState;
	DateLongPattern: PXFieldState;
	AMDesignator: PXFieldState;
	PMDesignator: PXFieldState;
	NumberDecimalSeporator: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberGroupSeparator: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false
})
export class OidcUser extends PXView {
	@columnConfig({ width: 108 }) ProviderName: PXFieldState;
	@columnConfig({ width: 90, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) Active: PXFieldState;
	@columnConfig({ width: 250 }) UserKey: PXFieldState;
	@columnConfig({ width: 250 }) UserIdentityClaimType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false
})
export class MobilePushNotificationRegToken extends PXView {
	@columnConfig({ width: 160, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) Enabled: PXFieldState;
	@columnConfig({ width: 200 }) ApplicationInstanceID: PXFieldState;
	@columnConfig({ width: 200 }) DeviceName: PXFieldState;
	@columnConfig({ width: 200 }) DeviceModel: PXFieldState;
	@columnConfig({ width: 160 }) DeviceOS: PXFieldState;
	@columnConfig({ width: 160, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) ExpiredToken: PXFieldState;
	@columnConfig({ width: 180, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsConfirmation: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class NotificationSetupUserOverride extends PXView {
	SetupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ format: "CC.CC.CC.CC" }) ReportID: PXFieldState;
	DefaultPrinterID: PXFieldState;
	ShipVia: PXFieldState;
	@columnConfig({ allowNull: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) Active: PXFieldState;
}

export class UpdatePasswordFilter extends PXView {
	EmailAccountPassword: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class TestEmailAccountFilter extends PXView {
	EmailAddress: PXFieldState;
}

export class SMCalendarSettings extends PXView {
	IsPublic: PXFieldState;
}

export class CustomerManagementFeature extends PXView {
	IsInstalled: PXFieldState;
	IsOutlookIntegrationInstalled: PXFieldState;
	IsOpenIDConnectInstalled: PXFieldState;
	IsOutlookOidcEnabled: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false
})
export class APPaymentProcessorAccount extends PXView  {
	ManageFundingAccounts: PXActionState;
	APPaymentProcessorAccountUser__Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OrganizationID: PXFieldState;
	ExternalAccountID: PXFieldState;
	ExternalAccountBank: PXFieldState;
	ExternalAccountType: PXFieldState;
	ExternalAccountNumber: PXFieldState;
	Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;
}

import {
	PXView,
	PXFieldState,
	gridConfig,
	controlConfig,
	PXFieldOptions,
	columnConfig,
	GridAutoGrowMode,
	GridColumnType,
	PXActionState,
	TextAlign,
	INumberEditorControlConfig,
} from "client-controls";

// Views

export class Users extends PXView {
	Username: PXFieldState;
	Password: PXFieldState;
	GeneratePassword: PXFieldState<PXFieldOptions.CommitChanges>;
	ForbidLoginWithPassword: PXFieldState<PXFieldOptions.CommitChanges>;
	Guest: PXFieldState<PXFieldOptions.CommitChanges>;
	LoginTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	FirstName: PXFieldState;
	LastName: PXFieldState;
	Email: PXFieldState<PXFieldOptions.CommitChanges>;
	Comment: PXFieldState;
	State: PXFieldState<PXFieldOptions.Disabled>;
	AllowPasswordRecovery: PXFieldState;
	PasswordChangeable: PXFieldState;
	PasswordNeverExpires: PXFieldState;
	PasswordChangeOnNextLogin: PXFieldState;
	@controlConfig<INumberEditorControlConfig>({allowNull: true})
	AllowedSessions: PXFieldState;
	OverrideADRoles: PXFieldState<PXFieldOptions.CommitChanges>;
	Source: PXFieldState<PXFieldOptions.Hidden>;
	OverrideLocalRolesWithOidcProviderRoles: PXFieldState<PXFieldOptions.CommitChanges>;
	MultiFactorOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MultiFactorType: PXFieldState;
	NewPassword: PXFieldState<PXFieldOptions.CommitChanges>;
	ConfirmPassword: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class Users2 extends PXView {
	CreationDate: PXFieldState;
	LastLoginDate: PXFieldState;
	LastLockedOutDate: PXFieldState;
	LastPasswordChangedDate: PXFieldState;
	FailedPasswordAttemptCount: PXFieldState;
	FailedPasswordAnswerAttemptCount: PXFieldState;
}

@gridConfig({ allowDelete: false })
export class EPLoginTypeAllowsRole extends PXView {
	@columnConfig({
		allowSort: false,
		width: 80,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
	})
	Selected: PXFieldState;
	@columnConfig({ allowUpdate: false, width: 200 }) Rolename: PXFieldState;
	@columnConfig({ allowUpdate: false, width: 400 })
	Rolename_Roles_descr: PXFieldState;
}

@gridConfig({ allowDelete: false })
export class UsersInRoles extends PXView {
	@columnConfig({ width: 200 }) Rolename: PXFieldState;
	@columnConfig({ allowUpdate: false, width: 300 })
	Rolename_Roles_descr: PXFieldState;
}

@gridConfig({ fastFilterByAllFields: false })
export class UserFilter extends PXView {
	@columnConfig({ width: 200, editorType: "qp-mask-editor", editorConfig: { emptyChar: "0"} }) StartIPAddress: PXFieldState;
	@columnConfig({ width: 200, editorType: "qp-mask-editor", editorConfig: { emptyChar: "0"} }) EndIPAddress: PXFieldState;
}

@gridConfig({
	allowInsert: false,
	allowDelete: false,
	fastFilterByAllFields: false,
	syncPosition: true,
	topBarItems: {
		removeIdentity: {
			index: 2,
			config: {
				commandName: "removeIdentity",
				images: { normal: "main@RecordDel" },
			},
		},
	},
})
export class OidcUser extends PXView {
	removeIdentity: PXActionState;
	@columnConfig({ width: 180 }) ProviderName: PXFieldState;
	@columnConfig({
		width: 90,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
	})
	Active: PXFieldState;
	@columnConfig({ width: 250 }) UserKey: PXFieldState;
	@columnConfig({ width: 250 }) UserIdentityClaimType: PXFieldState;
}

export class UserPreferences extends PXView {
	PdfCertificateName: PXFieldState;
	TimeZone: PXFieldState;
	@controlConfig({displayMode: "id"})
	DefBranchID: PXFieldState;
	HomePage: PXFieldState;
	PacejetWorkstationID: PXFieldState;
	TrackLocation: PXFieldState<PXFieldOptions.CommitChanges>;
	Interval: PXFieldState;
	Distance: PXFieldState;
}

export class Contact extends PXView {
	TeamsID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultTeamsClient: PXFieldState;
}

@gridConfig({
	allowDelete: false,
	allowInsert: false,
	fastFilterByAllFields: false,
	topBarItems: {
		AddEMailAccount: {
			index: 2,
			config: {
				commandName: "AddEMailAccount",
				images: { normal: "main@RecordAdd" },
				toolTip: "Add Email Account",
			},
		},
	},
})
export class EMailAccount extends PXView {
	AddEMailAccount: PXActionState;
	Description: PXFieldState;
	@columnConfig({ width: 200 }) Address: PXFieldState;
	@columnConfig({
		width: 80,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
	})
	IsActive: PXFieldState;
	@columnConfig({ width: 200 }) EmailAccountType: PXFieldState;
	@columnConfig({ width: 200 }) AuthenticationMethod: PXFieldState;
	LoginName: PXFieldState;

	ReplyAddress: PXFieldState<PXFieldOptions.Hidden>;
	PluginTypeName: PXFieldState<PXFieldOptions.Hidden>;
	IsOfPluginType: PXFieldState<PXFieldOptions.Hidden>;
	SenderDisplayNameSource: PXFieldState<PXFieldOptions.Hidden>;
	AccountDisplayName: PXFieldState<PXFieldOptions.Hidden>;
	AuthenticationType: PXFieldState<PXFieldOptions.Hidden>;
	OAuthApplicationID: PXFieldState<PXFieldOptions.Hidden>;
	AzureTenantID: PXFieldState<PXFieldOptions.Hidden>;
	OutcomingHostName: PXFieldState<PXFieldOptions.Hidden>;
	OutcomingAuthenticationRequest: PXFieldState<PXFieldOptions.Hidden>;
	OutcomingAuthenticationDifferent: PXFieldState<PXFieldOptions.Hidden>;
	OutcomingSSLRequest: PXFieldState<PXFieldOptions.Hidden>;
	OutcomingLoginName: PXFieldState<PXFieldOptions.Hidden>;
	OutcomingPort: PXFieldState<PXFieldOptions.Hidden>;
	OutcomingMailSender: PXFieldState<PXFieldOptions.Hidden>;
	IncomingHostProtocol: PXFieldState<PXFieldOptions.Hidden>;
	IncomingProcessing: PXFieldState<PXFieldOptions.Hidden>;
	AddIncomingProcessingTags: PXFieldState<PXFieldOptions.Hidden>;
	IncomingHostName: PXFieldState<PXFieldOptions.Hidden>;
	IncomingSSLRequest: PXFieldState<PXFieldOptions.Hidden>;
	IncomingPort: PXFieldState<PXFieldOptions.Hidden>;
	SendGroupMails: PXFieldState<PXFieldOptions.Hidden>;
	AutoReceiveDelay: PXFieldState<PXFieldOptions.Hidden>;
	ImapRootFolder: PXFieldState<PXFieldOptions.Hidden>;
	ValidateFrom: PXFieldState<PXFieldOptions.Hidden>;
	Timeout: PXFieldState<PXFieldOptions.Hidden>;
	FetchingBehavior: PXFieldState<PXFieldOptions.Hidden>;
	IncomingDelSuccess: PXFieldState<PXFieldOptions.Hidden>;
	IncomingAttachmentType: PXFieldState<PXFieldOptions.Hidden>;
	DeleteUnProcessed: PXFieldState<PXFieldOptions.Hidden>;
	ProcessUnassigned: PXFieldState<PXFieldOptions.Hidden>;
	ResponseNotificationID: PXFieldState<PXFieldOptions.Hidden>;
	ConfirmReceipt: PXFieldState<PXFieldOptions.Hidden>;
	ConfirmReceiptNotificationID: PXFieldState<PXFieldOptions.Hidden>;
	ProcessScenarioID: PXFieldState<PXFieldOptions.Hidden>;
	ForbidRouting: PXFieldState<PXFieldOptions.Hidden>;
	Included: PXFieldState<PXFieldOptions.Hidden>;
	InboxCount: PXFieldState<PXFieldOptions.Hidden>;
	OutboxCount: PXFieldState<PXFieldOptions.Hidden>;
	EMailAccountStatistics__LastSendDateTime: PXFieldState<PXFieldOptions.Hidden>;
	EMailAccountStatistics__LastReceiveDateTime: PXFieldState<PXFieldOptions.Hidden>;
	DefaultWorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	DefaultOwnerID: PXFieldState<PXFieldOptions.Hidden>;
	DefaultEmailAssignmentMapID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedByScreenID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByScreenID: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	allowInsert: false,
	fastFilterByAllFields: false,
})
export class MobilePushNotificationRegToken extends PXView {
	deleteDevices: PXActionState;
	disableDevices: PXActionState;
	enableDevices: PXActionState;
	@columnConfig({
		width: 160,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
	})
	Enabled: PXFieldState;
	@columnConfig({ width: 200 }) ApplicationInstanceID: PXFieldState;
	@columnConfig({ width: 200 }) DeviceName: PXFieldState;
	@columnConfig({ width: 200 }) DeviceModel: PXFieldState;
	@columnConfig({ width: 200 }) DeviceOS: PXFieldState;
	@columnConfig({
		width: 160,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
	})
	ExpiredToken: PXFieldState;
	@columnConfig({
		width: 160,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
	})
	IsConfirmation: PXFieldState;
}

@gridConfig({ autoGrowInHeight: GridAutoGrowMode.Fit })
export class FSGPSTrackingRequest extends PXView {
	@columnConfig({ width: 100 })
	WeekDay: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 100, format: "t" }) StartTime: PXFieldState;
	@columnConfig({ width: 100, format: "t" }) EndTime: PXFieldState;
}

export class ADUserFilter extends PXView {
	Username: PXFieldState<PXFieldOptions.CommitChanges>;
}

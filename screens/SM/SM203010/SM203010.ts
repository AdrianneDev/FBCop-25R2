import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, localizable, handleEvent, CustomEventType, CurrentRowChangedHandlerArgs, PXViewCollection } from "client-controls";
import { Users, UserPreferences, PasswordsInfo, NewEmailInfo, NewAnswerInfo, EMailAccount, AccessToken, Contact, EPWingman, LocaleFormat, OidcUser, MobilePushNotificationRegToken, NotificationSetupUserOverride, UpdatePasswordFilter, TestEmailAccountFilter, SMCalendarSettings, CustomerManagementFeature, APPaymentProcessorAccount } from "./views";

@localizable
export class LocalizableStrings {
	static ResetTimeZone_tooltip = "Reset To Calendar Time Zone";
}

@graphInfo({ graphType: "PX.SM.MyProfileMaint", primaryView: "UserProfile", })
export class SM203010 extends PXScreen {
	ViewEMailAccount: PXActionState;
	changeEmail: PXActionState;
	changePassword: PXActionState;
	changeSecretAnswer: PXActionState;
	resetTimeZone: PXActionState;
	removeIdentity: PXActionState;
	GetCalendarSyncUrl: PXActionState;


	@viewInfo({ containerName: "User Profile Settings" })
	UserProfile = createSingle(Users);
	@viewInfo({ containerName: "User Profile Settings" })
	UserPrefs = createSingle(UserPreferences);
	@viewInfo({ containerName: "Change Password" })
	Passwords = createSingle(PasswordsInfo);
	@viewInfo({ containerName: "Change Email" })
	NewEmail = createSingle(NewEmailInfo);
	@viewInfo({ containerName: "Change Password Recovery Answer" })
	NewAnswer = createSingle(NewAnswerInfo);
	@viewInfo({ containerName: "User Profile Settings" })
	EMailAccounts = createCollection(EMailAccount);
	@viewInfo({ containerName: "User Profile Settings" })
	Contact = createSingle(Contact);
	@viewInfo({ containerName: "User Profile Settings" })
	Delegates = createCollection(EPWingman);
	@viewInfo({ containerName: "Locale Preferences" })
	LocaleFormats = createSingle(LocaleFormat);
	@viewInfo({ containerName: "User Profile Settings" })
	Identities = createCollection(OidcUser);
	@viewInfo({ containerName: "User Profile Settings" })
	UserDevices = createCollection(MobilePushNotificationRegToken);
	@viewInfo({ containerName: "Printers by Report" })
	Notifications = createCollection(NotificationSetupUserOverride);
	@viewInfo({ containerName: "Update Password" })
	UpdatePasswordFilterView = createSingle(UpdatePasswordFilter);
	@viewInfo({ containerName: "Send Test Email" })
	SendTestEmailFilter = createSingle(TestEmailAccountFilter);
	CalendarSettings = createSingle(SMCalendarSettings);
	@viewInfo({ containerName: "Teams Settings" })
	AccessToken = createSingle(AccessToken);
	@viewInfo({containerName: "Funding Accounts"})
	PaymentProcessorAccounts = createCollection(APPaymentProcessorAccount);

	@viewInfo({ syncAlways: true })
	CustomerModule = createSingle(CustomerManagementFeature);

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "EMailAccounts" })
	onEMailAccountChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<EMailAccount>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.CheckEmailAccount) model.CheckEmailAccount.enabled = !!ar;

		if (model.EmailAccountSignIn) {
			model.EmailAccountSignIn.enabled = !!ar;
			model.EmailAccountSignIn.visible = !!ar?.CanSignIn?.value;
		}

		if (model.EmailAccountSignOut) {
			model.EmailAccountSignOut.enabled = !!ar;
			model.EmailAccountSignOut.visible = !!ar?.CanSignOut?.value;
		}

		if (model.UpdatePassword) {
			model.UpdatePassword.enabled = !!ar;
			model.UpdatePassword.visible = !!ar?.CanUpdatePassword?.value;
		}
	}
}

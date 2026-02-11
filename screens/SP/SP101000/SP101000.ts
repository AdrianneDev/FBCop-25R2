import "../sp-common.scss";
import "./SP101000.scss";
import {
	createSingle, graphInfo, commitChanges, PXView, localizable,
	PXFieldState, PXPageLoadBehavior,
	PXActionState,
	fieldConfig
} from "client-controls";
import { PortalScreen } from "../sp-base";
import { Messages as SysMessages } from "client-controls/services/messages";

export class ContactView extends PXView {
	@commitChanges Title: PXFieldState;
	@commitChanges FirstName: PXFieldState;
	@commitChanges LastName: PXFieldState;
	@commitChanges Salutation: PXFieldState;
	@commitChanges Email: PXFieldState;
	@commitChanges Phone1: PXFieldState;
	@commitChanges OverrideAddress: PXFieldState;
}

export class AddressCurrentView extends PXView {
	@commitChanges AddressLine1: PXFieldState;
	@commitChanges AddressLine2: PXFieldState;
	@commitChanges City: PXFieldState;
	@commitChanges State: PXFieldState;
	@commitChanges PostalCode: PXFieldState;
	@commitChanges CountryID: PXFieldState;
	@commitChanges Latitude: PXFieldState;
	@commitChanges Longitude: PXFieldState;
}

export class UserPrefView extends PXView {
	@commitChanges TimeZone: PXFieldState;
	@commitChanges HomePage: PXFieldState;
}

export class UserProfileView extends PXView {
	PKID: PXFieldState;
	DisplayName: PXFieldState;
	Username: PXFieldState;
	@commitChanges PasswordQuestion: PXFieldState;
	@commitChanges PasswordAnswer: PXFieldState;
}

export class PasswordsView extends PXView {
	@fieldConfig({ controlConfig: { type: 2 }, controlType: "qp-text-editor" })
	@commitChanges OldPassword: PXFieldState;

	@fieldConfig({ controlConfig: { type: 2 }, controlType: "qp-text-editor" })
	@commitChanges NewPassword: PXFieldState;

	@fieldConfig({ controlConfig: { type: 2 }, controlType: "qp-text-editor" })
	@commitChanges ConfirmPassword: PXFieldState;
}

export class NewAnswerView extends PXView {
	@commitChanges PasswordQuestion: PXFieldState;
	@commitChanges Password: PXFieldState;
	@commitChanges PasswordAnswer: PXFieldState;
}

@localizable
class Messages {
	static LocationSettingsCaption = "Location Settings";
	static ChangeButton = "Change";
	static ShowPasswordAnswerButtonText = "Show";
}

@graphInfo({
	graphType: "PX.Objects.Portals.SPProfileMaint",
	primaryView: "UserProfile",
	pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord,
})
export class SP101000 extends PortalScreen {
	changeSecretAnswerExt: PXActionState;
	signIn: PXActionState;
	msg = Messages;
	SysMessages = SysMessages;

	Contact = createSingle(ContactView);
	AddressCurrent = createSingle(AddressCurrentView);

	public PasswordFieldConfigType = 2;

	UserProfile = createSingle(UserProfileView);
	UserPrefs = createSingle(UserPrefView);
	Passwords = createSingle(PasswordsView);
	NewAnswer = createSingle(NewAnswerView);

	ShowPasswordAnswer() {
		// 0 is text and 2 is password
		this.PasswordFieldConfigType = this.PasswordFieldConfigType === 0 ? 2 : 0;
	};
}

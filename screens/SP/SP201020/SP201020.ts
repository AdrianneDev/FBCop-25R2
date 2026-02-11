import { columnConfig } from "client-controls";
import "../sp-common.scss";
import "./SP201020.scss";
import {
	createCollection, createSingle, graphInfo, commitChanges, PXView, localizable, gridConfig,
	PXFieldState, viewInfo,
	GridPreset,
	GridAutoGrowMode,
	GridNoteFilesShowMode,
} from "client-controls";
import { PortalScreen } from "../sp-base";

export class ContactView extends PXView {
	ContactID: PXFieldState;
	@commitChanges Title: PXFieldState;
	@commitChanges FirstName: PXFieldState;
	@commitChanges LastName: PXFieldState;
	@commitChanges Salutation: PXFieldState;
	@commitChanges Email: PXFieldState;
	@commitChanges Phone1: PXFieldState;
	@commitChanges Status: PXFieldState;
	@commitChanges IsActive: PXFieldState;
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
}

export class UserView extends PXView {
	@commitChanges Username: PXFieldState;
	State: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: false,
	initNewRow: false,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showRowSelectors: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class RolesView extends PXView {
	@columnConfig({allowCheckAll: false, width: 35}) Selected: PXFieldState;
	@columnConfig({hideViewLink: true}) Rolename: PXFieldState;
}

export class FieldStateFilterView extends PXView {
	UserRolesFieldState: PXFieldState;
	UsernameEditMode: PXFieldState;
	UsernameEditButton: PXFieldState;
}

@localizable
class Messages {
	static ContactInfoCaption = "Contact Info";
	static AddressCaption = "Address";
	static AccessInfoCaption = "Portal Access";
	static OtherSettingsCaption = "Other Settings";
}



@graphInfo({ graphType: "PX.Objects.Portals.SPContactMaint", primaryView: "Contact"})
export class SP201020 extends PortalScreen {
	msg = Messages;

	@viewInfo({syncAlways: true})
	StateFilter = createSingle(FieldStateFilterView);

	Contact = createSingle(ContactView);
	AddressCurrent = createSingle(AddressCurrentView);
	UserPrefs = createSingle(UserPrefView);
	User = createSingle(UserView);
	Roles = createCollection(RolesView);

}

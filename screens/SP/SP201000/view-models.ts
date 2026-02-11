import "../sp-common.scss";
import {
	commitChanges, PXView, localizable,
	PXFieldState, controlConfig, columnConfig, linkCommand,
	readOnly,
	gridConfig,
	GridPreset
} from "client-controls";

export class BAccountView extends PXView {
	BAccountID: PXFieldState;
	AcctName: PXFieldState;
	AcctCD: PXFieldState;
}

export class DefContactView extends PXView {
	@commitChanges WebSite: PXFieldState;
	@commitChanges Phone1: PXFieldState;
	@commitChanges EMail: PXFieldState;
}

export class DefAddressView extends PXView {
	@commitChanges AddressLine1: PXFieldState;
	@commitChanges AddressLine2: PXFieldState;
	@commitChanges City: PXFieldState;
	@commitChanges State: PXFieldState;
	@commitChanges PostalCode: PXFieldState;
	@commitChanges CountryID: PXFieldState;
	@commitChanges Latitude: PXFieldState;
	@commitChanges Longitude: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
	adjustPageSize: true,
})
export class Contact extends PXView {
	@readOnly @controlConfig({ editCommand: "viewContact", displayMode: "id", allowEdit: true }) DisplayName: PXFieldState;
	@readOnly Salutation: PXFieldState;
	@readOnly Email: PXFieldState;
	@readOnly Phone1: PXFieldState;
	@readOnly RolesCSV: PXFieldState;
	@readOnly Status: PXFieldState;
	@readOnly Users__Username: PXFieldState;
	@readOnly Users__LastLoginDate: PXFieldState;

	public get rolesFormatted() {
		return this.RolesCSV.value.split(", ").join("<br>");
	}
}

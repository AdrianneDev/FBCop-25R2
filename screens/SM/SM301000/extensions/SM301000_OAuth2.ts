import { PXView, PXFieldState, PXActionState, createCollection, gridConfig, columnConfig, linkCommand, GridNoteFilesShowMode, GridPreset, GridFastFilterVisibility } from "client-controls";
import { SM301000, Applications } from "src/screens/SM/SM301000/SM301000";

export interface SM301000_OAuth2 extends SM301000 { }

export class SM301000_OAuth2 {
	OAuth2Authorizations = createCollection(OAuth2Authorization);
}

export interface OAuth2Application extends Applications { }

export class OAuth2Application {
	AuthorizationEndpoint: PXFieldState;
	TokenEndpoint: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showFastFilter: GridFastFilterVisibility.False
})
export class OAuth2Authorization extends PXView {
	@columnConfig({format: "g"})
	AccessTokenReceivedOn: PXFieldState;
	@columnConfig({format: "g"})
	AccessTokenExpiresOn: PXFieldState;
	EntityType: PXFieldState;
	@linkCommand("ViewRelatedEntity")
	RequestedFor: PXFieldState;
	Description: PXFieldState;

	DeleteAuthorization: PXActionState;
}
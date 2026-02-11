import { graphInfo, PXScreen, PXView, PXFieldState, PXFieldOptions, commitChanges, createSingle, createCollection, viewInfo, gridConfig, columnConfig, GridNoteFilesShowMode, GridPreset, GridFastFilterVisibility, controlConfig, ISelectorControlConfig, addOAuthPopupResultListener, OAuthPopupResult } from "client-controls";
import { Disposable } from "aurelia-framework";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({ graphType: "PX.OAuthClient.ApplicationMaint", primaryView: "Applications", bpEventsIndicator: false })
export class SM301000 extends PXScreen {
	Applications = createSingle(Applications);
	Tokens = createCollection(OAuthToken);

	@viewInfo({ containerName: "Redirect URI" })
	StaticInfo = createSingle(OAuthInfo);

	oAuthListener?: Disposable;

	constructor() {
		super();
		this.oAuthListener = addOAuthPopupResultListener((event: OAuthPopupResult) => {
			//TODO: avoid magic string
			if (event.detail?.type === "px:external-applications:auth-completed") {
				const appToRefreshId = String(event.detail.applicationId);
				window.console.log(`Authentication completed for application ${appToRefreshId}`);
				const appId = String(this.Applications.ApplicationID.value.id);
				if (appId === appToRefreshId) {
					console.log("Refreshing application data");
					this.screenService.update();
				}
			}
		});
	}

	detached() {
		super.detached();
		this.oAuthListener?.dispose();
	}

	onCopyRedirectURIClick = (): void => {
		navigator.clipboard.writeText(this.StaticInfo.RedirectURI.value ?? "");
	};
}

export class Applications extends PXView {
	//todo: AC-322918
	@controlConfig<ISelectorControlConfig>({
		nullText: NullTextValues.New,
		displayMode: "text"
	})
	ApplicationID: PXFieldState;
	@commitChanges Type: PXFieldState;
	ApplicationName: PXFieldState;
	ClientID: PXFieldState;
	@commitChanges ClientSecret: PXFieldState;
	OAuthToken: OAuthToken;
}

export class OAuthInfo extends PXView  {
	RedirectURI: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showFastFilter: GridFastFilterVisibility.False
})
export class OAuthToken extends PXView {
	@columnConfig({format: "g"})
	ExpiresOn: PXFieldState;
	Bearer: PXFieldState;
}


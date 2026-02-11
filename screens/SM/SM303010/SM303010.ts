import {
	graphInfo,
	PXScreen,
	PXView,
	PXFieldState,
	commitChanges,
	createSingle,
	createCollection,
	PXActionState,
	gridConfig,
	PXFieldOptions,
	GridPreset,
	columnConfig,
	addTextToClipboard
} from "client-controls";

@graphInfo({ graphType: "PX.Owin.IdentityServerIntegration.DAC.OAuthClientMaint", primaryView: "Clients", udfTypeField: "ClientName" })
export class SM303010 extends PXScreen {
	AddSharedSecret: PXActionState;
	AddJsonWebKey: PXActionState;
	AddJwksUri: PXActionState;

	Clients = createSingle(Clients);
	CloudRegistryData = createSingle(CloudRegistryData);
	ClientSecrets = createCollection(OAuthClientSecret);
	RedirectUris = createCollection(OAuthClientRedirectUri);
	Claims = createCollection(OAuthClientClaim);
	AddSharedSecretView = createSingle(AddSharedSecretView);
	AddJsonWebKeyView = createSingle(AddJsnSecretView);
	AddJwksUriView = createSingle(AddJsnSecretView);

	copySharedSecretValueClick = (): void => {
		addTextToClipboard(this.AddSharedSecretView.Value.value);
	};
}

export class Clients extends PXView {
	ClientID: PXFieldState;
	ClientName: PXFieldState;
	Enabled: PXFieldState;
	@commitChanges Flow: PXFieldState;
	@commitChanges Plugin: PXFieldState;
	@commitChanges RefreshMode: PXFieldState;
	@commitChanges AbsoluteLifetimeInDays: PXFieldState;
	@commitChanges InfiniteTokenLifetime: PXFieldState;
	@commitChanges SlidingLifetimeInDays: PXFieldState;
}

export class CloudRegistryData extends PXView {
	Status: PXFieldState;
	ServerLastModifiedUtc: PXFieldState;
	ClientLastModifiedUtc: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, allowInsert: false })
export class OAuthClientSecret extends PXView {
	AddSharedSecret: PXActionState;
	AddJsonWebKey: PXActionState;
	AddJwksUri: PXActionState;

	Type: PXFieldState;
	Description: PXFieldState;
	ExpirationUtc: PXFieldState;
	Value: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details})
export class OAuthClientRedirectUri extends PXView {
	RedirectUri: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly})
export class OAuthClientClaim extends PXView {
	Active: PXFieldState;
	ClaimName: PXFieldState;
	Scope: PXFieldState;
	@columnConfig({ hideViewLink: true }) Plugin: PXFieldState;
}

export class AddSharedSecretView extends PXView {
	Description: PXFieldState;
	ExpirationUtc: PXFieldState;
	Value: PXFieldState<PXFieldOptions.Disabled>;
}

export class AddJsnSecretView extends PXView {
	Description: PXFieldState;
	ExpirationUtc: PXFieldState;
	Value: PXFieldState;
}

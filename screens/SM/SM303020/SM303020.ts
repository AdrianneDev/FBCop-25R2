import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, addTextToClipboard } from "client-controls";
import { OidcProvider, OidcProvider2, OidcAutoIdentifyingUsersRule, OidcAutoAddingUsersRule, OidcRolesMappingRule, ChangeIDParam, OidcInfo, MetadataInfo } from "./views";

@graphInfo({graphType: "PX.OidcClient.OidcProviderMaint", primaryView: "Providers", })
export class SM303020 extends PXScreen {
	Autoconfiguration: PXActionState;

   	@viewInfo({containerName: "Provider Summary"})
	Providers = createSingle(OidcProvider);

   	CurrentProvider = createSingle(OidcProvider2);

	@viewInfo({ containerName: "User Binding Rules" })
	AutoIdentifyingUsersRules = createCollection(OidcAutoIdentifyingUsersRule);

	@viewInfo({ containerName: "User Creation Rules" })
	AutoAddingUsersRules = createCollection(OidcAutoAddingUsersRule);

	@viewInfo({ containerName: "Role Mapping Rules" })
	RolesMappingRules = createCollection(OidcRolesMappingRule);

	@viewInfo({ containerName: "Specify New Name" })
	ChangeIDDialog = createSingle(ChangeIDParam);

	@viewInfo({ containerName: "Redirect URI" })
	StaticInfo = createSingle(OidcInfo);

	@viewInfo({ containerName: "Provider Metadata" })
	MetadataDocumentInfo = createSingle(MetadataInfo);

	onCopyInitiateSignInUrlClick = (): void => {
		addTextToClipboard(this.Providers.InitiateSignInUrl.value ?? "");
	};

	onCopyRedirectURIClick = (): void => {
		addTextToClipboard(this.StaticInfo.RedirectURI.value ?? "");
	};

	onCopyPostLogoutRedirectURIClick = (): void => {
		addTextToClipboard(this.StaticInfo.PostLogoutRedirectUri.value ?? "");
	};
}

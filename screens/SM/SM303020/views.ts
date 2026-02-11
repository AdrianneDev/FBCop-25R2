import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, fieldConfig, GridColumnType, PXActionState, TextAlign, localizable, GridPreset, controlConfig } from "client-controls";

@localizable
class ButtonNames {
	static MoveRowUp = "Move Row Up";
	static MoveRowDown = "Move Row Down";
}

// Views
export class OidcProvider extends PXView  {
	@columnConfig({ width: 300 })
	Name: PXFieldState;

	@columnConfig({ width: 300 })
	IssuerIdentifier: PXFieldState;

	@columnConfig({ type: GridColumnType.CheckBox })
	Active: PXFieldState;

	ClientId: PXFieldState;
	ClientSecret: PXFieldState;
	UserIdentityClaimType: PXFieldState;
	Scopes: PXFieldState;
	InitiateSignInUrl: PXFieldState<PXFieldOptions.Disabled>;

	Icon: PXFieldState<PXFieldOptions.NoLabel>;
}

export class OidcProvider2 extends PXView  {
	AuthorizationEndpoint: PXFieldState;
	Flow: PXFieldState<PXFieldOptions.CommitChanges>;
	ResponseType: PXFieldState;
	ResponseMode: PXFieldState;
	TokenEndpoint: PXFieldState;
	JWKSetLocation: PXFieldState;
	AllowAutoIdentifyingUsers: PXFieldState;
	AllowAutoAddingUsers: PXFieldState;
	LoginTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOverridingLocalRoles: PXFieldState<PXFieldOptions.CommitChanges>;
	RolesClaimType: PXFieldState;
	RolesScope: PXFieldState;
	LogoutFromProvider: PXFieldState<PXFieldOptions.CommitChanges>;
	LogoutEndpoint: PXFieldState;
	DoNotRedirectBackAfterLogoutFromProvider: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
	keepPosition: true,
	actionsConfig: {
		fitToScreen: { hidden: true },
		exportToExcel: { hidden: true }
	},
	topBarItems: {
		autoIdentityRuleUp: {
			config: {
				commandName: "autoIdentityRuleUp",
				toolTip: ButtonNames.MoveRowUp,
				images: { normal: "main@ArrowUp" }
			}
		},
		autoIdentityRuleDown: {
			config: {
				commandName: "autoIdentityRuleDown",
				toolTip: ButtonNames.MoveRowDown,
				images: { normal: "main@ArrowDown" }
			}
		}
	}
})
export class OidcAutoIdentifyingUsersRule extends PXView  {
	autoIdentityRuleUp: PXActionState;
	autoIdentityRuleDown: PXActionState;

	@columnConfig({ allowResize: false, width: 70, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Active: PXFieldState;

	@columnConfig({ allowNull: false, width: 100 })
	OpenBrackets: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false, width: 200 })
	UserField: PXFieldState;

	@columnConfig({ width: 200 })
	ClaimType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ type: GridColumnType.CheckBox })
	Verified: PXFieldState;

	@columnConfig({ width: 200 })
	Scope: PXFieldState;

	@columnConfig({ allowNull: false, width: 100 })
	CloseBrackets: PXFieldState;

	@columnConfig({ allowNull: false, width: 90 })
	Operator: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
	actionsConfig: {
		adjustColumns: {
			hidden: true
		},
		exportToExcel: {
			hidden: true
		}
	}
})
export class OidcAutoAddingUsersRule extends PXView  {
	@columnConfig({ allowResize: false, width: 70, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Active: PXFieldState;

	@columnConfig({ allowNull: false, width: 200 })
	UserField: PXFieldState;

	@columnConfig({ width: 200 })
	ClaimType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ type: GridColumnType.CheckBox })
	Verified: PXFieldState;

	@columnConfig({ width: 200 })
	Scope: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
	keepPosition: true,
	actionsConfig: {
		adjustColumns: { hidden: true },
		exportToExcel: { hidden: true }
	},
	topBarItems: {
		RoleMappingRuleUp: {
			config: {
				commandName: "roleMappingRuleUp",
				toolTip: ButtonNames.MoveRowUp,
				images: { normal: "main@ArrowUp" }
			}
		},
		RoleMappingRuleDown: {
			config: {
				commandName: "roleMappingRuleDown",
				toolTip: ButtonNames.MoveRowDown,
				images: { normal: "main@ArrowDown" }
			}
		}
	}
})
export class OidcRolesMappingRule extends PXView  {
	roleMappingRuleUp: PXActionState;
	roleMappingRuleDown: PXActionState;

	@columnConfig({ allowResize: false, width: 70, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Active: PXFieldState;

	@columnConfig({ width: 200 })
	ClaimValue: PXFieldState;

	@columnConfig({ allowNull: false, width: 220 })
	RoleName: PXFieldState;
}

export class ChangeIDParam extends PXView  {
	CD: PXFieldState;
}

export class OidcInfo extends PXView  {
	RedirectURI: PXFieldState<PXFieldOptions.Disabled>;
	PostLogoutRedirectUri: PXFieldState<PXFieldOptions.Disabled>;
}

export class MetadataInfo extends PXView  {
	MetadataURI: PXFieldState<PXFieldOptions.Disabled>;
	MetadataDocument: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled | PXFieldOptions.Multiline>;
}

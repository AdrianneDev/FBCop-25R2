import {
	createCollection,
	createSingle,
	PXScreen,
	PXView,
	graphInfo,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	gridConfig,
	GridPreset,
	controlConfig,
	headerDescription,
	INumberEditorControlConfig,
} from "client-controls";

@graphInfo({ graphType: "PX.EP.EPLoginTypeMaint", primaryView: "LoginType" })
export class EP202500 extends PXScreen {
	LoginType = createSingle(EPLoginType);
	AllowedRoles = createCollection(EPLoginTypeAllowsRole);
	Users = createCollection(Users);
	ManagedLoginTypes = createCollection(EPManagedLoginType);
}

export class EPLoginType extends PXView {
	LoginTypeName: PXFieldState;
	Entity: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription
	Description: PXFieldState;
	EmailAsLogin: PXFieldState<PXFieldOptions.CommitChanges>;
	ResetPasswordOnLogin: PXFieldState;
	RequireLoginActivation: PXFieldState;
	AllowedLoginType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<INumberEditorControlConfig>({ allowNull: true })
	AllowedSessions: PXFieldState;
	DisableTwoFactorAuth: PXFieldState;
	AllowThisTypeForContacts: PXFieldState;
	AllowThisTypeForEmployees: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: true,
	pageSize: 200
})
export class EPLoginTypeAllowsRole extends PXView {
	UpdateUsers: PXActionState;

	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	Rolename: PXFieldState<PXFieldOptions.CommitChanges>;
	Roles__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	fastFilterByAllFields: false
})
export class Users extends PXView {
	Username: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState;
	DisplayName: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class EPManagedLoginType extends PXView {
	LoginTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	EPLoginType__Description: PXFieldState;
}

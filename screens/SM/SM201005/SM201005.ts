import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

@graphInfo({
	graphType: "PX.SM.RoleAccess",
	primaryView: "Roles",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class SM201005 extends PXScreen {
	@viewInfo({ containerName: "Role Information" })
	Roles = createSingle(Roles);

	@viewInfo({ containerName: "Membership" })
	UsersByRole = createCollection(UsersInRoles);

	@viewInfo({ containerName: "Active Directory" })
	ActiveDirectoryMap = createCollection(RoleActiveDirectory);

	@viewInfo({ containerName: "Claims" })
	ClaimsMap = createCollection(RoleClaims);
}

// Views

export class Roles extends PXView {
	Rolename: PXFieldState;
	Descr: PXFieldState;
	Guest: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	quickFilterFields: ["Username", "DisplayName", "Comment"],
})
export class UsersInRoles extends PXView {
	@columnConfig({ hideViewLink: true, width: 200 })
	Username: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
		width: 200,
	})
	ApplicationName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
		width: 200,
	})
	Rolename: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, width: 300 })
	DisplayName: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 60 })
	State: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 100 })
	Domain: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 300 })
	Comment: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 60 })
	Inherited: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class RoleActiveDirectory extends PXView {
	@columnConfig({
		width: 200,
		displayMode: GridColumnDisplayMode.Text,
		textField: "GroupName",
		hideViewLink: true,
		editorConfig: { textField: "Name" }
	})
	GroupID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false, width: 200 })
	GroupDomain: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 300 })
	GroupDescription: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, adjustPageSize: true })
export class RoleClaims extends PXView {
	@columnConfig({ width: 200 })
	GroupID: PXFieldState;
}

import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	TextAlign,
	GridPreset,
	treeConfig,
	ControlParameter,
} from "client-controls";

@graphInfo({ graphType: "PX.SiteMap.Graph.ModernAccessByUser", primaryView: "RightsUser", hideScreenToolbar: true })
export class SM201055 extends PXScreen {
	@viewInfo({ containerName: "User Name" })
	RightsUser = createSingle(RightsUserFilter);

	// View order is important so the grid is empty when the screen is opened
	@viewInfo({ parameters: [new ControlParameter("path", "Entities", "Path")] })
	UserRoleEntities = createCollection(Role);

	@viewInfo({ containerName: "View Roles", parameters: [new ControlParameter("path", "Entities", "Path")] })
	ClarifiedRoles = createCollection(ClarifiedRole);

	@viewInfo({ containerName: "Sitemap Tree" })
	Entities = createCollection(PXEntity);
}

export class RightsUserFilter extends PXView {
	Username: PXFieldState<PXFieldOptions.CommitChanges>;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: ["NodeID", "CacheName", "MemberName"],
	textField: "Text",
	valueField: "Path",
	iconField: "Icon",
	toolTipField: "Description",
	modifiable: false,
	mode: "single",
	openedLayers: 1,
	singleClickSelect: true,
	hideToolbarSearch: true,
	autoRepaint: ["UserRoleEntities", "ClarifiedRoles"],
	collapseOtherPathsOnSelect: true,
})
export class PXEntity extends PXView {
	NodeID: PXFieldState;
	CacheName: PXFieldState;
	MemberName: PXFieldState;
	Path: PXFieldState;
	Text: PXFieldState;
	Icon: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	quickFilterFields: ["RoleDescr"],
	defaultAction: "ViewRoles",
})
export class Role extends PXView {
	ViewRoles: PXActionState;

	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	ScreenID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	CacheName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	MemberName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	RoleName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, allowResize: false, width: 25 })
	DescriptionIcon: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 400 })
	RoleDescr: PXFieldState;

	@columnConfig({ allowNull: false, allowResize: false, width: 120, textAlign: TextAlign.Left })
	RoleRight: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoAdjustColumns: true,
})
export class ClarifiedRole extends PXView {
	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	ScreenID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({
		allowUpdate: false,
		allowResize: false,
		width: 25,
		visible: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	DesctiptionIcon: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, width: 400, visible: false, allowShowHide: GridColumnShowHideMode.False })
	RoleDescr: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, allowShowHide: GridColumnShowHideMode.False })
	RoleName: PXFieldState;

	@columnConfig({ allowNull: false })
	InitialRoleRight: PXFieldState;

	@columnConfig({ allowNull: false })
	RoleRight: PXFieldState;
}

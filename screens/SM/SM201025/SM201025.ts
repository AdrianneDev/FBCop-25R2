import {
	createCollection,
	graphInfo,
	viewInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	TextAlign,
	GridPreset,
	treeConfig,
	ControlParameter,
	createSingle} from "client-controls";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@graphInfo({ graphType: "PX.SiteMap.Graph.ModernAccessByRole", primaryView: "Roles" })
export class SM201025 extends PXScreenWithSiteMapSupport {
	@viewInfo({ containerName: "New Role" })
	NewRole = createSingle(NewRoleFilter);

	@viewInfo({ containerName: "Role Information" })
	Roles = createSingle(Roles);

	// View order is important so the grid is empty when the screen is opened
	@viewInfo({ parameters: [new ControlParameter("path", "Entities", "Path")] })
	RoleEntities = createCollection(Role);

	@viewInfo({ containerName: "Sitemap Tree" })
	Entities = createCollection(PXEntity);
}

export class NewRoleFilter extends PXView {
	Rolename: PXFieldState;
}

export class Roles extends PXView {
	Rolename: PXFieldState;
	Descr: PXFieldState;
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
	autoRepaint: ["RoleEntities"],
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
})
export class Role extends PXView {
	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	ScreenID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	CacheName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False })
	MemberName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false, width: 230 })
	RoleName: PXFieldState;

	@columnConfig({ allowUpdate: false, allowResize: false, width: 25 })
	DescriptionIcon: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 400 })
	RoleDescr: PXFieldState;

	@columnConfig({ allowNull: false, allowResize: false, width: 120, textAlign: TextAlign.Left })
	RoleRight: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		allowNull: false,
		width: 70,
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
		allowShowHide: GridColumnShowHideMode.Server,
	})
	InheritedByChildren: PXFieldState<PXFieldOptions.CommitChanges>;
}

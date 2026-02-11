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
	customDataHandler,
	autoinject,
    QpTreeCustomElement} from "client-controls";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";
import { Params, SessionUrlSerializer } from "client-controls/services/session-url-serializer";


interface RedirectToAccessRightsParam {
	OriginalScreenNodeId?: string;
}

@graphInfo({ graphType: "PX.SiteMap.Graph.ModernAccessByScreen", primaryView: "EntityRoles" })
export class SM201020 extends PXScreenWithSiteMapSupport {
	// View order is important so the grid is empty when the screen is opened
	@viewInfo({ parameters: [new ControlParameter("path", "EntitiesWithLeafs", "Path")] })
	EntityRoles = createCollection(Role);

	@viewInfo({ containerName: "Sitemap Tree" })
	EntitiesWithLeafs = createCollection(PXEntity);

	treeVM: QpTreeCustomElement;

	@autoinject
	public urlSerializer: SessionUrlSerializer;

	@customDataHandler<RedirectToAccessRightsParam>((screen: SM201020) => {
		const parsedParams = <Params>screen.urlSerializer.parseQueryParams(window.location.search);
		const screenNodeId = parsedParams.Screen;
		return {
			OriginalScreenNodeId: screenNodeId
		};
	})
	SM201020Handler(result: { Path: string[] }) {
		if (result?.Path?.length) {
			this.treeVM.treeValuePaths = result.Path;
		}
	}
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
	autoRepaint: ["EntityRoles"],
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
	quickFilterFields: ["RoleName"],
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

	@columnConfig({ allowUpdate: false, width: 70, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Guest: PXFieldState;

	@columnConfig({ allowUpdate: false, width: 300 })
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

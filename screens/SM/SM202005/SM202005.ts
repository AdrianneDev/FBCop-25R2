import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	viewInfo,
	PXView,
	PXFieldState,
	gridConfig,
	fieldConfig,
	controlConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	GridPreset} from "client-controls";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@graphInfo({
	graphType: "PX.SM.WikiSetupMaint",
	primaryView: "Wikis",
})
export class SM202005 extends PXScreenWithSiteMapSupport {
	importToDITA: PXActionState;

	@viewInfo({ containerName: "Choose date" })
	ClearingFilter = createSingle(ClearDateFilter);
	@viewInfo({ containerName: "Wiki" })
	Wikis = createSingle(WikiDescriptorExt);
	@viewInfo({ containerName: "Wiki" })
	SiteMapTree = createSingle(SiteMap);
	@viewInfo({ containerName: "" })
	CurrentWiki = createSingle(WikiDescriptorExt2);
	@viewInfo({ containerName: "Access Rights" })
	EntityRoles = createCollection(Role);

	@viewInfo({ containerName: "Tags" })
	Tags = createCollection(WikiTag);

	@viewInfo({ containerName: "Locales" })
	ReadLangs = createCollection(WikiReadLanguage);

	@viewInfo({ containerName: "File Paths" })
	SitePaths = createCollection(WikiSitePath);
}

// Views

export class ClearDateFilter extends PXView {
	Till: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class WikiDescriptorExt extends PXView {
	Name: PXFieldState;
	WikiTitle: PXFieldState;
	CreatedByID: PXFieldState<PXFieldOptions.Disabled>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Disabled>;
	HoldEntry: PXFieldState;
	RequestApproval: PXFieldState<PXFieldOptions.CommitChanges>;
	ApprovalGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({displayMode: "text"})
	ApprovalUserID: PXFieldState;
	IsActive: PXFieldState;
	Category: PXFieldState<PXFieldOptions.CommitChanges>;
	Position: PXFieldState;
	@fieldConfig({
			controlType: "qp-tree-selector",
			controlConfig: {
				treeConfig: {
					idField: "PageID",
					valueField: "PageID",
					dataMember: "AllPages",
					textField: "Title",
					iconField: "Icon",
					mode: "single",
					hideRootNode: true,
					openedLayers: 1
				}
			}
		})
	DefaultUrl: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				id: "edScreen",
				idField: "NodeID",
				valueField: "NodeID",
				dataMember: "SiteMapTree",
				textField: "Title",
				iconField: "Icon",
				mode: "single",
				hideRootNode: true,
				openedLayers: 1
			}
		}
	})
	SitemapParent: PXFieldState<PXFieldOptions.CommitChanges>;
	SitemapTitle: PXFieldState;
}

export class SiteMap extends PXView {}

export class WikiDescriptorExt2 extends PXView {
	CssID: PXFieldState<PXFieldOptions.CommitChanges>;
	CssPrintID: PXFieldState;
	SPWikiArticleType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({displayMode: "text"})
	RootPageID: PXFieldState;
	@controlConfig({displayMode: "text"})
	RootPrintPageID: PXFieldState;
	@controlConfig({displayMode: "text"})
	HeaderPageID: PXFieldState;
	@controlConfig({displayMode: "text"})
	FooterPageID: PXFieldState;
	SiteMapTagID: PXFieldState;
	PubVirtualPath: PXFieldState;
	@controlConfig({rows: 4})
	WikiDescription: PXFieldState<PXFieldOptions.Multiline>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class Role extends PXView {
	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	ScreenID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	CacheName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		allowUpdate: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	MemberName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false }) RoleName: PXFieldState;
	@columnConfig({ allowUpdate: false }) Guest: PXFieldState;
	@columnConfig({ allowUpdate: false }) RoleDescr: PXFieldState;
	RoleRight: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class WikiTag extends PXView {
	processTag: PXActionState;

	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false
})
export class WikiReadLanguage extends PXView {
	Selected: PXFieldState;
	Language: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class WikiSitePath extends PXView {
	PageName: PXFieldState;
	Path: PXFieldState;
}

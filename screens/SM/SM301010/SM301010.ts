import {
	columnConfig, controlConfig,
	createCollection,
	createSingle,
	graphInfo, GridColumnDisplayMode,
	gridConfig,
	PXFieldOptions,
	PXFieldState,
	PXView,
	viewInfo} from "client-controls";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";
import {NullTextValues} from "../../common/messages";

@graphInfo({graphType: "PX.OAuthClient.ResourceMaint", primaryView: "Resources"})
export class SM301010 extends PXScreenWithSiteMapSupport {
	Resources = createSingle(OAuthResource);

    @viewInfo({containerName: "Visible to:"})
	Roles = createCollection(Roles);
}

// Views
export class OAuthResource extends PXView {
	ApplicationID: PXFieldState<PXFieldOptions.CommitChanges>;
    @controlConfig({displayMode: "text", nullText: NullTextValues.New})
    ResourceCD: PXFieldState<PXFieldOptions.CommitChanges>;
    ResourceName: PXFieldState<PXFieldOptions.CommitChanges>;
    ResourceUrl: PXFieldState;
    SitemapTitle: PXFieldState<PXFieldOptions.CommitChanges>;
    WorkspaceID: PXFieldState;
    SubcategoryID: PXFieldState;
    SitemapScreenID: PXFieldState;
}

@gridConfig({adjustPageSize: true, allowInsert: false, allowDelete: false})
export class Roles extends PXView {
    @columnConfig({allowUpdate: false})
    AccessRights: PXFieldState<PXFieldOptions.CommitChanges>;
    @columnConfig({allowUpdate: false})
    Rolename: PXFieldState;
    @columnConfig({allowUpdate: false})
    Descr: PXFieldState;
}

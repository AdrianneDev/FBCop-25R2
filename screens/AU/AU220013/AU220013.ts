import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { MobileSiteMapWorkspaces, MobileSiteMapWorkspaceItems, MobileSiteMapWorkspaceWidgets, MobileSiteMapWorkspaceWidgetsV2 } from "./views";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({graphType: "PX.Api.Mobile.Workspaces.MobileSitemapWorkspaceMaint", primaryView: "Workspaces", })
export class AU220013 extends AuBaseScreen {
	Workspaces = createSingle(MobileSiteMapWorkspaces);
   	@viewInfo({containerName: "Screens"})
	WorkspaceItems = createCollection(MobileSiteMapWorkspaceItems);
	@viewInfo({containerName: "Widgets"})
	WorkspaceWidgetsV2 = createCollection(MobileSiteMapWorkspaceWidgetsV2);
	@viewInfo({ containerName: "Classic Widgets" })
	WorkspaceWidgets = createCollection(MobileSiteMapWorkspaceWidgets);
}

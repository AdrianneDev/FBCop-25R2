import { createCollection, PXScreen, graphInfo, PXActionState } from "client-controls";
import { MobileSiteMapWorkspaces } from "./views";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({graphType: "PX.Api.Mobile.Workspaces.MobileSitemapManageWorkspaceMaint", primaryView: "Workspaces", })
export class AU220012 extends AuBaseScreen {
	openWorkspace: PXActionState;
	Workspaces = createCollection(MobileSiteMapWorkspaces);
}

import { customDataHandler, PXScreen, refreshMenu } from "client-controls";

export abstract class PXScreenWithSiteMapSupport extends PXScreen {
	@customDataHandler()
	RefreshSiteMapHandler(result: { RefreshSitemap: boolean }) {
		if (result.RefreshSitemap) {
			refreshMenu();
		}
	}
}

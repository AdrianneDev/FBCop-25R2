import { createSingle, PXScreen, graphInfo, PXPageLoadBehavior } from "client-controls";
import { RowPageTitle, FilterMobileSiteMap, CustObject } from "./views";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({graphType: "PX.SM.MobileSiteMapEditor", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues})
export class AU220010 extends AuBaseScreen {

	ViewPageTitle = createSingle(RowPageTitle);
	Filter = createSingle(FilterMobileSiteMap);
	MobileSiteMaps = createSingle(CustObject);
}

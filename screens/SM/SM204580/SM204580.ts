import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXPageLoadBehavior, autoinject, customDataHandler } from "client-controls";
import { RowPageTitle, FilterCodeFile, CustObject, RowBaseMethod, FilterActionWizard } from "./views";
import { AuBaseScreen } from "src/screens/AU/common/au-base-screen";

@graphInfo({graphType: "PX.SM.GraphCodeFiles", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues})
export class SM204580 extends AuBaseScreen {

	ViewPageTitle = createSingle(RowPageTitle);
   	@viewInfo({containerName: "Project"})
	Filter = createSingle(FilterCodeFile);
   	Files = createSingle(CustObject);
   	@viewInfo({containerName: "Select Methods to Override"})
	ViewBaseMethod = createCollection(RowBaseMethod);
   	@viewInfo({containerName: "Create Action"})
	ViewActionWizard = createSingle(FilterActionWizard);
}

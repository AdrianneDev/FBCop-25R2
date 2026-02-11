import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXPageLoadBehavior } from "client-controls";
import { CustProject, CustObject, SelectedCustObject } from "./views";
import { AuBaseScreen } from "src/screens/AU/common/au-base-screen";

@graphInfo({graphType: "PX.SM.ProjectMaintenance", primaryView: "Projects", pageLoadBehavior: PXPageLoadBehavior.SearchSavedKeys,
	hideNotesIndicator: true, hideFilesIndicator: true
})
export class SM204510 extends AuBaseScreen {

	@viewInfo({containerName: "Selected Project", syncAlways: true})
	Projects = createSingle(CustProject);
	Objects = createCollection(CustObject);
   	@viewInfo({containerName: "Source"})
	EditObject = createSingle(SelectedCustObject);
}

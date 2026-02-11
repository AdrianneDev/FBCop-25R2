import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { CustObject, RowWesiteFile, DlgFileContent, RowCheckinFile } from "./views";

@graphInfo({graphType: "PX.SM.ProjectNewUiFrontendFileMaintenance", primaryView: "Items", })
export class AU204600 extends PXScreen {

	Items = createCollection(CustObject);

	@viewInfo({containerName: "Website Files"})
	ViewSelectFile = createCollection(RowWesiteFile);

	@viewInfo({containerName: "Edit File"})
	FilterFileEdit = createSingle(DlgFileContent);

	@viewInfo({containerName: "Modified Files Detected"})
	ViewCheckinFiles = createCollection(RowCheckinFile);
}

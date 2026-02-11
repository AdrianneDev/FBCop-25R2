import { PXScreen, createCollection, graphInfo, IMultiUploaderConfig } from "client-controls";
import { APInvoice, ErrorHistory } from "./views";

@graphInfo({
	graphType: "PX.Objects.AP.InvoiceRecognition.IncomingDocumentsProcess",
	primaryView: "Records",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class AP301110 extends PXScreen {
	Records = createCollection(APInvoice);
	ErrorHistory = createCollection(ErrorHistory);

	uploaderConfig = {
		id: "foo",
		accept: ".pdf",
		graph: this.graphInfo?.graphType,
		screenId: this.screenID,
		view: "Records",
		disabled: false,
		action: "UploadFiles",
		dropTarget: ".dropFiles1",
		autoRepaint: true,
	} as IMultiUploaderConfig;
}
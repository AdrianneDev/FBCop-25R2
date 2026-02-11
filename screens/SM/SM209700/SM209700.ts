import { bindable } from "aurelia-framework";
import {
	CustomEventType,
	PXFieldState,
	PXScreen,
	PXView,
	RowSelectedHandlerArgs,
	SessionURL,
	createSingle,
	graphInfo,
	handleEvent,
} from "client-controls";

class PdfFileInfo extends PXView {
	recognizedRecordRefNbr: PXFieldState;
	FileId: PXFieldState;
}

@graphInfo({
	graphType: "PX.Objects.AP.InvoiceRecognition.PdfViewerManager",
	primaryView: "File",
})
export class SM209700 extends PXScreen {
	File = createSingle(PdfFileInfo);

	@bindable
	contentUrl: string = "";

	@handleEvent(CustomEventType.RowSelected, { view: "File" })
	getPDFUrl(args: RowSelectedHandlerArgs<PdfFileInfo>) {
		if (args.screenModel instanceof SM209700) {
			this.contentUrl = this.File?.FileId?.value
				? new SessionURL(`/ui/file/${this.File?.FileId?.value}`, window.location).href
				: "";
		}
	}
}

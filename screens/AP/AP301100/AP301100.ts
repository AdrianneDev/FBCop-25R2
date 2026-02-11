import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXActionState, handleEvent,
	CustomEventType, RowSelectedHandlerArgs, QpSplitterCustomElement,
	IFileUploaderEvent, IMultiUploaderConfig
} from "client-controls";
import { RecognitionController } from "./recognition-controller";
import { APInvoice, RecognizedRecord, APTran, BoundFeedback, LinkLineFilter, POLineS, POReceiptLineS, RecognizedRecordErrorHistory, LinkSubcontractLineFilter, POLineSub } from "./views";
import { IClientCommandController, ClientCommandController } from "./documentRecognition/menu";

@graphInfo({
	graphType: "PX.Objects.AP.InvoiceRecognition.APInvoiceRecognitionEntry",
	primaryView: "Document",
	hideFilesIndicator: false
})
export class AP301100 extends PXScreen {
	DumpTableFeedback: PXActionState;

	Document = createSingle(APInvoice);
	RecognizedRecords = createSingle(RecognizedRecord);
	Transactions = createCollection(APTran);

	@viewInfo({ containerName: "Link Line" })
	linkLineFilter = createSingle(LinkLineFilter);

	@viewInfo({ containerName: "Receipt" })
	linkLineReceiptTran = createCollection(POReceiptLineS);

	@viewInfo({ containerName: "Order" })
	linkLineOrderTran = createCollection(POLineS);

	@viewInfo({ containerName: "History List" })
	ErrorHistory = createCollection(RecognizedRecordErrorHistory);

	@viewInfo({ containerName: "Bound Feedback" })
	BoundFeedback = createSingle(BoundFeedback);

	@viewInfo({containerName: "Subcontract Filter"})
	linkSubcontractLineFilter = createSingle(LinkSubcontractLineFilter);

	@viewInfo({containerName: "Subcontracts"})
	linkSubcontractTran = createCollection(POLineSub);

	recognitionController: RecognitionController;

	uploaderConfig = {
		accept: ".pdf",
		graph: this.graphInfo.graphType,
		screenId: this.screenID,
		view: "Document",
		disabled: false,
		autoRepaint: true,
	} as IMultiUploaderConfig;

	private commandController: IClientCommandController;

	afterConstructor(): void {
		super.afterConstructor();
		this.commandController = new ClientCommandController(this.screenService);
		this.subscribers.push(...this.commandController.subscriptions);
	}

	onSplitterStateChanged(args: { sender: QpSplitterCustomElement }) {
		if (
			args.sender.splitterState === "normal" &&
			this.recognitionController &&
			this.recognitionController.pdfViewerContainer &&
			this.recognitionController.pdfViewerContainer.clientWidth &&
			this.recognitionController.pdfViewer
		) {
			this.recognitionController.resizeAll();
		}
	}

	onAfterInitialize(): void {
		this.recognitionController = new RecognitionController(this, this.Document, this.Transactions, this.commandController, this.redirectHelper, this.baseApiClient);
		this.recognitionController.trackformControls();
		this.recognitionController.trackGridControls();
		this.recognitionController.bindCommandsHandlers();
		this.recognitionController.trackResize();
	}

	onFileUploaded(_event: CustomEvent<IFileUploaderEvent>) {
		this.recognitionController.refreshUploadedDocument(this.screenService, this.Document.RecognizedRecordRefNbr.value);
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Document" })
	async documentselected(args: RowSelectedHandlerArgs<APInvoice>): Promise<void> {
		this.uploaderConfig.recordId = this.screenService.isNewEntry ? this.screenService.id : null;
		await this.recognitionController.handleDocumentSelected(args.viewModel);
	}
}

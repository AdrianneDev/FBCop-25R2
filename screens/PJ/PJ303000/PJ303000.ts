import {
	createCollection,
	createSingle,
	graphInfo,
	NoteMenuDataComponent,
	PXActionState,
	PXScreen,
	ScreenUpdateParams
} from "client-controls";

import {
	DrawingLog,
	Drawings,
	Attributes,
	Revisions,
	LinkedDrawingLogRelations,
	UnlinkedDrawingLogRelations,
	UploadFilesButtonCssClass
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.DrawingLogs.PJ.Graphs.DrawingLogEntry",
	primaryView: "DrawingLog",
	showUDFIndicator: true
})
export class PJ303000 extends PXScreen {
	DrawingLog$OriginalDrawingId$Link: PXActionState;
	LinkEntity: PXActionState;
	ViewAttachment: PXActionState;
	ViewEntity: PXActionState;
	LinkedDrawingLogRelation$DocumentId$Link: PXActionState;

	DrawingLog = createSingle(DrawingLog);
	Drawings = createCollection(Drawings);
	Attributes = createCollection(Attributes);
	Revisions = createCollection(Revisions);
	LinkedDrawingLogRelations = createCollection(LinkedDrawingLogRelations);
	UnlinkedDrawingLogRelations = createCollection(UnlinkedDrawingLogRelations);

	onAfterInitialize(): void {
		document.addEventListener("buttonpressed", (event: CustomEvent) => {
			if (event.detail?.config?.cssClass === UploadFilesButtonCssClass) {
				this.showFiles();
			}
		});
	}

	async showFiles() {
		await (<NoteMenuDataComponent> this.screenService.getDataComponent("NotesMenuData"))?.filesShow();
		this.screenService.update(undefined, new ScreenUpdateParams( { views: [ "Drawings" ] }));
	}
}

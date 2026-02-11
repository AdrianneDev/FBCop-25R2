import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	RequestForInformation,
	CurrentRequestForInformation,
	Attributes,
	Relations,
	LinkedDrawingLogs,
	DrawingLogs,
	DrawingLogsAttachments
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.RequestsForInformation.PJ.Graphs.RequestForInformationMaint",
	primaryView: "RequestForInformation",
	showUDFIndicator: true
})
export class PJ301000 extends PXScreen {
	RequestForInformation$ConvertedFrom$Link: PXActionState;
	RequestForInformation$ConvertedTo$Link: PXActionState;
	LinkDrawingLogToEntity: PXActionState;
	Relations_TargetDetails: PXActionState;
	Relations_EntityDetails: PXActionState;
	Relations_ContactDetails: PXActionState;
	ViewEntity: PXActionState;
	DrawingLog$OriginalDrawingId$Link: PXActionState;
	ViewAttachment: PXActionState;

	RequestForInformation = createSingle(RequestForInformation);
	CurrentRequestForInformation = createSingle(CurrentRequestForInformation);
	Attributes = createCollection(Attributes);
	Relations = createCollection(Relations);
	LinkedDrawingLogs = createCollection(LinkedDrawingLogs);
	DrawingLogs = createCollection(DrawingLogs);
	DrawingLogsAttachments = createCollection(DrawingLogsAttachments);
}

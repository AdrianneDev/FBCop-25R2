import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	ProjectIssue,
	CurrentProjectIssue,
	Attributes,
	LinkedDrawingLogs,
	DrawingLogs,
	DrawingLogsAttachments
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.ProjectsIssue.PJ.Graphs.ProjectIssueMaint",
	primaryView: "ProjectIssue",
	showUDFIndicator: true
})
export class PJ302000 extends PXScreen {
	Save: PXActionState;
	LinkDrawingLogToEntity: PXActionState;
	ViewEntity: PXActionState;
	DrawingLog$OriginalDrawingId$Link: PXActionState;
	ViewAttachment: PXActionState;
	ProjectIssue$ConvertedTo$Link: PXActionState;
	ProjectIssue = createSingle(ProjectIssue);
	CurrentProjectIssue = createSingle(CurrentProjectIssue);
	Attributes = createCollection(Attributes);
	LinkedDrawingLogs = createCollection(LinkedDrawingLogs);
	DrawingLogs = createCollection(DrawingLogs);
	DrawingLogsAttachments = createCollection(DrawingLogsAttachments);
}

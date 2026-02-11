import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Filter,
	DrawingLogs
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.DrawingLogs.PJ.Graphs.DrawingLogsMaint",
	primaryView: "Filter"
})
export class PJ403000 extends PXScreen {
	editDrawingLog: PXActionState;
	ViewEntity: PXActionState;
	DrawingLog$OriginalDrawingId$Link: PXActionState;

	Filter = createSingle(Filter);
	DrawingLogs = createCollection(DrawingLogs);
}

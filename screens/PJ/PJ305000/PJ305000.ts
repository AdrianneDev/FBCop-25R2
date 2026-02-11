import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	PhotoLog,
	PhotoImage,
	Photos
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.PhotoLogs.PJ.Graphs.PhotoLogEntry",
	primaryView: "PhotoLog",
	showUDFIndicator: true
})
export class PJ305000 extends PXScreen {
	viewPhoto: PXActionState;
	ViewEntity: PXActionState;

	PhotoLog = createSingle(PhotoLog);
	Photos = createCollection(Photos);
	PhotoImage = createSingle(PhotoImage);
}

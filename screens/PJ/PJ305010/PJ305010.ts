import {
	createSingle,
	createCollection,
	graphInfo,
	PXScreen
} from "client-controls";

import {
	Attributes,
	Photos
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.PhotoLogs.PJ.Graphs.PhotoEntry",
	primaryView: "Photos"
})
export class PJ305010 extends PXScreen {
	Photos = createSingle(Photos);
	Attributes = createCollection(Attributes);
}

import { createCollection, PXScreen, graphInfo } from "client-controls";
import { MLEventGroup } from "./views";

@graphInfo({graphType: "PX.ML.UI.Graphs.MLTrainer", primaryView: "Jobs", })
export class ML501000 extends PXScreen {
	Jobs = createCollection(MLEventGroup);
}
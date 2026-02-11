import { createCollection, PXScreen, graphInfo, viewInfo } from "client-controls";
import { GIDesign, GIMLAnomalyCalculationTask } from "./views";

@graphInfo({graphType: "PX.ML.GI.Graph.GIAnomaliesProcessor", primaryView: "Records", })
export class ML502000 extends PXScreen {

	@viewInfo({containerName: "Generic Inquiries"})
	Records = createCollection(GIDesign);
	CalculationTasks = createCollection(GIMLAnomalyCalculationTask);
}

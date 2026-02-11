import { createSingle, PXScreen, graphInfo } from "client-controls";
import { MLCrossSalesSetup } from "./views";

@graphInfo({graphType: "PX.ML.CrossSales.Graph.MLCrossSalesProcessor", primaryView: "Records", })
export class ML504000 extends PXScreen {
	Records = createSingle(MLCrossSalesSetup);
}
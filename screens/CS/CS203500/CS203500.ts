import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { UnitOfMeasure, INUnit } from "./views";

@graphInfo({ graphType: "PX.Objects.IN.UnitOfMeasureMaint", primaryView: "Unit"})
export class CS203500 extends PXScreen {

	@viewInfo({containerName: ""})
	Unit = createSingle(UnitOfMeasure);
	@viewInfo({containerName: ""})
	Units = createCollection(INUnit);
}

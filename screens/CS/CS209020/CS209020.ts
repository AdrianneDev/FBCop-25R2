import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { DaylightShiftFilter, DaylightShift } from "./views";

@graphInfo({graphType: "PX.Objects.CS.DaylightShiftMaint", primaryView: "Filter", })
export class CS209020 extends PXScreen {

   	@viewInfo({containerName: "Period"})
	Filter = createSingle(DaylightShiftFilter);
   	@viewInfo({containerName: "Time Zones"})
	Calendar = createCollection(DaylightShift);
}
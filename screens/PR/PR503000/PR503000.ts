import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { PayCheckDetailFilter, PayCheckDetail } from "./views";

@graphInfo({
	graphType: "PX.Objects.PR.PRCreateLiabilitiesAPBill",
	primaryView: "Filter"
})
export class PR503000 extends PXScreen {

	Filter = createSingle(PayCheckDetailFilter);
	Details = createCollection(PayCheckDetail);
}

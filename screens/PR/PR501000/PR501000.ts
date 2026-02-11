import { createCollection, createSingle, PXScreen, graphInfo } from "client-controls";
import { PRDocumentProcessFilter, PRPayment } from "./views";

@graphInfo({
	graphType: "PX.Objects.PR.PRDocumentProcess",
	primaryView: "Filter"
})
export class PR501000 extends PXScreen {
	Filter = createSingle(PRDocumentProcessFilter);
	DocumentList = createCollection(PRPayment);
}

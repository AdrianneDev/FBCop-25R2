import { createCollection, createSingle, PXScreen, graphInfo, PXActionState } from "client-controls";
import { PTOBalanceFilter, PRPTOBalance } from "./views";

@graphInfo({ graphType: "PX.Objects.PR.PRPTOBalancesInq", primaryView: "Filter" })
export class PR406000 extends PXScreen {
	ViewEmployeePTODetailsReport: PXActionState;

	Filter = createSingle(PTOBalanceFilter);
	PTOBalances = createCollection(PRPTOBalance);
}

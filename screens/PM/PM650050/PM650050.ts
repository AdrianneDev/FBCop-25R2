import {
	createSingle,
	graphInfo,
	PXScreen
} from "client-controls";

import {
	MasterView
} from "./views";

@graphInfo({
	graphType: "PX.Objects.CN.ProjectAccounting.PM.Graphs.SubstantiatedBilling",
	primaryView: "MasterView"
})
export class PM650050 extends PXScreen {
	MasterView = createSingle(MasterView);
}

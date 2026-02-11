import { createCollection, createSingle, graphInfo, PXActionState, PXScreen } from "client-controls";
import { T4ASlip, T4ASlipFilter } from "./views";


@graphInfo({ graphType: "PX.Objects.Localizations.CA.T4ASlipsPrepare", primaryView: "Filter"})
export class AP507610 extends PXScreen {
	Schedule: PXActionState;

	Filter = createSingle(T4ASlipFilter);
	Slips = createCollection(T4ASlip);
}

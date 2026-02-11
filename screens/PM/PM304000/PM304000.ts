import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Document,
	Transactions,
	ProjectCuryInfo,
	BaseCuryInfo,
	Totals
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.RegisterEntry",
	primaryView: "Document",
	showUDFIndicator: true
})
export class PM304000 extends PXScreen {
	Save: PXActionState;
	ViewProject: PXActionState;
	ViewTask: PXActionState;
	ViewCustomer: PXActionState;
	ViewInventory: PXActionState;

	Document = createSingle(Document);
	Totals = createSingle(Totals);
	Transactions = createCollection(Transactions);
	ProjectCuryInfo = createSingle(ProjectCuryInfo);
	BaseCuryInfo = createSingle(BaseCuryInfo);
}

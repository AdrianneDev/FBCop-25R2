import {
	createCollection,
	createSingle,
	graphInfo,
	viewInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	PMTran,
	PMTran2,
	ProformaLinkFilter,
	TranFilter
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.ProformaLinkMaint",
	primaryView: "Filter"
})
export class PM307100 extends PXScreen {
	ViewBill: PXActionState;
	ViewVendor: PXActionState;
	ViewTransaction: PXActionState;
	AppendTransactions: PXActionState;
	ViewDocument: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(ProformaLinkFilter);

	@viewInfo({ containerName: "Transactions" })
	Transactions = createCollection(PMTran);

	@viewInfo({ containerName: "Add Transactions" })
	AvailableTransactionsFilter = createSingle(TranFilter);

	@viewInfo({ containerName: "Add Transactions" })
	AvailableTransactions = createCollection(PMTran2);
}

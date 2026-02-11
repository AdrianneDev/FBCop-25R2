import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
} from "client-controls";

import {
	MasterView,
	DetailsView,
} from "./views";

@graphInfo({ graphType: "PX.Commerce.Core.BCSyncHistoryMaint", primaryView: "MasterView" })
export class BC301000 extends PXScreen {
	MasterView = createSingle(MasterView);

	DetailsView = createCollection(DetailsView);
}

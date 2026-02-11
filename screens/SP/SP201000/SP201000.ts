import "../sp-common.scss";
import {
	createCollection, createSingle, graphInfo, PXView,
	PXFieldState
} from "client-controls";
import { Contact, DefAddressView, DefContactView } from "./view-models";
import { PayMethodsPortalScreen } from "../sp-base-pm";

export class BAccountView extends PXView {
	BAccountID: PXFieldState;
	AcctName: PXFieldState;
	AcctCD: PXFieldState;
}


@graphInfo({ graphType: "PX.Objects.Portals.SPCompanyMaint", primaryView: "BAccount" })
export class SP201000 extends PayMethodsPortalScreen {
	BAccount = createSingle(BAccountView);
	DefContact = createSingle(DefContactView);
	DefAddress = createSingle(DefAddressView);

	Contacts = createCollection(Contact);
}

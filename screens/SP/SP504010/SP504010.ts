import { Messages as SysMessages } from "client-controls/services/messages";
import {
	createCollection, createSingle, graphInfo, localizable, PXActionState,
} from "client-controls";
import { PortalScreen, SPDocumentsTotal } from "../sp-base";
import { AllOrdersLine, OpenOrdersLine } from "../order/view-models";
import { SummaryFilterView } from "../ar-document/view-models";

@localizable
export class Messages {
	static CashDiscount = "Cash Discount";
	static Due = "Due Date";
	static ValidTill = "Cash Discount Date";
	static ProceedToPayment = "Proceed to Pay";
	static TotalsInCury = "Totals ({0})";
}

@graphInfo({ graphType: "PX.Objects.Portals.SPOrdersMaint", primaryView: "SummaryFilter" })
export class SP504010 extends PortalScreen {
	msg = Messages;
	SysMessages = SysMessages;
	PaySelectedOrders: PXActionState;

	UnpaidOrders = createCollection(AllOrdersLine);
	AllOrders = createCollection(AllOrdersLine);
	OpenOrders = createCollection(OpenOrdersLine);
	OrdersTotal = createCollection(SPDocumentsTotal);

	SummaryFilter = createSingle(SummaryFilterView);
}

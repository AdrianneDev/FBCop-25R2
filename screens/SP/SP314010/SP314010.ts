import { Messages as SysMessages } from "client-controls/services/messages";
import {
	createCollection, createSingle, graphInfo, localizable, ACTIVE_TAB_CHANGED_EVENT_NAME
} from "client-controls";
import { SPARPayment } from "./view-models";
import { PortalScreen, SPDocumentsTotal } from "../sp-base";
import { observable } from "aurelia-binding";
import { TabChangedEvent } from "client-controls/controls/container/tabbar/qp-tabbar";
import { ARDocument, SummaryFilterView } from "../ar-document/view-models";


@localizable
export class Messages {
	static DocumentAmount = "Document Amount";
	static CashDiscount = "Cash Discount";
	static Due = "Due Date";
	static ValidTill = "Cash Discount Date";
	static ProceedToPayment = "Proceed to Pay";
	static PaymentMethod = "Payment Method";
}

@graphInfo({ graphType: "PX.Objects.Portals.SPBalanceOverviewMaint", primaryView: "SummaryFilter" })
export class SP314010 extends PortalScreen {
	msg = Messages;
	SysMessages = SysMessages;
	// PaySelectedInvoice: PXActionState;

	OpenDocuments = createCollection(ARDocument);
	AllInvoices = createCollection(ARDocument);
	AllPayments = createCollection(SPARPayment);
	DocumentTotal = createCollection(SPDocumentsTotal);

	SummaryFilter = createSingle(SummaryFilterView);
	isPaymentTab = false;

	@observable tabOpenDocumentsVisible;
	@observable tabAllInvoicesVisible;
	@observable tabAllPaymentsVisible;

	async attached() {
		await super.attached();
		document.body.addEventListener(ACTIVE_TAB_CHANGED_EVENT_NAME, (e: CustomEvent<TabChangedEvent>) =>
			this.isPaymentTab = e.detail.tabId === "AllPayments"
		);
	}
}


import { bindable } from "aurelia-framework";
import {
	createCollection, createSingle, graphInfo, PXView, localizable, handleEvent, CellCssHandlerArgs, CustomEventType,
	QpGridCustomElement, PXFieldState, PXActionState, IQpDataFeedConfig,
	viewInfo
} from "client-controls";
import { siteRoot } from "client-controls/utils/platform-dependable-utils";
import { CatalogScreen, PortalView, SPDocumentsTotal } from "../sp-base";
import { InventoryItemView } from "../catalog/view-models";
import { OpenOrdersLine } from "../order/view-models";
import { Case } from "../sp-cases";
import { ARDocument } from "../ar-document/view-models";


@localizable
class Messages {
	static DocumentAmount = "Document Amount";
	static CashDiscount = "Cash Discount";
	static Due = "Due Date";
	static ValidTill = "Cash Discount Date";
	static ProceedToPayment = "Proceed to Pay";
	static TotalsInCury = "Totals ({0})";
	static NoDocuments = "No Records";

	static OpenCases = "Open Cases";
	static Overdue = "Overdue and due within 7 days";
	static UnappliedPayments = "Unapplied Payments";
	static CurrentBalance = "Current Balance";

	static InvoicesToBePaid = "Invoices to Be Paid";
	static RecentlyAnsweredCases = "Recently Answered Cases";
	static OpenOrders = "Open Orders";
	static RecentlyOrderedItems = "Recently Ordered Items";

	static BannerText = "";
	static BrowseCatalog = "Browse Catalog";
}

export class DashboardInfo extends PXView {
	OpenCases: PXFieldState;
	Header: PXFieldState;
}

export class BAccountView extends PXView {
	BAccountID: PXFieldState;
	AcctName: PXFieldState;
	AcctCD: PXFieldState;
}

@graphInfo({ graphType: "PX.Objects.Portals.SPDashboardMaint", primaryView: "Portal" })
export class SP000000 extends CatalogScreen {
	public priceFilterPopup: HTMLElement;
	public priceFilterDialogOverlay: HTMLElement;
	public priceFilterBtn: HTMLElement;
	@bindable filteredItemsGrid!: QpGridCustomElement;

	msg = Messages;
	siteRoot = siteRoot;
	@viewInfo({ syncAlways: true })
	DashboardInfo = createSingle(DashboardInfo);
	@viewInfo({ syncAlways: true })
	BAccount = createSingle(BAccountView);
	@viewInfo({ syncAlways: true })
	DocumentTotal = createSingle(SPDocumentsTotal);
	@viewInfo({ syncAlways: true })
	Portal = createSingle(PortalView);
	FilteredItems = createCollection(InventoryItemView);
	OpenInvoices = createCollection(ARDocument);
	OpenOrders = createCollection(OpenOrdersLine);
	Cases = createCollection(Case);

	AddToCart: PXActionState;
	ViewDetails: PXActionState;
	ViewCases: PXActionState;
	ViewCatalog: PXActionState; // visible if user has access to SPCatalogMaint / Catalog SP504001
	ViewBalance: PXActionState; // visible if user has access to SPPaymentDetailsMaint / Payments SP334000
	viewCase: PXActionState; // visible if user has access to  SPCaseMaint / Cases SP401000
	viewOrder: PXActionState; // visible if user has access to  SPOrderMaint / Orders SP504000

	FeedConfig: IQpDataFeedConfig = {
		pageSize: 20,
		autoResize: true,
	};

	async attached() {
		await super.attached();
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "FilteredItems", column: "IAStatus" })
	getIAStatusCellCss(args: CellCssHandlerArgs): string | undefined {
		if (!args?.selector?.row?.AddToCart.value) {
			return "iastatus-out-stock";
		}

		return "iastatus-in-stock";
	}

	get balanceIndicator() {
		return this.DocumentTotal.CustomerBalance?.value < 0 ? "yellow" : "green";
	}

	get unappliedIndicator() {
		if (this.DocumentTotal.UnappliedPayment?.value === 0) return "green";
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		return this.DocumentTotal.UnappliedPayment?.value >= 100 ? "red" : "yellow";
	}

	get overdueIndicator() {
		return this.DocumentTotal.OverdueTotal?.value > 0 ? "red" : "green";
	}

	get casesIndicator() {
		return this.DashboardInfo.OpenCases?.value > 1 ? "yellow" : "green";
	}
}

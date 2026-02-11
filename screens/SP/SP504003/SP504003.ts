import { bindable } from "aurelia-framework";
import {
	createCollection, createSingle, graphInfo, commitChanges, autoRefresh, PXView, localizable, gridConfig,
	PXFieldOptions, QpGridCustomElement, PXFieldState, PXActionState, linkCommand,
	GridNoteFilesShowMode, controlConfig,
	GridPreset,
	columnConfig
} from "client-controls";
import { PortalScreen } from "../sp-base";

export class InventoryCartView extends PXView {
	ClearCart: PXActionState;

	ItemTotal: PXFieldState;
	Subtotal_Text: PXFieldState;
	CuryID: PXFieldState;
	ShowCartEmptyPanel: PXFieldState<PXFieldOptions.Hidden>;
}

export class FilterView extends PXView {
	CategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceTo: PXFieldState<PXFieldOptions.CommitChanges>;
	Search: PXFieldState;
}
@gridConfig({
	preset: GridPreset.Empty,
	syncPosition: true,
	initNewRow: false,
	allowInsert: false,
	allowDelete: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	adjustPageSize: true,
	pageSize: 20,
	allowStoredFilters: true,
})
export class InventoryItemView extends PXView {
	RemoveFromCart: PXActionState;
	ViewDetails: PXActionState;

	@columnConfig({ allowFilter: false }) InventoryCD: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowFilter: false }) IAStatus: PXFieldState;
	@linkCommand("viewDetails") @columnConfig({ allowFilter: false }) Descr: PXFieldState;
	CuryUnitPrice: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowFilter: false }) CuryUnitPriceWithSymbol: PXFieldState;
	@controlConfig({ displayMode: "text" }) SiteIDList: PXFieldState<PXFieldOptions.CommitChanges>;
	@commitChanges Qty: PXFieldState;
	SiteQtyAvail: PXFieldState;
	@controlConfig({ displayMode: "text" }) UOM: PXFieldState;
	@autoRefresh @commitChanges @controlConfig({ displayMode: "text" }) UOMList: PXFieldState;
	@columnConfig({ allowFilter: false }) Data: PXFieldState;
	@columnConfig({ allowFilter: false }) CurySymbol: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowFilter: false }) CuryUnitPriceWithSymbolTotal: PXFieldState;
	CartRecordID: PXFieldState;
	CategoryID: PXFieldState;
}

@localizable
class Messages {
	static ProceedToCheckout = "Proceed To Checkout";
	static ContinueShopping = "Continue Shopping";
	static CartIsEmpty = "Your Cart is Empty";
	static ShopNow = "Shop Now";
	static PriceFilterBtn = "Price: All Prices";
	static Search = "Search";
	static Category = "Category";
}

@graphInfo({ graphType: "PX.Objects.Portals.SPInventoryCartMaint", primaryView: "CartDetails" })
export class SP504003 extends PortalScreen {
	public priceFilterPopup: HTMLElement;
	public priceFilterDialogOverlay: HTMLElement;
	public priceFilterBtn: HTMLElement;

	@bindable filteredItemsGrid!: QpGridCustomElement;

	msg = Messages;
	CartDetails = createSingle(InventoryCartView);
	FilteredItems = createCollection(InventoryItemView);
	RemoveFromCart: PXActionState;

	private filterBar: HTMLElement;

	async attached() {
		this.IsCartScreen = true;
		await super.attached();
		this.filterBar = document.querySelector(".qp-data-feed__filter-bar");
	}
}

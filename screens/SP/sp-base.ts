import { PXScreen, createSingle, PXView, PXFieldState, readOnly, localizable, ScreenUpdateParams, GridCell, HtmlBehaviorResourcePrivate, PXFieldOptions, PXActionState, gridConfig, GridPreset } from "client-controls";

export class BaseInfo extends PXView {
	@readOnly CartItemsQty: PXFieldState;
	@readOnly CartItemsTotal: PXFieldState;
	@readOnly CartItemsTotal_Text: PXFieldState;

	get cartItemsQtyLabel() {
		if (this.CartItemsQty?.value == null || this.CartItemsQty?.value === undefined) {
			return "";
		}
		const itemsNum = this.CartItemsQty?.value;
		if (itemsNum >= 1000000) { // eslint-disable-line @typescript-eslint/no-magic-numbers
			return `${(itemsNum / 1000000).toFixed(0)}M`;  // eslint-disable-line @typescript-eslint/no-magic-numbers
		}
		if (itemsNum >= 100000) { // eslint-disable-line @typescript-eslint/no-magic-numbers
			return `${(itemsNum / 1000).toFixed(0)}K`;  // eslint-disable-line @typescript-eslint/no-magic-numbers
		}
		const roundedNum = parseFloat(itemsNum.toFixed(2));
		return roundedNum.toLocaleString();
	}

	get cartItemsTotalLabel() {
		if (this.CartItemsTotal_Text?.value == null || this.CartItemsTotal_Text?.value === undefined) {
			return "...";
		}
		if (this.CartItemsQty?.value === 0) {
			return Labels.noItemsYet;
		}
		return `${this.CartItemsTotal_Text.value}`;
	}
}

export class PortalView extends PXView {
	PortalID: PXFieldState;
	PortalName: PXFieldState<PXFieldOptions.CommitChanges>;
	PortalURL: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	PortalDescription: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccessRole: PXFieldState<PXFieldOptions.CommitChanges>;
	LogoName: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultStockItemWareHouse: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultNonStockItemWareHouse: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleWarehouses: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayAvailableQuantities: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOnlySalesUnitForPurchase: PXFieldState<PXFieldOptions.CommitChanges>;
	CaseClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CaseActivityNotificationTemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CCPaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CCCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	EFTPaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	EFTCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	InterfaceTheme: PXFieldState<PXFieldOptions.CommitChanges>;
	PortalLogo: PXFieldState;
	CompanyNameToDisplay: PXFieldState<PXFieldOptions.CommitChanges>;
	SignInPageImage: PXFieldState;
	PrimaryColor: PXFieldState<PXFieldOptions.CommitChanges>;
	LoginTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	AddressLookupPluginID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowNavigation: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowTopMessage: PXFieldState<PXFieldOptions.CommitChanges>;
	TopMessageImage: PXFieldState;
	TopMessageText: PXFieldState<PXFieldOptions.Multiline>;
	ShowGoToCartButton: PXFieldState<PXFieldOptions.CommitChanges>;
	GoToCartImage: PXFieldState;
	GoToCartText: PXFieldState<PXFieldOptions.Multiline>;
}

export class LaunchItemView extends PXView {
	InventoryCD: PXFieldState;
}


@localizable
export class Labels {
	static Cart = "Cart";
	static noItemsYet = "no items yet";

	static ProceedToPayAll = "Proceed to Pay All ({0})";
	static TotalsInCury = "Totals ({0})";
}

export abstract class PortalScreen extends PXScreen {
	// @viewInfo({ containerName: "Shopping Cart Information" })
	BaseInfo = createSingle(BaseInfo);
	Portal = createSingle(PortalView);
	openCart: PXActionState; // visible if user has access to  SPInventoryCartMaint / Cart SP504003
	Labels = Labels;

	IsCartScreen = false;

	async attached(clearHash = true) {
		await super.attached();
		this.injectStyles();

		if (clearHash) {
			this.clearUrlHash();
		}

		if (this.openCart.visible) {
			this.setCartBlock();
		}

		const top = window.top as any;
		if (!top.__isGuest) {
			window.document.querySelector("body").classList.add("sp-non-guest");
		}
	}

	protected injectStyles() {
		const topDoc = window.top.document;

		const styleSheet = Object.values(window.document.styleSheets).find(item => item.cssRules[0]?.cssText.startsWith(".sp-cart-source"));
		let styles = Array.from(styleSheet?.cssRules || []);

		if (!this.IsCartScreen) {
			styles = styles.filter(item => !item?.cssText.startsWith(".navbar-nav"));
		}

		const combinedCssText = Array.from(styles || []).map(item => item.cssText).join("\n");

		const oldStyle = topDoc.getElementById("sp-cart-styles");

		const newStyle = topDoc.createElement("style");
		newStyle.id = "sp-cart-styles";
		const head = topDoc.head || topDoc.getElementsByTagName("head")[0];
		head.appendChild(newStyle);
		newStyle.appendChild(document.createTextNode(combinedCssText));

		if (oldStyle) {
			topDoc.head.removeChild(oldStyle);
		}
	}

	protected setCartBlock() {
		const topDoc = window.top.document;
		const navBar = topDoc.querySelector(".navbar-nav.navbar-right:not(.edit-cat-button)")!;
		const helpBtn = navBar?.querySelector(".help-button")!;
		const cartSource = window.document.querySelector(".sp-cart-source")!;
		const oldCart = topDoc.querySelector(".sp-cart-source:not(.sp-hidden)")! as HTMLElement;
		if (!oldCart) {
			navBar?.insertBefore(cartSource, helpBtn);
		}
		else {
			setTimeout(() => {
				const oldHidden = topDoc.querySelector(".sp-cart-source.sp-hidden");
				oldHidden?.remove();
				oldCart.classList.add("sp-hidden");
				navBar?.insertBefore(cartSource, helpBtn);
			}, 300); // eslint-disable-line @typescript-eslint/no-magic-numbers
		}
		this.setOpenCartFunc();
	}

	protected setOpenCartFunc() {
		const top = window.top as any;
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		top.baseOpenCart = function() {
			self.openCartFunc();
		};
	}

	protected restoreCartBlock() {
		this.setOpenCartFunc();
		this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false, views: ["BaseInfo"] })).then(() => {
			setTimeout(() => {
				const topDoc = window.top.document;
				const oldCart = topDoc.querySelector(".sp-cart-source:not(.sp-hidden)")!;
				const storedCart = topDoc.querySelector(".sp-cart-source.sp-hidden")! as HTMLElement;
				if (storedCart) {
					oldCart.remove();
					storedCart.classList.remove("sp-hidden");
				}
			}, 300); // eslint-disable-line @typescript-eslint/no-magic-numbers
		});
	}

	protected openCartFunc() {
		const res = this.screenService.update("OpenCart", new ScreenUpdateParams({ blockPage: false }));
	}

	protected clearUrlHash() {
		if (window.top.location.href.includes("#")) {
			window.top.history.pushState(null, null, `${window.top.location.href.split("#")[0]}`);
			return true;
		}
		return false;
	}
}


export abstract class CatalogScreen extends PortalScreen {
	LaunchItem = createSingle(LaunchItemView);

	protected _popupClosureObserver: MutationObserver;

	async attached() {
		await super.attached(false);

		const topWindow = window.top as any;
		if (topWindow.__InitialUrl?.includes("#")) {
			const inventoryCD = topWindow.__InitialUrl.split("#")[1];
			topWindow.__InitialUrl = null;
			this.LaunchItem.InventoryCD.updateValue(inventoryCD);
			await this.screenService.executeCommand("OpenItem", new ScreenUpdateParams({ blockPage: false, views: null }));
		}

		await this.attachPopupClosureObserver();
	}

	async attachPopupClosureObserver() {
		const element = document.querySelector("body");

		this._popupClosureObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (!document.querySelector("#pnlInlineScreenSP504002")) {
					if (this.clearUrlHash()) {
						this.restoreCartBlock();
					}
				}
			});
		});

		this._popupClosureObserver.observe(element, { childList: true });
	}
}

@gridConfig({
	preset: GridPreset.Empty,
})
export class SPDocumentsTotal extends PXView {
	OutstandingTotal: GridCell;
	OutstandingTotal_Text: GridCell;
	OpenOrderQtyTotal: GridCell;
	UnbilledOrderQtyTotal: GridCell;
	UnappliedPayment: GridCell;
	UnappliedPayment_Text: GridCell;
	OverdueTotal: GridCell;
	Due7Days: GridCell;
	Due7Days_Text: GridCell;
	OverdueTotal_Text: GridCell;
	CustomerBalance: GridCell;
	CustomerBalance_Text: GridCell;

	CuryID: GridCell;
	CurySymbol: GridCell;

	get totalsInLabel() {
		return Labels.TotalsInCury.replace("{0}", this.CurySymbol.cellText ?? "");
	}

	get payAllLabel() {
		return Labels.ProceedToPayAll.replace("{0}", this.CurySymbol.cellText ?? "");
	}
}


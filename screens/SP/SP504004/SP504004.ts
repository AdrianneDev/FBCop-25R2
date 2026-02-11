import {
	createCollection, createSingle, graphInfo, localizable, GridNoteFilesShowMode,
	PXActionState,
	QpGridCustomElement,
	ScreenUpdateParams
} from "client-controls";
import { autoinject, observable, BindingEngine } from "aurelia-framework";

import { BillingAddressSectionView, BillingAddressView, BillingContactView, OrderView, PaymentMethodSectionView, SOLine, ShippingAddressSectionView, ShippingAddressView,
	ShippingContactView,
	ShippingInformationSectionView} from "./view-models";
import { QpGridEventArgs } from "client-controls/controls/compound/grid/qp-grid";
import { PaymentMethodView, PayMethodsPortalScreen } from "../sp-base-pm";

@localizable
export class Labels {
	static NewShippingAddress = "Additional Shipping Address";
	static NewBillingAddress = "Additional Billing Address";
	static ProceedNoPayment = "Proceed Without Payment";
	static Exp = "Exp. Date";
	static Item = "Item";
	static Price = "Price";
	static Qty = "Qty.";
	static Quantity = "Quantity";
	static Discount = "Discount";
	static Total = "Total Price";
}

@graphInfo({ graphType: "PX.Objects.Portals.SPCheckoutMaint", primaryView: "Document" })
@autoinject
export class SP504004 extends PayMethodsPortalScreen {
	ChangeCustomerLocation: PXActionState;
	ChangeShippingAddress: PXActionState;
	ChangeBillingAddress: PXActionState;
	ChangeShippingInformation: PXActionState;
	ChangePaymentMethod: PXActionState;
	ContinueCustomerLocation: PXActionState;
	ContinueShippingAddress: PXActionState;
	ContinueBillingAddress: PXActionState;
	ContinueShippingInformation: PXActionState;
	ContinuePaymentMethod: PXActionState;
	PlaceOrder: PXActionState;

	msg = Labels;

	Document = createSingle(OrderView);
	Shipping_Contact = createSingle(ShippingContactView);
	Billing_Contact = createSingle(BillingContactView);
	Shipping_Address = createSingle(ShippingAddressView);
	Billing_Address = createSingle(BillingAddressView);

	RecentShippingAddresses = createCollection(ShippingAddressSectionView);

	RecentBillingAddresses = createCollection(BillingAddressSectionView);

	ShippingAddressSection = createSingle(ShippingAddressSectionView);
	BillingAddressSection = createSingle(BillingAddressSectionView);
	ShippingInformationSection = createSingle(ShippingInformationSectionView);
	PaymentMethodSection = createSingle(PaymentMethodSectionView);

	OrderedItems = createCollection(SOLine);

	@observable({ changeHandler: "selectedShippingAddressChanged"})
	protected selectedShippingAddress: ShippingAddressSectionView | undefined;

	@observable({ changeHandler: "selectedBillingAddressChanged"})
	protected selectedBillingAddress: BillingAddressSectionView | undefined;

	@observable({ changeHandler: "selectedPaymentMethodChanged"})
	protected selectedPaymentMethod: PaymentMethodView | undefined;

	private initializingWizard = false;

	constructor(
		public element: Element,
		private bindingEngine: BindingEngine,
	) {
		super();
	}


	protected onAfterInitialize() {
		this.setupObservers();
	}

	protected shippingAddressesDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;
		try {
			this.initializingWizard = true;
			if (this.ShippingAddressSection.IsEdited.value) {
				this.selectedShippingAddress = undefined;
				return;
			};
			this.selectedShippingAddress = this.RecentShippingAddresses.records.find(x =>
				x.OrderNbr.value === this.ShippingAddressSection.OrderNbr.value
				&& x.OrderType.value === this.ShippingAddressSection.OrderType.value);
			if (!this.selectedShippingAddress) {
				this.selectedShippingAddress = this.RecentShippingAddresses.records[0];
			}
		}
		finally {
			this.initializingWizard = false;
		}
	}

	protected billingAddressesDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;
		try {
			this.initializingWizard = true;
			if (this.BillingAddressSection.IsEdited.value) {
				this.selectedBillingAddress = undefined;
				return;
			};
			this.selectedBillingAddress = this.RecentBillingAddresses.records.find(x =>
				x.OrderNbr.value === this.BillingAddressSection.OrderNbr.value
				&& x.OrderType.value === this.BillingAddressSection.OrderType.value);
			if (!this.selectedBillingAddress) {
				this.selectedBillingAddress = this.RecentBillingAddresses.records[0];
			}
		}
		finally {
			this.initializingWizard = false;
		}
	}

	protected paymentMethodsDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;
		try {
			this.initializingWizard = true;
			if (!this.Document.PMInstanceID.value) {
				this.selectedPaymentMethod = undefined;
				return;
			};
			this.selectedPaymentMethod = this.PaymentMethods.records.find(x =>
				x.PMInstanceID.value.id === this.Document.PMInstanceID.value.id);
			// if (!this.selectedPaymentMethod) {
			// 	this.selectedPaymentMethod = this.PaymentMethods.records?.[0];
			// }
		}
		finally {
			this.initializingWizard = false;
		}
	}

	protected async selectedShippingAddressChanged() {
		if (this.initializingWizard) return; // not a change from UI

		this.ShippingAddressSection.OrderNbr.updateValue(this.selectedShippingAddress?.OrderNbr?.value ?? "");
		this.ShippingAddressSection.OrderType.updateValue(this.selectedShippingAddress?.OrderType?.value ?? "");
		this.ShippingAddressSection.Contact.updateValue(this.selectedShippingAddress?.Contact?.value ?? "");
		this.ShippingAddressSection.Address.updateValue(this.selectedShippingAddress?.Address?.value ?? "");
		// this.ShippingAddressSection.AddressID.updateValue(Number(this.selectedAddress?.AddressID?.value ?? 0));
		// this.ShippingAddressSection.ContactID.updateValue(Number(this.selectedAddress?.ContactID?.value ?? 0));
		this.ShippingAddressSection.IsEdited.updateValue(!this.selectedShippingAddress);
		await this.screenService.update("UpdateShippingAddress", new ScreenUpdateParams({ blockPage: false, views: ["ShippingAddressSection", "Document"] }));
	}

	protected async selectedBillingAddressChanged() {
		if (this.initializingWizard) return; // not a change from UI

		this.BillingAddressSection.SameAsShipping.updateValue(false);
		this.BillingAddressSection.OrderNbr.updateValue(this.selectedBillingAddress?.OrderNbr?.value ?? "");
		this.BillingAddressSection.OrderType.updateValue(this.selectedBillingAddress?.OrderType?.value ?? "");
		this.BillingAddressSection.Contact.updateValue(this.selectedBillingAddress?.Contact?.value ?? "");
		this.BillingAddressSection.Address.updateValue(this.selectedBillingAddress?.Address?.value ?? "");
		// this.BillingAddressSection.AddressID.updateValue(Number(this.selectedAddress?.AddressID?.value ?? 0));
		// this.BillingAddressSection.ContactID.updateValue(Number(this.selectedAddress?.ContactID?.value ?? 0));
		this.BillingAddressSection.IsEdited.updateValue(!this.selectedBillingAddress);
		await this.screenService.update("UpdateBillingAddress", new ScreenUpdateParams({ blockPage: false, views: ["BillingAddressSection", "Document"] }));
	}

	protected async selectedPaymentMethodChanged() {
		if (this.initializingWizard) return; // not a change from UI

		this.Document.PaymentMethodID.updateValue(this.selectedPaymentMethod?.PaymentMethodID?.value ?? null);
		this.Document.PMInstanceID.updateValue(this.selectedPaymentMethod?.PMInstanceID?.value ?? null);
		this.Document.CashAccountID.updateValue(this.selectedPaymentMethod?.CashAccountID?.value ?? null);

		await this.screenService.update("UpdatePaymentMethod", new ScreenUpdateParams({ blockPage: false, views: ["PaymentMethodSection", "Document"] }));
	}

	protected setupObservers() {
		[ this.ChangeShippingAddress,
			this.ChangeBillingAddress,
			this.ChangeShippingInformation,
			this.ChangePaymentMethod,
		].forEach(field => {
			this.observeEditPanelChange(field);
		});
	}

	protected observeEditPanelChange(obj: object) {
		this.bindingEngine.propertyObserver(obj, "visible").subscribe((newValue: any, oldValue: any) => {
			if (!newValue || newValue?.id === oldValue?.id) return;
			// if (this.updatingObservedItem) return;
			// if (!this.entityId) return; // the update came not from UI, ignore

			// this.updatingObservedItem = true;
			// // TODO: replace html element with an array of views
			// this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false }, this.editPopupInner))
			// 	.finally(() => {
			// 		this.updatingObservedItem = false;
			// 	});
		});
	}
}

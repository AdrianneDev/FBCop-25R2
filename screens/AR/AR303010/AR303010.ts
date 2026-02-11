import { autoinject } from "aurelia-framework";
import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, PXView, PXFieldState, gridConfig,
	PXFieldOptions, columnConfig, headerDescription, GridPreset,
	PaymentRedirectExceptionHandler, controlConfig,
	actionConfig,
	RedirectHandlersProvider
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";

@graphInfo({ graphType: "PX.Objects.AR.CustomerPaymentMethodMaint", primaryView: "CustomerPaymentMethod", showUDFIndicator: true, bpEventsIndicator: true })
@autoinject
export class AR303010 extends PXScreen {

	ViewBillAddressOnMap: PXActionState;

	@viewInfo({ containerName: "Payment Method Selection" })
	CustomerPaymentMethod = createSingle(CustomerPaymentMethod);

	@viewInfo({ syncAlways: true })
	CurrentCPM = createSingle(CustomerPaymentMethod2);

	@viewInfo({ containerName: "Payment Method Details" })
	Details = createCollection(CustomerPaymentMethodDetail);

	@viewInfo({ containerName: "Billing Info" })
	BillContact = createSingle(Contact);

	@viewInfo({ containerName: "Billing Info" })
	BillAddress = createSingle(Address);

	constructor(redirectHandlersProvider: RedirectHandlersProvider,
		paymentRedirect: PaymentRedirectExceptionHandler) {
		super();

		redirectHandlersProvider.register("openPayment", paymentRedirect);
	}
}

export class CustomerPaymentMethod extends PXView {
	@headerDescription
	BAccountID: PXFieldState;

	PMInstanceID: PXFieldState<PXFieldOptions.Hidden>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	HasBillingInfo: PXFieldState;
	IsActive: PXFieldState;
	CCProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerCCPID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	Descr: PXFieldState;

	ExpirationDate: PXFieldState;
	DisplayCardType: PXFieldState;

}

export class CustomerPaymentMethod2 extends PXView {

	IsBillContactSameAsMain: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	IsBillAddressSameAsMain: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;

}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowSort: false,
})
export class CustomerPaymentMethodDetail extends PXView {
	@actionConfig({ popupCommand: "SyncCCPaymentMethods" })
	CreateCCPaymentMethodHF: PXActionState;
	@actionConfig({ popupCommand: "SyncCCPaymentMethods" })
	ManageCCPaymentMethodHF: PXActionState;

	@columnConfig({ hideViewLink: true })
	DetailID: PXFieldState;

	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}
